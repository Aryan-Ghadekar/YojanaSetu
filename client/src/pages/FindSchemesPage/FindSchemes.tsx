import { useApp } from '../../context/AppContext';
import FindSchemesSearch from '../../features/Schemes/FindSchemesSearch';

const FindSchemes = () => {
  const { userProfile } = useApp();
  if (!userProfile) return null;
  return <FindSchemesSearch userProfile={userProfile} />;
};

export default FindSchemes;
