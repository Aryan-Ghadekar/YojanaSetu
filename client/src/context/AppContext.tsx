import React, { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabaseClient';
import type { UserProfile } from '../features/Profile/types';
import { fetchProfile, updateProfile as updateProfileApi } from '../features/Profile/api';
import type { SupportedLanguage } from './translations';
import { translations } from './translations';

export interface ToastNotification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  actionText?: string;
  actionTarget?: string;
  timestamp: string;
}

type UserRole = 'citizen' | 'admin';

interface AppContextType {
  // Auth
  isAuthenticated: boolean;
  authLoading: boolean;
  userRole: UserRole;
  signOut: () => Promise<void>;

  // Localization
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: (typeof translations)['en'];

  // Citizen profile (used across most citizen-facing features)
  userProfile: UserProfile | null;
  profileLoading: boolean;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
  refreshProfile: () => Promise<void>;

  // Notifications
  notifications: ToastNotification[];
  addNotification: (notification: Omit<ToastNotification, 'id' | 'timestamp'>) => void;
  dismissNotification: (id: string) => void;

  // Scheme comparison tray (shared across Schemes feature screens)
  comparisonSchemeIds: string[];
  addToComparison: (schemeId: string) => void;
  removeFromComparison: (schemeId: string) => void;
  isInComparison: (schemeId: string) => boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const MAX_COMPARISON_SCHEMES = 4;

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [userRole, setUserRole] = useState<UserRole>('citizen');
  const [language, setLanguage] = useState<SupportedLanguage>('en');

  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [profileLoading, setProfileLoading] = useState(false);

  const [comparisonSchemeIds, setComparisonSchemeIds] = useState<string[]>([]);
  const [notifications, setNotifications] = useState<ToastNotification[]>([]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setAuthLoading(false);
    });

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
    });

    return () => subscription.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session) {
      setUserProfile(null);
      setUserRole('citizen');
      return;
    }

    setUserRole((session.user.user_metadata?.role as UserRole) ?? 'citizen');
    setProfileLoading(true);
    fetchProfile()
      .then(setUserProfile)
      .catch(() => setUserProfile(null))
      .finally(() => setProfileLoading(false));
  }, [session]);

  const t = translations[language] || translations.en;

  const addNotification = (notif: Omit<ToastNotification, 'id' | 'timestamp'>) => {
    const newNotif: ToastNotification = {
      ...notif,
      id: `notif-${Date.now()}`,
      timestamp: 'Just now',
    };
    setNotifications((prev) => [newNotif, ...prev.slice(0, 9)]);
  };

  const dismissNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const addToComparison = (schemeId: string) => {
    if (comparisonSchemeIds.length >= MAX_COMPARISON_SCHEMES) {
      addNotification({
        type: 'warning',
        title: 'Comparison Limit Reached',
        message: 'You can compare up to 4 schemes simultaneously.',
      });
      return;
    }
    if (!comparisonSchemeIds.includes(schemeId)) {
      setComparisonSchemeIds([...comparisonSchemeIds, schemeId]);
      addNotification({
        type: 'info',
        title: 'Scheme Added to Comparison',
        message: 'View comparison matrix to see side-by-side eligibility.',
        actionText: 'Compare Now',
        actionTarget: '/schemes/compare',
      });
    }
  };

  const removeFromComparison = (schemeId: string) => {
    setComparisonSchemeIds((prev) => prev.filter((id) => id !== schemeId));
  };

  const isInComparison = (schemeId: string) => comparisonSchemeIds.includes(schemeId);

  const signOut = async () => {
    await supabase.auth.signOut();
    setComparisonSchemeIds([]);
    setNotifications([]);
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    const updated = await updateProfileApi(updates);
    setUserProfile(updated);
  };

  const refreshProfile = async () => {
    const latest = await fetchProfile();
    setUserProfile(latest);
  };

  return (
    <AppContext.Provider
      value={{
        isAuthenticated: !!session,
        authLoading,
        userRole,
        signOut,
        language,
        setLanguage,
        t,
        userProfile,
        profileLoading,
        updateProfile,
        refreshProfile,
        notifications,
        addNotification,
        dismissNotification,
        comparisonSchemeIds,
        addToComparison,
        removeFromComparison,
        isInComparison,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
