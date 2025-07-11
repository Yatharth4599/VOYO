'use client';

import { useState } from 'react';
import { createApiUrl } from '@/lib/config';
import { motion } from 'framer-motion';

export default function SandboxSignup({
  onClose,
  switchToLogin,
  onSignupSuccess, // 👈 this triggers sandbox unlock
}: {
  onClose: () => void;
  switchToLogin: () => void;
  onSignupSuccess: () => void;
}) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phonenumber: '',
    password: '',
  });
  const [countryCode, setCountryCode] = useState('+971');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validatePassword = (password: string) => {
    const minLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    return {
      isValid: minLength && hasUpperCase && hasLowerCase && hasSpecialChar,
      errors: { minLength, hasUpperCase, hasLowerCase, hasSpecialChar }
    };
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    const passwordValidation = validatePassword(formData.password);
    if (!passwordValidation.isValid) {
      const msg = [];
      if (!passwordValidation.errors.minLength) msg.push('8 characters');
      if (!passwordValidation.errors.hasUpperCase) msg.push('1 uppercase');
      if (!passwordValidation.errors.hasLowerCase) msg.push('1 lowercase');
      if (!passwordValidation.errors.hasSpecialChar) msg.push('1 special char');
      setError(`Password must include: ${msg.join(', ')}`);
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch(createApiUrl('/user'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          phonenumber: `${countryCode}${formData.phonenumber.trim()}`,
        }),
      });

      if (!res.ok) {
        const err = await res.text();
        setError(err || 'Signup failed. Try again.');
      } else {
        const result = await res.json();
        setSuccess('Account created! Logging you in...');

        // Try login immediately after successful signup
        const loginRes = await fetch(createApiUrl('/login'), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        });

        const loginData = await loginRes.json();

        if (!loginRes.ok || !loginData.token) {
          setError('Signup succeeded, but login failed. Please try logging in manually.');
          return;
        }

        localStorage.setItem('jwtToken', loginData.token);

        onClose();
        onSignupSuccess();

      }
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md relative">
      <button
        onClick={onClose}
        className="absolute -top-2 -right-2 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800 transition-all duration-200 z-10 cursor-pointer"
      >
        <span className="text-lg leading-none">&times;</span>
      </button>

      <div className="text-center mb-8">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h3 className="text-2xl font-semibold text-gray-900 mb-2">Create your account</h3>
          <p className="text-gray-600">No salesy detours. Just sandbox.</p>
        </motion.div>
      </div>

      <motion.form onSubmit={handleSubmit} className="space-y-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium text-gray-700 block">Full Name</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-gray-900" />
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-gray-700 block">Email</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-gray-900" />
        </div>

        <div className="space-y-2">
          <label htmlFor="phonenumber" className="text-sm font-medium text-gray-700 block">Phone</label>
          <div className="flex">
            <select value={countryCode} onChange={(e) => setCountryCode(e.target.value)} className="rounded-l-lg border border-gray-200 bg-white text-gray-900 px-2 py-3 text-sm">
              <option value="+971">🇦🇪 +971</option>
              <option value="+91">🇮🇳 +91</option>
            </select>
            <input type="tel" id="phonenumber" name="phonenumber" value={formData.phonenumber} onChange={handleChange} required className="w-full px-4 py-3 rounded-r-lg border-t border-b border-r border-gray-200 bg-white text-gray-900" />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium text-gray-700 block">Password</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-gray-900" />
        </div>

        {error && <motion.div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">{error}</motion.div>}
        {success && <motion.div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">{success}</motion.div>}

        <motion.button type="submit" disabled={isLoading} className="w-full btn-modern text-lg py-3 disabled:opacity-50">
          {isLoading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Signing up...</span>
            </div>
          ) : (
            'Create Account'
          )}
        </motion.button>

        <p className="text-xs text-gray-500 text-center mt-2">
          By signing up, you agree to our <a href="#" className="text-orange-600 font-medium">Terms</a> and <a href="#" className="text-orange-600 font-medium">Privacy Policy</a>
        </p>
      </motion.form>

      <div className="text-center mt-6">
        <button onClick={switchToLogin} className="text-orange-600 hover:text-orange-700 font-medium">Already have an account? Sign in</button>
      </div>
    </div>
  );
}
