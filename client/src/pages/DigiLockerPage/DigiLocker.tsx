import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { connectDigiLocker } from '../../features/Documents/api';
import DigiLockerConnect from '../../features/Documents/DigiLockerConnect';

const DigiLocker = () => {
  const { userProfile, refreshProfile, addNotification } = useApp();
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = () => {
    setIsConnecting(true);
    connectDigiLocker()
      .then(() => refreshProfile())
      .then(() => {
        addNotification({
          type: 'success',
          title: 'DigiLocker Authenticated',
          message: 'Connected with Aadhaar OTP authentication.',
          actionText: 'Inspect Documents',
          actionTarget: '/documents',
        });
      })
      .finally(() => setIsConnecting(false));
  };

  if (!userProfile) return null;

  return (
    <DigiLockerConnect
      digiLockerConnected={userProfile.digiLockerConnected}
      isConnecting={isConnecting}
      fullName={userProfile.fullName}
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
