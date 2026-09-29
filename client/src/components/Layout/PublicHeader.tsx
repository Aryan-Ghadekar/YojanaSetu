import { useNavigate } from 'react-router-dom';
import Logo from '../ui/Logo';
import govOfIndiaLogo from '../../assets/Government_of_India_logo.svg';

const navLinkClass =
  'relative py-1 text-base font-medium text-slate-600 transition-colors hover:text-slate-900 after:absolute after:bottom-0 after:left-1/2 after:h-0.5 after:w-0 after:-translate-x-1/2 after:rounded-full after:bg-brand-600 after:transition-all after:duration-300 after:ease-out hover:after:w-full';

const PublicHeader = () => {
  const navigate = useNavigate();

  const scrollToHowItWorks = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-24 max-w-6xl items-center justify-between px-6">
        <div className="flex items-center gap-5">
          <button onClick={() => navigate('/')} className="flex items-center text-left">
            <Logo variant="compact" height={56} />
          </button>
          <span className="hidden h-10 w-px bg-slate-200 sm:block" />
          <div className="hidden sm:block">
            <img src={govOfIndiaLogo} alt="Government of India" className="h-14 w-auto" />
          </div>
        </div>

        <nav className="hidden items-center gap-8 md:flex">
          <a href="#how-it-works" onClick={scrollToHowItWorks} className={navLinkClass}>
            How It Works
          </a>
          <button onClick={() => navigate('/applications')} className={navLinkClass}>
            Track Application
          </button>
          <button onClick={() => navigate('/login')} className={navLinkClass}>
            Officer Portal
          </button>
        </nav>

        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/login')}
            className="hidden text-sm font-medium text-slate-600 transition-colors hover:text-slate-900 sm:inline"
          >
            Sign In
          </button>
          <button
            onClick={() => navigate('/login')}
            className="px-5 py-2.5 text-sm font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-lg shadow-sm transition-all hover:scale-[1.03]"
          >
            Get Started
          </button>
        </div>
      </div>
    </header>
  );
};

export default PublicHeader;
