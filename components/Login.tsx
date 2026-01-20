
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconX, IconZap } from './Icons';
import { supabase } from '../lib/supabase';

interface LoginProps {
  isOpen: boolean;
  onClose: () => void;
}

const Login: React.FC<LoginProps> = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setError(null);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin,
        },
      });
      if (error) throw error;
    } catch (err: any) {
      console.error("Login error:", err);
      // Helpful message if keys aren't set up
      if (err.message?.includes('functions_client_error') || !import.meta.env.VITE_SUPABASE_URL) {
        setError("Supabase configuration missing. Please check your API keys.");
      } else {
        setError(err.message || "An error occurred during login");
      }
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
                Welcome back
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-8 text-sm">
                Sign in to access unlimited lead searches and export your data instantly.
              </p>

              {error && (
                <div className="w-full bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 text-xs p-3 rounded-xl mb-6 text-left">
                  {error}
                </div>
              )}

              <button
                onClick={handleGoogleLogin}
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/10 text-slate-700 dark:text-white font-medium py-3.5 px-6 rounded-xl transition-all shadow-sm hover:shadow-md active:scale-95 disabled:opacity-70 disabled:pointer-events-none group"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-slate-400 border-t-slate-900 dark:border-white/30 dark:border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M23.766 12.2764C23.766 11.4607 23.6999 10.6406 23.5588 9.83807H12.24V14.4591H18.7217C18.4528 15.9494 17.5885 17.2678 16.323 18.1056V21.1039H20.19C22.4608 19.0139 23.766 15.9274 23.766 12.2764Z" fill="#4285F4" />
                      <path d="M12.24 24.0008C15.4765 24.0008 18.2058 22.9382 20.19 21.1039L16.323 18.1056C15.251 18.8375 13.8627 19.252 12.24 19.252C9.11388 19.252 6.45946 17.1399 5.50705 14.3003H1.5166V17.3912C3.55371 21.4434 7.7029 24.0008 12.24 24.0008Z" fill="#34A853" />
                      <path d="M5.50705 14.3003C5.00088 12.8099 5.00088 11.1961 5.50705 9.70575V6.61481H1.5166C-0.18551 10.0056 -0.18551 14.0009 1.5166 17.3912L5.50705 14.3003Z" fill="#FBBC05" />
                      <path d="M12.24 4.74966C13.9509 4.7232 15.6044 5.36697 16.8434 6.54867L20.2695 3.12262C18.1001 1.0855 15.2208 -0.034466 12.24 0.000808666C7.7029 0.000808666 3.55371 2.55822 1.5166 6.61481L5.50705 9.70575C6.45079 6.86173 9.10947 4.74966 12.24 4.74966Z" fill="#EA4335" />
                    </svg>
                    <span className="group-hover:text-slate-900 dark:group-hover:text-white transition-colors">Sign in with Google</span>
                  </>
                )}
              </button>

              <p className="mt-8 text-xs text-slate-500 dark:text-slate-500 max-w-xs mx-auto leading-relaxed">
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
