import React, { createContext, useContext, useState } from 'react';
import type { Dispatch, ReactNode, SetStateAction } from 'react';
import type { UserProfile } from '../features/Profile/types';
import { initialUserProfile } from '../features/Profile/mockData';
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
  setIsAuthenticated: (value: boolean) => void;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;

  // Localization
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: (typeof translations)['en'];

  // Citizen profile (used across most citizen-facing features)
  userProfile: UserProfile;
  setUserProfile: Dispatch<SetStateAction<UserProfile>>;

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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>('citizen');
  const [language, setLanguage] = useState<SupportedLanguage>('en');
  const [userProfile, setUserProfile] = useState<UserProfile>(initialUserProfile);

  const [comparisonSchemeIds, setComparisonSchemeIds] = useState<string[]>([
    'maha-swadhar-2026',
    'post-matric-scholarship-2026',
  ]);

  const [notifications, setNotifications] = useState<ToastNotification[]>([
    {
      id: 'notif-1',
      type: 'warning',
      title: 'Action Required on Application',
      message: 'Post-Matric Scholarship flagged: Income certificate blur. Upload a clear copy by Oct 5.',
      actionText: 'Resolve Issue',
      actionTarget: '/applications',
      timestamp: '10 min ago',
    },
    {
      id: 'notif-2',
      type: 'success',
      title: 'DigiLocker Synced',
      message: '4 documents verified from National DigiLocker Repository with digital signatures.',
      actionText: 'View Documents',
      actionTarget: '/documents',
      timestamp: '2 hours ago',
    },
  ]);

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

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        userRole,
        setUserRole,
        language,
        setLanguage,
        t,
        userProfile,
        setUserProfile,
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
