'use client';

import Navbar from '@/components/landingV2/Navbar';
import Footer from '@/components/landingV2/Footer';
import Pagination from '@/components/Pagination';
import { useEffect, useState } from 'react';

type Doc = {
  ID: string;
  name: string;
  email: string;
  phone: string;
};

const generateFakeUsers = (count: number): Doc[] => {
  const names = ['John McAllister', 'Alice Zhang', 'Bob Lee', 'Maria Ahmed', 'Tariq Khan', 'Emily Stone'];
  return Array.from({ length: count }, (_, i) => ({
    ID: (1000 + i).toString(),
    name: names[i % names.length],
    email: `user${i}@example.com`,
    phone: `050 ${Math.floor(1000000 + Math.random() * 9000000)}`,
  }));
};

export default function AdminPanel() {
  const [docs, setDocs] = useState<Doc[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const rowsPerPage = 10;
  const [editingUser, setEditingUser] = useState<Doc | null>(null);


  useEffect(() => {
    setDocs(generateFakeUsers(43)); // ⚡️ generate 43 fake users
  }, []);

  const filteredDocs = docs.filter((doc) =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredDocs.length / rowsPerPage);
  const paginatedDocs = filteredDocs.slice(
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


  const handleDelete = (id: string) => {
  setDocs((prev) => prev.filter((doc) => doc.ID !== id));
  };

  const handleEditSave = (updated: Doc) => {
  setDocs((prev) =>
    prev.map((doc) => (doc.ID === updated.ID ? updated : doc))
  );
  setEditingUser(null);
};


  return (
    <div className="min-h-screen text-gray-800 bg-[#FFFBF3] relative dark:bg-gradient-to-b dark:from-[#120B27] dark:via-orange-950 dark:to-black text-black dark:text-white">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <h1 className="text-3xl font-bold">Admin Panel</h1>

        <div className="dark:bg-gradient-to-r dark:from-cyan-400 dark:via-blue-700 dark:to-purple-600 rounded-xl p-1">
          <section className="bg-white dark:bg-black p-6 rounded-xl shadow-md">
            <p className="text-lg font-medium">
              Total Number of Users:{' '}
              <span className="font-bold">{filteredDocs.length}</span>
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
                  <th className="p-3 border-b text-center" colSpan={2}></th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {paginatedDocs.map((doc) => (
                  <tr key={doc.ID} className="hover:bg-gray-100 dark:hover:bg-zinc-900 transition">
                    <td className="p-3 border-b">{doc.ID}</td>
                    <td className="p-3 border-b">{doc.name}</td>
                    <td className="p-3 border-b">{doc.email}</td>
                    <td className="p-3 border-b">{doc.phone}</td>
                    <td className="p-3 border-b text-center">
                      <button
                        onClick={() => setEditingUser(doc)}
                        className="text-blue-500 hover:underline cursor-pointer"
                      >
                        Edit
                      </button>
                    </td>
                    <td className="p-3 border-b text-center">
                      <button
                        onClick={() => handleDelete(doc.ID)}
                        className="text-red-500 hover:underline cursor-pointer"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {paginatedDocs.length === 0 && (
                  <tr>
                    <td colSpan={6} className="text-center py-4 text-gray-400 dark:text-gray-500">
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
            <input
              type="text"
              value={editingUser.name}
              onChange={(e) =>
                setEditingUser({ ...editingUser, name: e.target.value })
              }
              placeholder="Name"
              className="w-full p-2 border rounded-md bg-white dark:bg-zinc-800 dark:text-white"
            />
            <input
              type="email"
              value={editingUser.email}
              onChange={(e) =>
                setEditingUser({ ...editingUser, email: e.target.value })
              }
              placeholder="Email"
              className="w-full p-2 border rounded-md bg-white dark:bg-zinc-800 dark:text-white"
            />
            <input
              type="text"
              value={editingUser.phone}
              onChange={(e) =>
                setEditingUser({ ...editingUser, phone: e.target.value })
              }
              placeholder="Phone"
              className="w-full p-2 border rounded-md bg-white dark:bg-zinc-800 dark:text-white"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setEditingUser(null)}
                className="px-4 py-2 rounded-md border text-gray-700 dark:text-gray-300 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => handleEditSave(editingUser)}
                className="px-4 py-2 rounded-md bg-amber-500 dark:bg-purple-500 text-white cursor-pointer"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

