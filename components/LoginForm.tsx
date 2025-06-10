'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginForm({ onClose }: { onClose: () => void }) {
  const router = useRouter(); // ✅ Now it's correctly inside the component
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://10.12.26.134:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok || !result.token) {
        setError(result.message || 'Login failed');
        return;
      }

      localStorage.setItem('jwtToken', result.token);
      onClose(); // Close modal

      router.push('/dashboard'); // ✅ Redirect after login
    } catch (err) {
      console.error('Login error:', err);
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-80">
      <h3 className="text-xl font-semibold text-white mb-4">Login</h3>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 rounded bg-gray-800 text-white placeholder-gray-400"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 rounded bg-gray-800 text-white placeholder-gray-400"
      />
      {error && <p className="text-red-400 text-sm">{error}</p>}
      <button
        type="submit"
        className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded font-semibold cursor-pointer"
      >
        Login
      </button>
    </form>
  );
}
