import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import RequireAuth from './components/Layout/RequireAuth';
import MainLayout from './components/Layout/MainLayout';

import Landing from './pages/LandingPage/Landing';
import Login from './pages/LoginPage/Login';
import Home from './pages/HomePage/Home';
import FindSchemes from './pages/FindSchemesPage/FindSchemes';
import BestMatch from './pages/BestMatchPage/BestMatch';
import SchemeResults from './pages/SchemeResultsPage/SchemeResults';
import SchemeDetails from './pages/SchemeDetailsPage/SchemeDetails';
import SchemeComparison from './pages/SchemeComparisonPage/SchemeComparison';
import BorderlineEligibility from './pages/BorderlineEligibilityPage/BorderlineEligibility';
import DocumentCenter from './pages/DocumentCenterPage/DocumentCenter';
import DocumentAuthenticity from './pages/DocumentAuthenticityPage/DocumentAuthenticity';
import DigiLocker from './pages/DigiLockerPage/DigiLocker';
import Copilot from './pages/CopilotPage/Copilot';
import ApplicationTracking from './pages/ApplicationTrackingPage/ApplicationTracking';
import ApplicationForm from './pages/ApplicationFormPage/ApplicationForm';
import Benefits from './pages/BenefitsPage/Benefits';
import Voice from './pages/VoicePage/Voice';
import Profile from './pages/ProfilePage/Profile';
import Admin from './pages/AdminPage/Admin';
import SchemeUtilization from './pages/SchemeUtilizationPage/SchemeUtilization';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />

          <Route element={<RequireAuth />}>
            <Route element={<MainLayout />}>
              <Route path="/home" element={<Home />} />
              <Route path="/schemes" element={<FindSchemes />} />
              <Route path="/schemes/best" element={<BestMatch />} />
              <Route path="/schemes/results" element={<SchemeResults />} />
              <Route path="/schemes/compare" element={<SchemeComparison />} />
              <Route path="/schemes/:schemeId" element={<SchemeDetails />} />
              <Route path="/eligibility/borderline" element={<BorderlineEligibility />} />
              <Route path="/documents" element={<DocumentCenter />} />
              <Route path="/documents/authenticity/:documentId?" element={<DocumentAuthenticity />} />
              <Route path="/documents/digilocker" element={<DigiLocker />} />
              <Route path="/copilot" element={<Copilot />} />
              <Route path="/applications" element={<ApplicationTracking />} />
              <Route path="/applications/new/:schemeId?" element={<ApplicationForm />} />
              <Route path="/benefits" element={<Benefits />} />
              <Route path="/voice" element={<Voice />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/admin/scheme-utilization" element={<SchemeUtilization />} />
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
