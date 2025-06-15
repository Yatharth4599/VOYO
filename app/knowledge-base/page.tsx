// 'use client';

// import { useEffect, useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';

// type Doc = {
//   name: string;
//   size: string;
//   createdBy: string;
//   updatedAt: string;
//   docId: string;
//   content: string; // Will store extracted_inner_html
// };

// export default function KnowledgeBasePage() {
//   const [docs, setDocs] = useState<Doc[]>([]);
//   const [selected, setSelected] = useState<Doc | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchDocs = async () => {
//       try {
//         const token = localStorage.getItem('jwtToken');
//         if (!token) return;

//         const res = await fetch('http://10.12.26.134:3000/user/knowledge-base', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         const data = await res.json();

//         const formatted = data.documents.map((doc: any) => ({ // eslint-disable-line @typescript-eslint/no-explicit-any
//           name: doc.name,
//           size: `${(doc.metadata.size_bytes / 1024).toFixed(1)} kB`,
//           createdBy: doc.access_info.creator_name,
//           updatedAt: new Date(doc.metadata.last_updated_at_unix_secs * 1000).toLocaleString(),
//           docId: doc.id,
//           content: '', // We'll fetch this later when selected
//         }));

//         setDocs(formatted);
//         setLoading(false);
//       } catch (err) {
//         console.error('Error fetching documents:', err);
//         setLoading(false);
//       }
//     };

//     fetchDocs();
//   }, []);

//   const handleSelect = async (doc: Doc) => {
//     try {
//       const token = localStorage.getItem('jwtToken');
//       if (!token) return;

//       const res = await fetch(`http://10.12.26.134:3000/user/knowledge-base/${doc.docId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const data = await res.json();
//       setSelected({ ...doc, content: data.extracted_inner_html });
//     } catch (err) {
//       console.error('Error fetching document content:', err);
//     }
//   };

//   return (
//     <div className="flex h-screen font-sans text-white bg-black overflow-hidden">
//       {/* Sidebar */}
//       <aside className="w-64 bg-gray-900 border-r px-4 py-6 space-y-4 border-cyan-300">
//         <h1 className="text-xl font-bold text-white">🧠 Conversational AI</h1>
//         <nav className="space-y-2 text-white cursor-pointer">
//           <div className="hover:bg-gray-100">📊 Dashboard</div>
//           <div className="hover:bg-gray-100">👥 Agents</div>
//           <div className="hover:bg-gray-100">📞 Call History</div>
//           <div className="hover:bg-gray-100">📚 Knowledge Base</div>
//           <div className="hover:bg-gray-100">📱 Phone Numbers</div>
//           <div className="hover:bg-gray-100">📤 Outbound</div>
//           <div className="hover:bg-gray-100">⚙️ Settings</div>
//         </nav>
//       </aside>

//       {/* Main + Detail */}
//       <main className="flex-1 flex relative">
//         {/* Main Content */}
//         <div className="flex-1 p-8 overflow-y-auto">
//           <h2 className="text-2xl font-bold mb-6 text-white">Knowledge Base</h2>

//           {/* Buttons */}
//           <div className="flex gap-4 mb-6">
//             <button className="bg-black border px-4 py-2 rounded hover:bg-gray-100 text-white cursor-pointer">🌐 Add URL</button>
//             <button className="bg-black border px-4 py-2 rounded hover:bg-gray-100 text-white cursor-pointer">📄 Add Files</button>
//             <button className="bg-black border px-4 py-2 rounded hover:bg-gray-100 text-white cursor-pointer">✍️ Create Text</button>
//           </div>

//           {/* Search */}
//           <input
//             type="text"
//             placeholder="Search Knowledge Base..."
//             className="w-full p-2 mb-4 border rounded border-cyan-300 text-white bg-black"
//           />

//           {/* Loading */}
//           {loading && <div className="text-white mt-10 text-center">Loading files...</div>}

//           {/* File Table */}
//           {!loading && (
//             <table className="w-full bg-black border rounded shadow-sm border-cyan-300">
//               <thead className="text-left bg-gray-100 border-cyan-300">
//                 <tr>
//                   <th className="p-3 text-white bg-black">Name</th>
//                   <th className="p-3 text-white bg-black">Created by</th>
//                   <th className="p-3 text-white bg-black">Last updated</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {docs.map((file, idx) => (
//                   <tr
//                     key={idx}
//                     className="border-b hover:bg-gray-800 cursor-pointer border-cyan-300"
//                     onClick={() => handleSelect(file)}
//                   >
//                     <td className="p-3 flex items-center gap-2 text-white">
//                       📄 {file.name} <span className="text-sm text-gray-500">({file.size})</span>
//                     </td>
//                     <td className="p-3 text-white">{file.createdBy}</td>
//                     <td className="p-3 text-white">{file.updatedAt}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </div>

//         {/* Slide-in Detail View */}
//         <AnimatePresence>
//           {selected && (
//             <motion.div
//               key="detail"
//               initial={{ x: '100%', opacity: 0 }}
//               animate={{ x: 0, opacity: 1 }}
//               exit={{ x: '100%', opacity: 0 }}
//               transition={{ duration: 0.3 }}
//               className="absolute top-0 right-0 h-full w-1/2 bg-gray-900 text-black p-6 shadow-lg overflow-y-auto z-10"
//             >
//               <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-xl font-semibold text-white">{selected.name}</h2>
//                 <button
//                   onClick={() => setSelected(null)}
//                   className="border px-3 py-1 text-sm rounded-md hover:bg-gray-200 transition cursor-pointer"
//                 >
//                   Close
//                 </button>
//               </div>

//               <div className="space-y-2 text-sm text-white">
//                 <p><strong>Document ID:</strong> {selected.docId}</p>
//                 <p><strong>Last updated:</strong> {selected.updatedAt}</p>
//                 <p><strong>RAG indexes:</strong> No indexes</p>
//                 <p><strong>Dependent agents:</strong> No dependent agents</p>
//               </div>

//               <div className="mt-6">
//                 <h3 className="text-md font-medium mb-1 text-white">File Content</h3>
//                 <div
//                   className="p-4 rounded-md bg-gray-200 whitespace-pre-wrap text-sm"
//                   dangerouslySetInnerHTML={{ __html: selected.content }}
//                 />
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </main>
//     </div>
//   );
// }


'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { createApiUrl } from '@/lib/config';

type Doc = {
  name: string;
  size: string;
  createdBy: string;
  updatedAt: string;
  docId: string;
  content: string;
};

export default function KnowledgeBasePage() {
  const [docs, setDocs] = useState<Doc[]>([]);
  const [selected, setSelected] = useState<Doc | null>(null);
  const [loading, setLoading] = useState(true);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const detailRef = useRef<HTMLDivElement>(null);

  // Fetch docs function
  const fetchDocs = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('jwtToken');
      if (!token) return;

      const res = await fetch(createApiUrl('/user/knowledge-base'), {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      const formatted = data.documents.map((doc: any) => ({ // eslint-disable-line @typescript-eslint/no-explicit-any
        name: doc.name,
        size: `${(doc.metadata.size_bytes / 1024).toFixed(1)} kB`,
        createdBy: doc.access_info.creator_name,
        updatedAt: new Date(doc.metadata.last_updated_at_unix_secs * 1000).toLocaleString(),
        docId: doc.id,
        content: '',
      }));

      setDocs(formatted);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching documents:', err);
      setLoading(false);
    }
  };

  // Fetch docs on component mount
  useEffect(() => {
    fetchDocs();
  }, []);

  // Upload file to knowledge base
  const handleFileUpload = async () => {
    if (!uploadFile) return;

    try {
      setUploading(true);
      setUploadError(null);
      const token = localStorage.getItem('jwtToken');
      if (!token) {
        setUploadError('Authentication required');
        return;
      }

      const formData = new FormData();
      formData.append('file', uploadFile);

      const res = await fetch(createApiUrl('/user/knowledge-base/file'), {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (res.ok) {
        // Refresh the documents list
        await fetchDocs();
        setShowUploadModal(false);
        setUploadFile(null);
        setUploadError(null);
      } else {
        const errorText = await res.text();
        setUploadError(`Upload failed: ${errorText || res.statusText}`);
      }
    } catch (err) {
      console.error('Error uploading file:', err);
      setUploadError('Network error occurred while uploading');
    } finally {
      setUploading(false);
    }
  };

  // Fetch selected doc content
  const handleSelect = async (doc: Doc) => {
    try {
      const token = localStorage.getItem('jwtToken');
      if (!token) return;

      const res = await fetch(createApiUrl(`/user/knowledge-base/${doc.docId}`), {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      setSelected({ ...doc, content: data.extracted_inner_html });
    } catch (err) {
      console.error('Error fetching document content:', err);
    }
  };

  // Close panel on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (detailRef.current && !detailRef.current.contains(event.target as Node)) {
        setSelected(null);
      }
    };

    if (selected) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [selected]);

  return (
    <div className="flex h-screen font-sans text-white bg-black overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-[#181C29] border-r px-4 py-6 space-y-4 border-lime-300">
        <h1 className="text-2xl font-bold text-lime-400">🧠 Conversational AI</h1>
        <nav className="space-y-2 text-white">
          <Link href="/dashboard" className="block hover:text-lime-400 cursor-pointer">
            📊 Dashboard
          </Link>
          <Link href="/agents" className="block hover:text-lime-400 cursor-pointer">
            👥 Agents
          </Link>
          <Link href="/call-history" className="block hover:text-lime-400 cursor-pointer">
            📞 Call History
          </Link>
          <Link href="/knowledge-base" className="block hover:text-lime-400 cursor-pointer">
            📚 Knowledge Base
          </Link>
        </nav>
      </aside>

      {/* Main + Detail */}
      <main className="flex-1 flex relative">
        {/* Main Content */}
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-4xl font-bold text-lime-400">Knowledge Base</h2>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 mb-6">
            <button
              onClick={() => {
                setShowUploadModal(true);
                setUploadFile(null);
                setUploadError(null);
              }}
              className="bg-black border px-4 py-2 rounded hover:bg-gray-800 text-lime-400 cursor-pointer"
            >
              ➕ Add Knowledge Base File
            </button>
          </div>


          {/* Search */}
          <input
            type="text"
            placeholder="Search Knowledge Base..."
            className="w-full p-2 mb-4 border rounded border-lime-300 text-white bg-[#181C29]"
          />

          {/* Loading */}
          {loading && <div className="text-white mt-10 text-center">Loading files...</div>}

          {/* File Table */}
          {!loading && (
            <table className="w-full bg-black border rounded shadow-sm border-lime-300">
              <thead className="text-left bg-gray-100 border-cyan-300">
                <tr>
                  <th className="p-3 text-white bg-black">Name</th>
                  <th className="p-3 text-white bg-black">Created by</th>
                  <th className="p-3 text-white bg-black">Last updated</th>
                </tr>
              </thead>
              <tbody>
                {docs.map((file, idx) => (
                  <tr
                    key={idx}
                    className="border-b hover:bg-gray-800 cursor-pointer border-cyan-300"
                    onClick={() => handleSelect(file)}
                  >
                    <td className="p-3 flex items-center gap-2 text-white">
                      📄 {file.name} <span className="text-sm text-gray-500">({file.size})</span>
                    </td>
                    <td className="p-3 text-white">{file.createdBy}</td>
                    <td className="p-3 text-white">{file.updatedAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Slide-in Detail View */}
        <AnimatePresence>
          {selected && (
            <motion.div
              key="detail"
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute top-0 right-0 h-full w-1/2 bg-gray-900 text-black p-6 shadow-lg overflow-y-auto z-10"
              ref={detailRef}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-white">{selected.name}</h2>
                <button
                  onClick={() => setSelected(null)}
                  className="border px-3 py-1 text-sm rounded-md hover:bg-gray-200 transition cursor-pointer"
                >
                  Close
                </button>
              </div>

              <div className="space-y-2 text-sm text-white">
                <p><strong>Document ID:</strong> {selected.docId}</p>
                <p><strong>Last updated:</strong> {selected.updatedAt}</p>
                <p><strong>RAG indexes:</strong> No indexes</p>
                <p><strong>Dependent agents:</strong> No dependent agents</p>
              </div>

              <div className="mt-6">
                <h3 className="text-md font-medium mb-1 text-white">File Content</h3>
                <div
                  className="p-4 rounded-md bg-gray-200 whitespace-pre-wrap text-sm"
                  dangerouslySetInnerHTML={{ __html: selected.content }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Upload Modal */}
        <AnimatePresence>
          {showUploadModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50"
              onClick={() => setShowUploadModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-[#181C29] rounded-lg p-6 max-w-md w-full mx-4 border border-lime-300"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-lime-400">Upload Knowledge Base File</h3>
                  <button
                    onClick={() => setShowUploadModal(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Select a text file (.txt)
                    </label>
                    <input
                      type="file"
                      accept=".txt"
                      onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
                      className="w-full p-2 border border-lime-300 rounded bg-black text-white file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-lime-400 file:text-black file:cursor-pointer hover:file:bg-lime-300"
                    />
                  </div>

                  {uploadFile && (
                    <div className="p-3 bg-gray-800 rounded border border-lime-300">
                      <p className="text-sm text-white">
                        <strong>Selected:</strong> {uploadFile.name}
                      </p>
                      <p className="text-sm text-gray-400">
                        Size: {(uploadFile.size / 1024).toFixed(1)} KB
                      </p>
                    </div>
                  )}

                  {uploadError && (
                    <div className="p-3 bg-red-900 border border-red-500 rounded">
                      <p className="text-sm text-red-200">{uploadError}</p>
                    </div>
                  )}

                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={() => setShowUploadModal(false)}
                      className="flex-1 px-4 py-2 border border-gray-500 text-gray-300 rounded hover:bg-gray-800 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleFileUpload}
                      disabled={!uploadFile || uploading}
                      className="flex-1 px-4 py-2 bg-lime-400 text-black rounded hover:bg-lime-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      {uploading ? 'Uploading...' : 'Upload'}
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
