import { createApiUrl } from './config';

export interface User {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  createdAt: string;
  updatedAt: string;
}

export const getRedirectPath = (): string => {
  if (typeof window !== 'undefined') {
    const currentPath = window.location.pathname;
    if (currentPath === '/landingV2' || currentPath === '/agentsV2') {
      return '/agentsV2';
    }
  }
  return '/post-login';
};

export const checkAuthStatus = async (): Promise<User | null> => {
  try {
    const token = localStorage.getItem('jwtToken');
    if (!token) return null;

    const response = await fetch(createApiUrl('/me'), {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      localStorage.removeItem('jwtToken');
      return null;
    }

    const user = await response.json();
    return user;
  } catch (error) {
    console.error('Auth check failed:', error);
    localStorage.removeItem('jwtToken');
    return null;
  }
};

export const logout = (): void => {
  console.log('Logout function called');
  console.log('Token before removal:', localStorage.getItem('jwtToken'));
  
  // Remove the token
  localStorage.removeItem('jwtToken');
  
  console.log('Token after removal:', localStorage.getItem('jwtToken'));
  
  // Redirect to landing page
  console.log('Redirecting to /landingV2');
  window.location.href = '/landingV2';
};