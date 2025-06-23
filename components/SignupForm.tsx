// // 'use client';

// // import { useState } from 'react';
// // import { createApiUrl } from '@/lib/config';
// // import { motion } from 'framer-motion';

// // export default function SignupForm({ onClose }: { onClose: () => void }) {
// //   const [formData, setFormData] = useState({
// //     name: '',
// //     email: '',
// //     phonenumber: '',
// //     password: '',
// //   });
// //   const [error, setError] = useState('');
// //   const [success, setSuccess] = useState('');
// //   const [isLoading, setIsLoading] = useState(false);

// //   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     const { name, value } = e.target;
// //     setFormData((prev) => ({ ...prev, [name]: value }));
// //     if (error) setError(''); // Clear error when user starts typing
// //   };

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     setError('');
// //     setSuccess('');
// //     setIsLoading(true);

// //     try {
// //       const res = await fetch(createApiUrl('/user'), {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //         body: JSON.stringify(formData),
// //       });

// //       if (!res.ok) {
// //         const err = await res.text();
// //         setError(err || 'Signup failed. Please try again.');
// //       } else {
// //         const data = await res.json();
// //         setSuccess('Account created successfully! You can now sign in.');
        
// //         // Clear form
// //         setFormData({
// //           name: '',
// //           email: '',
// //           phonenumber: '',
// //           password: '',
// //         });
        
// //         // Close modal after a delay
// //         setTimeout(() => {
// //           onClose();
// //         }, 2000);
// //       }
// //     } catch (error) {
// //       console.error('Network error:', error);
// //       setError('Network error. Please try again later.');
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="w-full max-w-md relative">
// //       {/* Close button */}
// //       <button
// //         onClick={onClose}
// //         className="absolute -top-2 -right-2 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800 transition-all duration-200 z-10"
// //       >
// //         <span className="text-lg leading-none">&times;</span>
// //       </button>

// //       {/* Header */}
// //       <div className="text-center mb-8">
// //         <motion.div
// //           initial={{ opacity: 0, y: -10 }}
// //           animate={{ opacity: 1, y: 0 }}
// //           transition={{ duration: 0.5 }}
// //         >
// //           <h3 className="text-2xl font-semibold text-gray-900 mb-2">Create your account</h3>
// //           <p className="text-gray-600">Join thousands of businesses transforming with AI</p>
// //         </motion.div>
// //       </div>

// //       {/* Form */}
// //       <motion.form
// //         onSubmit={handleSubmit}
// //         className="space-y-6"
// //         initial={{ opacity: 0, y: 20 }}
// //         animate={{ opacity: 1, y: 0 }}
// //         transition={{ duration: 0.5, delay: 0.1 }}
// //       >
// //         {/* Name Field */}
// //         <div className="space-y-2">
// //           <label htmlFor="name" className="text-sm font-medium text-gray-700 block">
// //             Full Name
// //           </label>
// //           <input
// //             type="text"
// //             id="name"
// //             name="name"
// //             placeholder="Enter your full name"
// //             value={formData.name}
// //             onChange={handleChange}
// //             required
// //             className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
// //           />
// //         </div>

// //         {/* Email Field */}
// //         <div className="space-y-2">
// //           <label htmlFor="email" className="text-sm font-medium text-gray-700 block">
// //             Work Email
// //           </label>
// //           <input
// //             type="email"
// //             id="email"
// //             name="email"
// //             placeholder="Enter your work email"
// //             value={formData.email}
// //             onChange={handleChange}
// //             required
// //             className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
// //           />
// //         </div>

// //         {/* Phone Field */}
// //         <div className="space-y-2">
// //           <label htmlFor="phonenumber" className="text-sm font-medium text-gray-700 block">
// //             Phone Number
// //           </label>
// //           <input
// //             type="tel"
// //             id="phonenumber"
// //             name="phonenumber"
// //             placeholder="Enter your phone number"
// //             value={formData.phonenumber}
// //             onChange={handleChange}
// //             required
// //             className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
// //           />
// //         </div>

// //         {/* Password Field */}
// //         <div className="space-y-2">
// //           <label htmlFor="password" className="text-sm font-medium text-gray-700 block">
// //             Password
// //           </label>
// //           <input
// //             type="password"
// //             id="password"
// //             name="password"
// //             placeholder="Create a secure password"
// //             value={formData.password}
// //             onChange={handleChange}
// //             required
// //             className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
// //           />
// //         </div>

// //         {/* Error Message */}
// //         {error && (
// //           <motion.div
// //             initial={{ opacity: 0, y: -10 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm"
// //           >
// //             {error}
// //           </motion.div>
// //         )}

// //         {/* Success Message */}
// //         {success && (
// //           <motion.div
// //             initial={{ opacity: 0, y: -10 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm"
// //           >
// //             {success}
// //           </motion.div>
// //         )}

// //         {/* Submit Button */}
// //         <motion.button
// //           type="submit"
// //           disabled={isLoading}
// //           className="w-full btn-modern text-lg py-3 disabled:opacity-50 disabled:cursor-not-allowed"
// //           whileHover={{ scale: isLoading ? 1 : 1.01 }}
// //           whileTap={{ scale: isLoading ? 1 : 0.99 }}
// //         >
// //           {isLoading ? (
// //             <div className="flex items-center justify-center space-x-2">
// //               <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
// //               <span>Creating account...</span>
// //             </div>
// //           ) : (
// //             'Create Account'
// //           )}
// //         </motion.button>

// //         {/* Terms */}
// //         <p className="text-xs text-gray-500 text-center leading-relaxed">
// //           By creating an account, you agree to our{' '}
// //           <a href="#" className="text-orange-600 hover:text-orange-700 font-medium">
// //             Terms of Service
// //           </a>{' '}
// //           and{' '}
// //           <a href="#" className="text-orange-600 hover:text-orange-700 font-medium">
// //             Privacy Policy
// //           </a>
// //         </p>
// //       </motion.form>

// //       {/* Divider */}
// //       <div className="my-8 relative">
// //         <div className="absolute inset-0 flex items-center">
// //           <div className="w-full border-t border-gray-200"></div>
// //         </div>
// //         <div className="relative flex justify-center text-sm">
// //           <span className="px-4 bg-white text-gray-500">Already have an account?</span>
// //         </div>
// //       </div>

// //       {/* Sign In Link */}
// //       <div className="text-center">
// //         <button
// //           type="button"
// //           className="text-orange-600 hover:text-orange-700 font-medium transition-colors duration-200"
// //           onClick={() => {
// //             // You can add logic here to switch to login form
// //             onClose();
// //           }}
// //         >
// //           Sign in to your account
// //         </button>
// //       </div>
// //     </div>
// //   );
// // }


// 'use client';

// import { useState } from 'react';
// import { createApiUrl } from '@/lib/config';
// import { motion } from 'framer-motion';

// export default function SignupForm({ onClose }: { onClose: () => void }) {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phonenumber: '',
//     password: '',
//   });
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [countryCode, setCountryCode] = useState('+971'); // Default to UAE

//   const validatePassword = (password: string) => {
//     const minLength = password.length >= 8;
//     const hasUpperCase = /[A-Z]/.test(password);
//     const hasLowerCase = /[a-z]/.test(password);
//     const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
//     return {
//       isValid: minLength && hasUpperCase && hasLowerCase && hasSpecialChar,
//       errors: {
//         minLength,
//         hasUpperCase,
//         hasLowerCase,
//         hasSpecialChar
//       }
//     };
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//     if (error) setError(''); // Clear error when user starts typing
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');
//     setSuccess('');
//     setIsLoading(true);

//     // Validate password
//     const passwordValidation = validatePassword(formData.password);
//     if (!passwordValidation.isValid) {
//       const errorMessages = [];
//       if (!passwordValidation.errors.minLength) errorMessages.push('at least 8 characters');
//       if (!passwordValidation.errors.hasUpperCase) errorMessages.push('one uppercase letter');
//       if (!passwordValidation.errors.hasLowerCase) errorMessages.push('one lowercase letter');
//       if (!passwordValidation.errors.hasSpecialChar) errorMessages.push('one special character');
      
//       setError(`Password must contain ${errorMessages.join(', ')}.`);
//       setIsLoading(false);
//       return;
//     }

//     try {
//       const res = await fetch(createApiUrl('/user'), {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//         ...formData,
//         phonenumber: `${countryCode}${formData.phonenumber.trim()}`,
//       }),
//       });

//       if (!res.ok) {
//         const err = await res.text();
//         setError(err || 'Signup failed. Please try again.');
//       } else {
//         await res.json();
//         setSuccess('Account created successfully! You can now sign in.');
        
//         // Clear form
//         setFormData({
//           name: '',
//           email: '',
//           phonenumber: '',
//           password: '',
//         });
        
//         // Close modal after a delay
//         setTimeout(() => {
//           onClose();
//         }, 2000);
//       }
//     } catch (error) {
//       console.error('Network error:', error);
//       setError('Network error. Please try again later.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="w-full max-w-md relative">
//       {/* Close button */}
//       <button
//         onClick={onClose}
//         className="absolute -top-2 -right-2 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800 transition-all duration-200 z-10 cursor-pointer"
//       >
//         <span className="text-lg leading-none">&times;</span>
//       </button>

//       {/* Header */}
//       <div className="text-center mb-8">
//         <motion.div
//           initial={{ opacity: 0, y: -10 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           <h3 className="text-2xl font-semibold text-gray-900 mb-2">Create your account</h3>
//           <p className="text-gray-600">Join thousands of businesses transforming with AI</p>
//         </motion.div>
//       </div>

//       {/* Form */}
//       <motion.form
//         onSubmit={handleSubmit}
//         className="space-y-6"
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5, delay: 0.1 }}
//       >
//         {/* Name Field */}
//         <div className="space-y-2">
//           <label htmlFor="name" className="text-sm font-medium text-gray-700 block">
//             Full Name
//           </label>
//           <input
//             type="text"
//             id="name"
//             name="name"
//             placeholder="Enter your full name"
//             value={formData.name}
//             onChange={handleChange}
//             required
//             className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
//           />
//         </div>

//         {/* Email Field */}
//         <div className="space-y-2">
//           <label htmlFor="email" className="text-sm font-medium text-gray-700 block">
//             Work Email
//           </label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             placeholder="Enter your work email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//             className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
//           />
//         </div>

//         {/* Phone Field with Country Code */}
//         <div className="space-y-2">
//           <label htmlFor="phonenumber" className="text-sm font-medium text-gray-700 block">
//             Phone Number
//           </label>
//           <div className="flex">
//             <select
//               value={countryCode}
//               onChange={(e) => setCountryCode(e.target.value)}
//               className="rounded-l-lg border border-gray-200 bg-white text-gray-900 px-2 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
//             >
//               <option value="+971">🇦🇪 +971</option>
//               <option value="+91">🇮🇳 +91</option>
//             </select>
//             <input
//               type="tel"
//               id="phonenumber"
//               name="phonenumber"
//               placeholder="Enter phone number"
//               value={formData.phonenumber}
//               onChange={handleChange}
//               required
//               className="w-full px-4 py-3 rounded-r-lg border-t border-b border-r border-gray-200 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
//             />
//           </div>
//         </div>


//         {/* Password Field */}
//         <div className="space-y-2">
//           <label htmlFor="password" className="text-sm font-medium text-gray-700 block">
//             Password
//           </label>
//           <input
//             type="password"
//             id="password"
//             name="password"
//             placeholder="Create a secure password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//             className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
//           />
//           {formData.password && (
//             <div className="mt-2 text-xs space-y-1">
//               <div className="text-gray-600">Password must contain:</div>
//               <div className={`flex items-center space-x-1 ${formData.password.length >= 8 ? 'text-green-600' : 'text-red-500'}`}>
//                 <span>{formData.password.length >= 8 ? '✓' : '✗'}</span>
//                 <span>At least 8 characters</span>
//               </div>
//               <div className={`flex items-center space-x-1 ${/[A-Z]/.test(formData.password) ? 'text-green-600' : 'text-red-500'}`}>
//                 <span>{/[A-Z]/.test(formData.password) ? '✓' : '✗'}</span>
//                 <span>One uppercase letter</span>
//               </div>
//               <div className={`flex items-center space-x-1 ${/[a-z]/.test(formData.password) ? 'text-green-600' : 'text-red-500'}`}>
//                 <span>{/[a-z]/.test(formData.password) ? '✓' : '✗'}</span>
//                 <span>One lowercase letter</span>
//               </div>
//               <div className={`flex items-center space-x-1 ${/[!@#$%^&*(),.?":{}|<>]/.test(formData.password) ? 'text-green-600' : 'text-red-500'}`}>
//                 <span>{/[!@#$%^&*(),.?":{}|<>]/.test(formData.password) ? '✓' : '✗'}</span>
//                 <span>One special character</span>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Error Message */}
//         {error && (
//           <motion.div
//             initial={{ opacity: 0, y: -10 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm"
//           >
//             {error}
//           </motion.div>
//         )}

//         {/* Success Message */}
//         {success && (
//           <motion.div
//             initial={{ opacity: 0, y: -10 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm"
//           >
//             {success}
//           </motion.div>
//         )}

//         {/* Submit Button */}
//         <motion.button
//           type="submit"
//           disabled={isLoading}
//           className="w-full btn-modern text-lg py-3 disabled:opacity-50 disabled:cursor-not-allowed"
//           whileHover={{ scale: isLoading ? 1 : 1.01 }}
//           whileTap={{ scale: isLoading ? 1 : 0.99 }}
//         >
//           {isLoading ? (
//             <div className="flex items-center justify-center space-x-2">
//               <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//               <span>Creating account...</span>
//             </div>
//           ) : (
//             'Create Account'
//           )}
//         </motion.button>

//         {/* Terms */}
//         <p className="text-xs text-gray-500 text-center leading-relaxed">
//           By creating an account, you agree to our{' '}
//           <a href="#" className="text-orange-600 hover:text-orange-700 font-medium">
//             Terms of Service
//           </a>{' '}
//           and{' '}
//           <a href="#" className="text-orange-600 hover:text-orange-700 font-medium">
//             Privacy Policy
//           </a>
//         </p>
//       </motion.form>

//       {/* Divider */}
//       <div className="my-8 relative">
//         <div className="absolute inset-0 flex items-center">
//           <div className="w-full border-t border-gray-200"></div>
//         </div>
//         <div className="relative flex justify-center text-sm">
//           <span className="px-4 bg-[#faf6e8f6] text-gray-500">Already have an account?</span>
//         </div>
//       </div>

//       {/* Sign In Link */}
//       <div className="text-center">
//         <button
//           type="button"
//           className="text-orange-600 hover:text-orange-700 font-medium transition-colors duration-200"
//           onClick={() => {
//             // You can add logic here to switch to login form
//             onClose();
//           }}
//         >
//           Sign in to your account
//         </button>
//       </div>
//     </div>
//   );
// }

'use client';

import { useState } from 'react';
import { createApiUrl } from '@/lib/config';
import { motion } from 'framer-motion';

export default function SignupForm({ onClose, switchToLogin }: { onClose: () => void; switchToLogin: () => void }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phonenumber: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [countryCode, setCountryCode] = useState('+971'); // Default to UAE

  const validatePassword = (password: string) => {
    const minLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    return {
      isValid: minLength && hasUpperCase && hasLowerCase && hasSpecialChar,
      errors: {
        minLength,
        hasUpperCase,
        hasLowerCase,
        hasSpecialChar
      }
    };
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError(''); // Clear error when user starts typing
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    // Validate password
    const passwordValidation = validatePassword(formData.password);
    if (!passwordValidation.isValid) {
      const errorMessages = [];
      if (!passwordValidation.errors.minLength) errorMessages.push('at least 8 characters');
      if (!passwordValidation.errors.hasUpperCase) errorMessages.push('one uppercase letter');
      if (!passwordValidation.errors.hasLowerCase) errorMessages.push('one lowercase letter');
      if (!passwordValidation.errors.hasSpecialChar) errorMessages.push('one special character');
      
      setError(`Password must contain ${errorMessages.join(', ')}.`);
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch(createApiUrl('/user'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        ...formData,
        phonenumber: `${countryCode}${formData.phonenumber.trim()}`,
      }),
      });

      if (!res.ok) {
        const err = await res.text();
        setError(err || 'Signup failed. Please try again.');
      } else {
        await res.json();
        setSuccess('Account created successfully! You can now sign in.');
        
        // Clear form
        setFormData({
          name: '',
          email: '',
          phonenumber: '',
          password: '',
        });
        
        // Close modal after a delay
        setTimeout(() => {
          onClose();
        }, 2000);
      }
    } catch (error) {
      console.error('Network error:', error);
      setError('Network error. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md relative">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute -top-2 -right-2 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800 transition-all duration-200 z-10 cursor-pointer"
      >
        <span className="text-lg leading-none">&times;</span>
      </button>

      {/* Header */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-2xl font-semibold text-gray-900 mb-2">Create your account</h3>
          <p className="text-gray-600">Join thousands of businesses transforming with AI</p>
        </motion.div>
      </div>

      {/* Form */}
      <motion.form
        onSubmit={handleSubmit}
        className="space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {/* Name Field */}
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium text-gray-700 block">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
          />
        </div>

        {/* Email Field */}
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-gray-700 block">
            Work Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your work email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
          />
        </div>

        {/* Phone Field with Country Code */}
        <div className="space-y-2">
          <label htmlFor="phonenumber" className="text-sm font-medium text-gray-700 block">
            Phone Number
          </label>
          <div className="flex">
            <select
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              className="rounded-l-lg border border-gray-200 bg-white text-gray-900 px-2 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="+971">🇦🇪 +971</option>
              <option value="+91">🇮🇳 +91</option>
            </select>
            <input
              type="tel"
              id="phonenumber"
              name="phonenumber"
              placeholder="Enter phone number"
              value={formData.phonenumber}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-r-lg border-t border-b border-r border-gray-200 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>


        {/* Password Field */}
        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium text-gray-700 block">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Create a secure password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
          />
          {formData.password && (
            <div className="mt-2 text-xs space-y-1">
              <div className="text-gray-600">Password must contain:</div>
              <div className={`flex items-center space-x-1 ${formData.password.length >= 8 ? 'text-green-600' : 'text-red-500'}`}>
                <span>{formData.password.length >= 8 ? '✓' : '✗'}</span>
                <span>At least 8 characters</span>
              </div>
              <div className={`flex items-center space-x-1 ${/[A-Z]/.test(formData.password) ? 'text-green-600' : 'text-red-500'}`}>
                <span>{/[A-Z]/.test(formData.password) ? '✓' : '✗'}</span>
                <span>One uppercase letter</span>
              </div>
              <div className={`flex items-center space-x-1 ${/[a-z]/.test(formData.password) ? 'text-green-600' : 'text-red-500'}`}>
                <span>{/[a-z]/.test(formData.password) ? '✓' : '✗'}</span>
                <span>One lowercase letter</span>
              </div>
              <div className={`flex items-center space-x-1 ${/[!@#$%^&*(),.?":{}|<>]/.test(formData.password) ? 'text-green-600' : 'text-red-500'}`}>
                <span>{/[!@#$%^&*(),.?":{}|<>]/.test(formData.password) ? '✓' : '✗'}</span>
                <span>One special character</span>
              </div>
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm"
          >
            {error}
          </motion.div>
        )}

        {/* Success Message */}
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm"
          >
            {success}
          </motion.div>
        )}

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={isLoading}
          className="w-full btn-modern text-lg py-3 disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={{ scale: isLoading ? 1 : 1.01 }}
          whileTap={{ scale: isLoading ? 1 : 0.99 }}
        >
          {isLoading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Creating account...</span>
            </div>
          ) : (
            'Create Account'
          )}
        </motion.button>

        {/* Terms */}
        <p className="text-xs text-gray-500 text-center leading-relaxed">
          By creating an account, you agree to our{' '}
          <a href="#" className="text-orange-600 hover:text-orange-700 font-medium">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="#" className="text-orange-600 hover:text-orange-700 font-medium">
            Privacy Policy
          </a>
        </p>
      </motion.form>

      {/* Divider */}
      <div className="my-8 relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-[#faf6e8f6] text-gray-500">Already have an account?</span>
        </div>
      </div>

      {/* Sign In Link */}
      <div className="text-center">
        <button
          type="button"
          className="text-orange-600 hover:text-orange-700 font-medium transition-colors duration-200 cursor-pointer"
            // You can add logic here to switch to login form
            onClick={switchToLogin}
        >
          Sign in to your account
        </button>
      </div>
    </div>
  );
}