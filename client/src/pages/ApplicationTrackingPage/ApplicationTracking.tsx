import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import type { ApplicationRecord } from '../../features/Applications/types';
import { fetchApplications, resolveApplicationAction, checkApplicationStatus } from '../../features/Applications/api';
import ApplicationList from '../../features/Applications/ApplicationList';
import ApplicationDetail from '../../features/Applications/ApplicationDetail';

const ApplicationTracking = () => {
  const { addNotification } = useApp();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [applications, setApplications] = useState<ApplicationRecord[]>([]);
  const [activeAppId, setActiveAppId] = useState<string>('');
  const [showResolveModal, setShowResolveModal] = useState(false);
  const [isResolving, setIsResolving] = useState(false);
  const [checkingStatusId, setCheckingStatusId] = useState<string | null>(null);

  useEffect(() => {
    fetchApplications().then((apps) => {
      setApplications(apps);
      const requested = searchParams.get('app');
      setActiveAppId(requested && apps.some((a) => a.id === requested) ? requested : apps[0]?.id ?? '');
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const activeApp = applications.find((a) => a.id === activeAppId) ?? applications[0];

  const handleCheckStatus = (app: ApplicationRecord) => {
    setCheckingStatusId(app.id);
    checkApplicationStatus(app)
      .then((updated) => {
        setApplications((prev) => prev.map((a) => (a.id === updated.id ? updated : a)));
        if (updated.currentStatus !== app.currentStatus) {
          addNotification({
            type: updated.currentStatus === 'Disbursed' ? 'success' : 'info',
            title: `${updated.schemeName}: ${updated.currentStatus}`,
            message: updated.expectedNextStep,
          });
        }
      })
      .catch((err: unknown) => {
        addNotification({
          type: 'error',
          title: 'Could not check for updates',
          message: err instanceof Error ? err.message : 'Please try again in a moment.',
        });
      })
      .finally(() => setCheckingStatusId(null));
  };

  const handleConfirmResolve = () => {
    if (!activeApp) return;
    setIsResolving(true);
    resolveApplicationAction(activeApp).then((resolved) => {
      setApplications((prev) => prev.map((a) => (a.id === resolved.id ? resolved : a)));
      setIsResolving(false);
      setShowResolveModal(false);
      addNotification({
        type: 'success',
        title: 'Document Issue Resolved',
        message: 'Clear income certificate submitted to District Officer. Application re-entered queue.',
      });
    });
  };

  if (!activeApp) return null;

  return (
    <div className="space-y-6 pb-12 max-w-6xl mx-auto">

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-semibold tracking-tight text-slate-900">
              My Applications & Live Dossier Tracking
            </h1>
            <span className="text-xs font-mono bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
              {applications.length} Active Dossiers
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Real-time status synchronized with National Scholarship Portal (NSP), MahaDBT, and PM-KISAN registries.
          </p>
        </div>

        <button
          onClick={() => navigate('/schemes')}
          className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 self-start sm:self-auto"
        >
          <span>+ Apply for New Scheme</span>
        </button>
      </div>

      {/* TWO-COLUMN TRACKER: APPLICATION LIST (5 COLS) + DETAIL TIMELINE (7 COLS) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <ApplicationList
          applications={applications}
          activeAppId={activeApp.id}
          onSelect={(app) => setActiveAppId(app.id)}
          onResolveShortcut={(app) => {
            setActiveAppId(app.id);
            setShowResolveModal(true);
          }}
        />
        <ApplicationDetail
          app={activeApp}
          showResolveModal={showResolveModal}
          setShowResolveModal={setShowResolveModal}
          isResolving={isResolving}
          onConfirmResolve={handleConfirmResolve}
          isCheckingStatus={checkingStatusId === activeApp.id}
          onCheckStatus={() => handleCheckStatus(activeApp)}
        />
      </div>

    </div>
  );
};

export default ApplicationTracking;
