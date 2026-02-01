
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconX, IconZap } from './Icons';
import { useAuth } from '../lib/auth';

interface LoginProps {
  isOpen: boolean;
  onClose: () => void;
}

type AuthMode = 'login' | 'signup' | 'forgot';

const Login: React.FC<LoginProps> = ({ isOpen, onClose }) => {
  const { signInWithGoogle, signInWithEmail, signUpWithEmail, resetPassword, isConfigured } = useAuth();
  
  const [mode, setMode] = useState<AuthMode>('login');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  // Form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setFullName('');
    setError(null);
    setSuccess(null);
  };

  const handleModeChange = (newMode: AuthMode) => {
    setMode(newMode);
    resetForm();
  };

  const handleGoogleLogin = async () => {
    if (!isConfigured) {
      setError("Login is disabled - Supabase not configured. You can still use the app without logging in!");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const { error } = await signInWithGoogle();
      if (error) throw error;
    } catch (err: any) {
      console.error("Login error:", err);
      setError(err.message || "An error occurred during login");
      setLoading(false);
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isConfigured) {
      setError("Login is disabled - Supabase not configured.");
      return;
    }

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const { error } = await signInWithEmail(email, password);
      if (error) throw error;
      onClose();
    } catch (err: any) {
      console.error("Login error:", err);
      setError(err.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isConfigured) {
      setError("Signup is disabled - Supabase not configured.");
      return;
    }

    if (!email || !password) {
      setError("Please fill in all required fields");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const { error } = await signUpWithEmail(email, password, fullName);
      if (error) throw error;
      setSuccess("Check your email for a confirmation link!");
      setMode('login');
    } catch (err: any) {
      console.error("Signup error:", err);
      setError(err.message || "An error occurred during signup");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isConfigured) {
      setError("Password reset is disabled - Supabase not configured.");
      return;
    }

    if (!email) {
      setError("Please enter your email");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const { error } = await resetPassword(email);
      if (error) throw error;
      setSuccess("Check your email for password reset instructions!");
    } catch (err: any) {
      console.error("Reset password error:", err);
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-white dark:bg-[#0B1121] rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-white/10"
          >
            {/* Background Gradients */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-gradient-to-b from-primary-500/20 to-transparent pointer-events-none" />

            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors rounded-full hover:bg-slate-100 dark:hover:bg-white/5 z-20"
            >
              <IconX className="w-5 h-5" />
            </button>

            <div className="p-8 md:p-10 flex flex-col items-center text-center relative z-10">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center shadow-lg shadow-primary-500/30 mb-6">
                <IconZap className="w-8 h-8 text-white" />
              </div>

              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                {mode === 'login' && 'Welcome back'}
                {mode === 'signup' && 'Create an account'}
                {mode === 'forgot' && 'Reset password'}
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-6 text-sm">
                {mode === 'login' && 'Sign in to access unlimited lead searches and export your data instantly.'}
                {mode === 'signup' && 'Join LocalLeads to find and manage your business leads.'}
                {mode === 'forgot' && 'Enter your email and we\'ll send you reset instructions.'}
              </p>

              {error && (
                <div className="w-full bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 text-xs p-3 rounded-xl mb-4 text-left">
                  {error}
                </div>
              )}

              {success && (
                <div className="w-full bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-500/20 text-green-600 dark:text-green-400 text-xs p-3 rounded-xl mb-4 text-left">
                  {success}
                </div>
              )}

              {/* Google Sign In - Show on login and signup */}
              {(mode === 'login' || mode === 'signup') && (
                <>
                  <button
                    onClick={handleGoogleLogin}
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-3 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/10 text-slate-700 dark:text-white font-medium py-3 px-6 rounded-xl transition-all shadow-sm hover:shadow-md active:scale-95 disabled:opacity-70 disabled:pointer-events-none group"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M23.766 12.2764C23.766 11.4607 23.6999 10.6406 23.5588 9.83807H12.24V14.4591H18.7217C18.4528 15.9494 17.5885 17.2678 16.323 18.1056V21.1039H20.19C22.4608 19.0139 23.766 15.9274 23.766 12.2764Z" fill="#4285F4" />
                      <path d="M12.24 24.0008C15.4765 24.0008 18.2058 22.9382 20.19 21.1039L16.323 18.1056C15.251 18.8375 13.8627 19.252 12.24 19.252C9.11388 19.252 6.45946 17.1399 5.50705 14.3003H1.5166V17.3912C3.55371 21.4434 7.7029 24.0008 12.24 24.0008Z" fill="#34A853" />
                      <path d="M5.50705 14.3003C5.00088 12.8099 5.00088 11.1961 5.50705 9.70575V6.61481H1.5166C-0.18551 10.0056 -0.18551 14.0009 1.5166 17.3912L5.50705 14.3003Z" fill="#FBBC05" />
                      <path d="M12.24 4.74966C13.9509 4.7232 15.6044 5.36697 16.8434 6.54867L20.2695 3.12262C18.1001 1.0855 15.2208 -0.034466 12.24 0.000808666C7.7029 0.000808666 3.55371 2.55822 1.5166 6.61481L5.50705 9.70575C6.45079 6.86173 9.10947 4.74966 12.24 4.74966Z" fill="#EA4335" />
                    </svg>
                    <span>Continue with Google</span>
                  </button>

                  <div className="flex items-center w-full my-4">
                    <div className="flex-1 h-px bg-slate-200 dark:bg-white/10"></div>
                    <span className="px-4 text-xs text-slate-500 dark:text-slate-400">or</span>
                    <div className="flex-1 h-px bg-slate-200 dark:bg-white/10"></div>
                  </div>
                </>
              )}

              {/* Email/Password Form */}
              <form onSubmit={mode === 'login' ? handleEmailLogin : mode === 'signup' ? handleEmailSignup : handleForgotPassword} className="w-full space-y-4">
                {mode === 'signup' && (
                  <input
                    type="text"
                    placeholder="Full name (optional)"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all"
                  />
                )}

                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all"
                />

                {mode !== 'forgot' && (
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all"
                  />
                )}

                {mode === 'login' && (
                  <button
                    type="button"
                    onClick={() => handleModeChange('forgot')}
                    className="text-xs text-primary-600 dark:text-primary-400 hover:underline w-full text-right"
                  >
                    Forgot password?
                  </button>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white font-medium py-3 px-6 rounded-xl transition-all shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 active:scale-95 disabled:opacity-70 disabled:pointer-events-none"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto" />
                  ) : (
                    <>
                      {mode === 'login' && 'Sign in'}
                      {mode === 'signup' && 'Create account'}
                      {mode === 'forgot' && 'Send reset link'}
                    </>
                  )}
                </button>
              </form>

              {/* Mode switcher */}
              <div className="mt-6 text-sm text-slate-600 dark:text-slate-400">
                {mode === 'login' && (
                  <>
                    Don't have an account?{' '}
                    <button
                      onClick={() => handleModeChange('signup')}
                      className="text-primary-600 dark:text-primary-400 font-medium hover:underline"
                    >
                      Sign up
                    </button>
                  </>
                )}
                {mode === 'signup' && (
                  <>
                    Already have an account?{' '}
                    <button
                      onClick={() => handleModeChange('login')}
                      className="text-primary-600 dark:text-primary-400 font-medium hover:underline"
                    >
                      Sign in
                    </button>
                  </>
                )}
                {mode === 'forgot' && (
                  <button
                    onClick={() => handleModeChange('login')}
                    className="text-primary-600 dark:text-primary-400 font-medium hover:underline"
                  >
                    Back to sign in
                  </button>
                )}
              </div>

              <p className="mt-6 text-xs text-slate-500 dark:text-slate-500 max-w-xs mx-auto leading-relaxed">
                By continuing, you agree to our Terms of Service and Privacy Policy.
              </p>
            </div>

            {/* Bottom Color Bar */}
            <div className="h-1.5 w-full bg-gradient-to-r from-primary-600 via-orange-500 to-amber-500"></div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Login;
