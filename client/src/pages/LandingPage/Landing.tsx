import PublicLayout from '../../components/Layout/PublicLayout';
import HeroSection from '../../features/Landing/HeroSection';
import ImpactTicker from '../../features/Landing/ImpactTicker';
import TestimonialCarousel from '../../features/Landing/TestimonialCarousel';
import TryItYourself from '../../features/Landing/TryItYourself';
import ChannelsSection from '../../features/Landing/ChannelsSection';
import HowItWorksSection from '../../features/Landing/HowItWorksSection';

const Landing = () => {
  return (
    <PublicLayout>
      <HeroSection />
      <ImpactTicker />
      <TestimonialCarousel />
      <TryItYourself />
      <ChannelsSection />
      <HowItWorksSection />
    </PublicLayout>
  );
};

export default Landing;
