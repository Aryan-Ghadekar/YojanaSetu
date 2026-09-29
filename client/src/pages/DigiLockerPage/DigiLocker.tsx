import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { connectDigiLocker } from '../../features/Documents/api';
import DigiLockerConnect from '../../features/Documents/DigiLockerConnect';

const DigiLocker = () => {
  const { userProfile, setUserProfile, addNotification } = useApp();
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = () => {
    setIsConnecting(true);
    connectDigiLocker().then((result) => {
      setUserProfile((prev) => ({
        ...prev,
        digiLockerConnected: result.digiLockerConnected,
        completenessPercentage: result.completenessPercentage,
      }));
      setIsConnecting(false);
      addNotification({
        type: 'success',
        title: 'DigiLocker Authenticated',
        message: 'Connected with Aadhaar OTP authentication. 4 official certificates fetched directly.',
        actionText: 'Inspect Documents',
        actionTarget: '/documents',
      });
    });
  };

  return (
    <DigiLockerConnect
      digiLockerConnected={userProfile.digiLockerConnected}
      isConnecting={isConnecting}
      onConnect={handleConnect}
      onConsentMissing={() =>
        addNotification({
          type: 'warning',
          title: 'Consent Required',
          message: 'Please accept the consent terms before connecting with DigiLocker.',
        })
      }
    />
  );
};

export default DigiLocker;
