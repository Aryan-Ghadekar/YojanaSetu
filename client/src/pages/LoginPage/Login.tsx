import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { supabase } from '../../lib/supabaseClient';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Tabs from '../../components/ui/Tabs';
import Logo from '../../components/ui/Logo';
import TricolorBar from '../../components/ui/TricolorBar';

type Audience = 'citizen' | 'officer';
type Mode = 'signin' | 'signup';

const Login = () => {
  const { userRole } = useApp();
  const navigate = useNavigate();

  const [audience, setAudience] = useState<Audience>(userRole === 'admin' ? 'officer' : 'citizen');
  const [mode, setMode] = useState<Mode>('signin');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const audienceOptions = [
    { value: 'citizen', label: 'Citizens' },
    { value: 'officer', label: 'Officials' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (mode === 'signup' && password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (!email.trim() || !password.trim()) {
      setError('Please fill in all required fields.');
      return;
    }
    if (mode === 'signup' && !name.trim()) {
      setError('Please enter your full name.');
      return;
    }

    setIsSubmitting(true);
    try {
      if (mode === 'signup') {
        const { error: signUpError } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: {
            data: {
              full_name: name.trim(),
              role: audience === 'officer' ? 'admin' : 'citizen',
              phone: phone.trim() || undefined,
            },
          },
        });
        if (signUpError) throw signUpError;
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });
        if (signInError) throw signInError;
      }

      navigate(audience === 'officer' ? '/admin' : '/home');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <TricolorBar />

      <div className="flex flex-1 items-center justify-center px-4 py-10">
        <Card className="w-full max-w-sm p-6 shadow-md">
          <button
            onClick={() => navigate('/')}
            className="mb-6 flex w-full justify-center"
          >
            <Logo variant="compact" height={48} />
          </button>

          <Tabs
            options={audienceOptions}
            value={audience}
            onChange={(value) => {
              setAudience(value as Audience);
              setError(null);
            }}
            className="w-full justify-center"
          />

          <h1 className="mt-5 text-center text-base font-semibold text-slate-900">
            {mode === 'signup'
              ? audience === 'officer'
                ? 'Create an Officer Account'
                : 'Create Your Citizen Account'
              : audience === 'officer'
                ? 'Officer & Admin Sign In'
                : 'Welcome Back'}
          </h1>
          <p className="mt-1 text-center text-xs text-slate-500">
            {audience === 'officer'
              ? 'Access district scheme utilization analytics and applicant reviews.'
              : 'Sign in to see your personalized scheme matches and applications.'}
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {mode === 'signup' && (
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Full Name</label>
                <Input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rohan Patil"
                />
              </div>
            )}

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Email Address</label>
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
              />
            </div>

            {mode === 'signup' && audience === 'citizen' && (
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Phone Number <span className="font-normal text-slate-400">(optional)</span>
                </label>
                <Input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="10-digit mobile number"
                />
              </div>
            )}

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Password</label>
              <Input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>

            {mode === 'signup' && (
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Confirm Password</label>
                <Input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                />
              </div>
            )}

            {error && <p className="text-sm text-rose-600">{error}</p>}

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Please wait...' : mode === 'signup' ? 'Create Account' : 'Sign In'}
            </Button>
          </form>

          <p className="mt-4 text-center text-xs text-slate-500">
            {mode === 'signup' ? 'Already have an account?' : 'New here?'}{' '}
            <button
              type="button"
              onClick={() => {
                setMode(mode === 'signup' ? 'signin' : 'signup');
                setError(null);
              }}
              className="font-semibold text-brand-600 hover:underline"
            >
              {mode === 'signup' ? 'Sign in' : 'Create an account'}
            </button>
          </p>

          <p className="mt-6 text-center">
            <button
              onClick={() => navigate('/')}
              className="text-xs font-medium text-slate-400 hover:text-slate-600"
            >
              ← Back to home
            </button>
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Login;
