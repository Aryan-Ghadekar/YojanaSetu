import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import type { Scheme } from '../../features/Schemes/types';
import { fetchSchemeById, fetchSchemes } from '../../features/Schemes/api';
import { submitApplication } from '../../features/Applications/api';
import ApplicationFormAssistant from '../../features/Applications/ApplicationFormAssistant';

const ApplicationForm = () => {
  const { schemeId } = useParams();
  const { addNotification } = useApp();
  const [scheme, setScheme] = useState<Scheme | null>(null);

  useEffect(() => {
    if (schemeId) {
      fetchSchemeById(schemeId).then((found) => {
        if (found) {
          setScheme(found);
        } else {
          fetchSchemes().then((all) => setScheme(all[0] ?? null));
        }
      });
    } else {
      fetchSchemes().then((all) => setScheme(all[0] ?? null));
    }
  }, [schemeId]);

  if (!scheme) return null;

  return (
    <ApplicationFormAssistant
      scheme={scheme}
      onSubmit={async () => {
        const record = await submitApplication({
          schemeId: scheme.id,
          schemeName: scheme.name,
          department: scheme.department,
          benefitAmount: scheme.benefitAmount,
          officialPortal: scheme.officialPortal,
        });
        addNotification({
          type: 'success',
          title: 'Application Lodged Successfully',
          message: `Your application #${record.applicationNumber} has been transmitted to ${record.department}.`,
          actionText: 'Track Status',
          actionTarget: '/applications',
        });
      }}
    />
  );
};

export default ApplicationForm;
