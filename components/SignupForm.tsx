'use client';

import { useState } from 'react';

export default function SignupForm({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    companyEmail: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('🚀 Form submitted:', formData);
    onClose(); // Close the modal after submission
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
          type="email"
          name="email"
          placeholder="Personal Email"
          value={formData.email}
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
          type="email"
          name="companyEmail"
          placeholder="Company Email"
          value={formData.companyEmail}
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

        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded font-semibold"
        >
          Schedule a call
        </button>
      </form>
    </div>
  );
}
