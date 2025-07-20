'use client';

import Navbar from '@/components/landingV2/Navbar';
import Footer from '@/components/landingV2/Footer';
import Pagination from '@/components/Pagination';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createApiUrl } from '@/lib/config';

type User = {
  id: number;
  name: string;
  email: string;
  phoneNumber: string | null;
  role: string;
  createdAt: string;
  updatedAt: string;
};

export default function AdminPanel() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const rowsPerPage = 10;
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [editFormData, setEditFormData] = useState({ name: '', password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  // Check admin authentication
  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');
    const adminData = localStorage.getItem('adminData');
    
    if (!adminToken || !adminData) {
      router.push('/admin-login');
      return;
    }

    try {
      const admin = JSON.parse(adminData);
      if (admin.role !== 'ADMIN') {
        router.push('/admin-login');
        return;
      }
    } catch {
      router.push('/admin-login');
      return;
    }

    fetchUsers();
  }, [router]);

  const fetchUsers = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(createApiUrl('/users'), {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem('adminToken');
          localStorage.removeItem('adminData');
          router.push('/admin-login');
          return;
        }
        throw new Error('Failed to fetch users');
      }

      const userData = await response.json();
      setUsers(userData);
    } catch (err) {
      console.error('Error fetching users:', err);
      setError('Failed to load users');
    } finally {
      setIsLoading(false);
    }
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1); // or totalPages if you want to stay on last page
    }
  }, [totalPages, currentPage]);


  const handleDelete = async (userId: number) => {
    if (!window.confirm('Are you sure you want to delete this user?')) {
      return;
    }

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(createApiUrl(`/user/${userId}`), {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete user');
      }

      // Remove user from local state
      setUsers((prev) => prev.filter((user) => user.id !== userId));
    } catch (err) {
      console.error('Error deleting user:', err);
      alert('Failed to delete user');
    }
  };

  const handleEditClick = (user: User) => {
    setEditingUser(user);
    setEditFormData({ name: user.name, password: '', confirmPassword: '' });
    setPasswordError('');
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const handleEditSave = async () => {
    if (!editingUser) return;

    // Validate passwords if password is provided
    if (editFormData.password) {
      if (editFormData.password !== editFormData.confirmPassword) {
        setPasswordError('Passwords do not match');
        return;
      }
      if (editFormData.password.length < 6) {
        setPasswordError('Password must be at least 6 characters long');
        return;
      }
    }

    setPasswordError('');

    try {
      const token = localStorage.getItem('adminToken');
      const updateData: { name: string; password?: string } = { name: editFormData.name };
      
      // Only include password if it's provided
      if (editFormData.password) {
        updateData.password = editFormData.password;
      }

      const response = await fetch(createApiUrl(`/user/${editingUser.id}`), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updateData)
      });

      if (!response.ok) {
        throw new Error('Failed to update user');
      }

      // Update user in local state
      setUsers((prev) =>
        prev.map((user) => 
          user.id === editingUser.id 
            ? { ...user, name: editFormData.name }
            : user
        )
      );
      
      setEditingUser(null);
      setEditFormData({ name: '', password: '', confirmPassword: '' });
      setPasswordError('');
      setShowPassword(false);
      setShowConfirmPassword(false);
    } catch (err) {
      console.error('Error updating user:', err);
      alert('Failed to update user');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminData');
    router.push('/admin-login');
  };


  if (isLoading) {
    return (
      <div className="min-h-screen text-gray-800 bg-[#FFFBF3] relative dark:bg-gradient-to-b dark:from-[#120B27] dark:via-orange-950 dark:to-black text-black dark:text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-gray-800 bg-[#FFFBF3] relative dark:bg-gradient-to-b dark:from-[#120B27] dark:via-orange-950 dark:to-black text-black dark:text-white">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Admin Panel</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
          >
            Logout
          </button>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <div className="dark:bg-gradient-to-r dark:from-cyan-400 dark:via-blue-700 dark:to-purple-600 rounded-xl p-1">
          <section className="bg-white dark:bg-black p-6 rounded-xl shadow-md">
            <p className="text-lg font-medium">
              Total Number of Users:{' '}
              <span className="font-bold">{filteredUsers.length}</span>
            </p>
          </section>
        </div>

        <div className="dark:bg-gradient-to-r dark:from-cyan-400 dark:via-blue-700 dark:to-purple-600 rounded-xl p-1">
          <section className="bg-white dark:bg-black rounded-xl shadow-md">
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
              className="w-full p-2 rounded-md focus:outline-none bg-white dark:bg-zinc-900 dark:text-white"
            />
          </section>
        </div>

        <div className="dark:bg-gradient-to-r dark:from-cyan-400 dark:via-blue-700 dark:to-purple-600 rounded-xl p-1">
          <section className="bg-white dark:bg-black p-6 rounded-xl shadow-md overflow-x-auto">
            <table className="w-full table-auto border-collapse">
              <thead className="bg-zinc-200 dark:bg-zinc-800 text-left text-sm font-semibold text-gray-800 dark:text-white">
                <tr>
                  <th className="p-3 border-b">ID</th>
                  <th className="p-3 border-b">Name</th>
                  <th className="p-3 border-b">Email</th>
                  <th className="p-3 border-b">Phone</th>
                  <th className="p-3 border-b">Role</th>
                  <th className="p-3 border-b text-center" colSpan={2}>Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {paginatedUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-100 dark:hover:bg-zinc-900 transition">
                    <td className="p-3 border-b">{user.id}</td>
                    <td className="p-3 border-b">{user.name}</td>
                    <td className="p-3 border-b">{user.email}</td>
                    <td className="p-3 border-b">{user.phoneNumber || 'N/A'}</td>
                    <td className="p-3 border-b">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        user.role === 'ADMIN' 
                          ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' 
                          : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="p-3 border-b text-center">
                      <button
                        onClick={() => handleEditClick(user)}
                        className="text-blue-500 hover:underline cursor-pointer mr-2"
                      >
                        Edit
                      </button>
                    </td>
                    <td className="p-3 border-b text-center">
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="text-red-500 hover:underline cursor-pointer"
                        disabled={user.role === 'ADMIN'}
                        title={user.role === 'ADMIN' ? 'Cannot delete admin users' : 'Delete user'}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {paginatedUsers.length === 0 && !isLoading && (
                  <tr>
                    <td colSpan={7} className="text-center py-4 text-gray-400 dark:text-gray-500">
                      No users found 🫠
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </section>
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </main>
      <Footer />

      {editingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl w-full max-w-md space-y-4 shadow-xl">
            <h2 className="text-xl font-bold mb-2 text-black dark:text-white">Edit User</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={editFormData.name}
                  onChange={(e) =>
                    setEditFormData({ ...editFormData, name: e.target.value })
                  }
                  placeholder="User name"
                  className="w-full p-3 border rounded-md bg-white dark:bg-zinc-800 dark:text-white border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={editFormData.password}
                    onChange={(e) => {
                      setEditFormData({ ...editFormData, password: e.target.value });
                      if (passwordError) setPasswordError('');
                    }}
                    placeholder="Leave empty to keep current password"
                    autoComplete="new-password"
                    className="w-full p-3 border rounded-md bg-white dark:bg-zinc-800 dark:text-white border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-orange-500 focus:border-transparent pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={editFormData.confirmPassword}
                    onChange={(e) => {
                      setEditFormData({ ...editFormData, confirmPassword: e.target.value });
                      if (passwordError) setPasswordError('');
                    }}
                    placeholder="Confirm new password"
                    autoComplete="new-password"
                    className="w-full p-3 border rounded-md bg-white dark:bg-zinc-800 dark:text-white border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-orange-500 focus:border-transparent pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                  >
                    {showConfirmPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
              {passwordError && (
                <div className="text-red-500 dark:text-red-400 text-sm">
                  {passwordError}
                </div>
              )}
              <div className="text-sm text-gray-500 dark:text-gray-400">
                <strong>Email:</strong> {editingUser.email} (read-only)<br/>
                <strong>Role:</strong> {editingUser.role}<br/>
                <strong>Phone:</strong> {editingUser.phoneNumber || 'N/A'}
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <button
                onClick={() => {
                  setEditingUser(null);
                  setEditFormData({ name: '', password: '', confirmPassword: '' });
                  setPasswordError('');
                  setShowPassword(false);
                  setShowConfirmPassword(false);
                }}
                className="px-4 py-2 rounded-md border text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleEditSave}
                className="px-4 py-2 rounded-md bg-amber-500 dark:bg-purple-500 text-white hover:bg-amber-600 dark:hover:bg-purple-600 transition-colors cursor-pointer"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

