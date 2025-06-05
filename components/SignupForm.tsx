'use client';

import { useState } from 'react';

export default function SignupForm({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    name: '',
    companyEmail: '',
    phone: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('🚀 Submitting:', formData);
  
    try {
      const res = await fetch('http://10.12.26.65:3000/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (!res.ok) {
        const err = await res.text();
        console.error('❌ Submission failed:', err);
        alert('Submission failed: ' + err);
      } else {
        const data = await res.json();
        console.log('✅ Success:', data);
        alert('Signup successful!');
        onClose(); // Close modal
      }
    } catch (error) {
      console.error('❌ Network error:', error);
      alert('Network error. Please try again later.');
    }
  };
  

  return (
    <div className="w-full max-w-md">
      <button
        onClick={onClose}
        className="absolute top-2 right-4 text-gray-400 hover:text-white text-xl font-bold cursor-pointer"
      >
        &times;
      </button>
      <h3 className="text-white text-2xl font-bold mb-6">Get in Touch</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 rounded bg-gray-800 text-white focus:outline-none"
        />
        <input
          type="companyEmail"
          name="companyEmail"
          placeholder="Company Email"
          value={formData.companyEmail}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 rounded bg-gray-800 text-white focus:outline-none"
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 rounded bg-gray-800 text-white focus:outline-none"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 rounded bg-gray-800 text-white focus:outline-none"
        />
        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded font-semibold"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
