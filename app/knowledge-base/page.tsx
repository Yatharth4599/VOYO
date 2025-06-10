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

//         const formatted = data.documents.map((doc: any) => ({
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
//         <h1 className="text-xl font-bold text-orange-500">🧠 Conversational AI</h1>
//         <nav className="space-y-2 text-purple-500 cursor-pointer">
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
//           <h2 className="text-2xl font-bold mb-6 text-orange-500">Knowledge Base</h2>

//           {/* Buttons */}
//           <div className="flex gap-4 mb-6">
//             <button className="bg-black border px-4 py-2 rounded hover:bg-gray-100 text-purple-500 cursor-pointer">🌐 Add URL</button>
//             <button className="bg-black border px-4 py-2 rounded hover:bg-gray-100 text-purple-500 cursor-pointer">📄 Add Files</button>
//             <button className="bg-black border px-4 py-2 rounded hover:bg-gray-100 text-purple-500 cursor-pointer">✍️ Create Text</button>
//           </div>

//           {/* Search */}
//           <input
//             type="text"
//             placeholder="Search Knowledge Base..."
//             className="w-full p-2 mb-4 border rounded border-cyan-300 text-orange-500 bg-black"
//           />

//           {/* Loading */}
//           {loading && <div className="text-white mt-10 text-center">Loading files...</div>}

//           {/* File Table */}
//           {!loading && (
//             <table className="w-full bg-black border rounded shadow-sm border-cyan-300">
//               <thead className="text-left bg-gray-100 border-cyan-300">
//                 <tr>
//                   <th className="p-3 text-orange-500 bg-black">Name</th>
//                   <th className="p-3 text-orange-500 bg-black">Created by</th>
//                   <th className="p-3 text-orange-500 bg-black">Last updated</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {docs.map((file, idx) => (
//                   <tr
//                     key={idx}
//                     className="border-b hover:bg-gray-800 cursor-pointer border-cyan-300"
//                     onClick={() => handleSelect(file)}
//                   >
//                     <td className="p-3 flex items-center gap-2 text-purple-500">
//                       📄 {file.name} <span className="text-sm text-gray-500">({file.size})</span>
//                     </td>
//                     <td className="p-3 text-purple-500">{file.createdBy}</td>
//                     <td className="p-3 text-purple-500">{file.updatedAt}</td>
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
//                 <h2 className="text-xl font-semibold text-orange-500">{selected.name}</h2>
//                 <button
//                   onClick={() => setSelected(null)}
//                   className="border px-3 py-1 text-sm rounded-md hover:bg-gray-200 transition cursor-pointer"
//                 >
//                   Close
//                 </button>
//               </div>

//               <div className="space-y-2 text-sm text-purple-500">
//                 <p><strong>Document ID:</strong> {selected.docId}</p>
//                 <p><strong>Last updated:</strong> {selected.updatedAt}</p>
//                 <p><strong>RAG indexes:</strong> No indexes</p>
//                 <p><strong>Dependent agents:</strong> No dependent agents</p>
//               </div>

//               <div className="mt-6">
//                 <h3 className="text-md font-medium mb-1 text-orange-500">File Content</h3>
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
import { useRouter } from 'next/navigation';

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
  const detailRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Fetch docs
  useEffect(() => {
    const fetchDocs = async () => {
      try {
        const token = localStorage.getItem('jwtToken');
        if (!token) return;

        const res = await fetch('http://10.12.26.134:3000/user/knowledge-base', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        const formatted = data.documents.map((doc: any) => ({
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

    fetchDocs();
  }, []);

  // Fetch selected doc content
  const handleSelect = async (doc: Doc) => {
    try {
      const token = localStorage.getItem('jwtToken');
      if (!token) return;

      const res = await fetch(`http://10.12.26.134:3000/user/knowledge-base/${doc.docId}`, {
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
      <aside className="w-64 bg-gray-900 border-r px-4 py-6 space-y-4 border-cyan-300">
        <h1 className="text-xl font-bold text-orange-500">🧠 Conversational AI</h1>
        <nav className="space-y-2 text-purple-500 cursor-pointer">
          <div className="hover:bg-gray-100">📊 Dashboard</div>
          <div className="hover:bg-gray-100">👥 Agents</div>
          <div className="hover:bg-gray-100">📞 Call History</div>
          <div className="hover:bg-gray-100">📚 Knowledge Base</div>
          <div className="hover:bg-gray-100">📱 Phone Numbers</div>
          <div className="hover:bg-gray-100">📤 Outbound</div>
          <div className="hover:bg-gray-100">⚙️ Settings</div>
        </nav>
      </aside>

      {/* Main + Detail */}
      <main className="flex-1 flex relative">
        {/* Main Content */}
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-orange-500">Knowledge Base</h2>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 mb-6">
            <button
              onClick={() => router.push('/create-agent')}
              className="bg-black border px-4 py-2 rounded hover:bg-gray-100 text-purple-500 cursor-pointer"
            >
              ➕ Add Knowledge Base File
            </button>
          </div>


          {/* Search */}
          <input
            type="text"
            placeholder="Search Knowledge Base..."
            className="w-full p-2 mb-4 border rounded border-cyan-300 text-orange-500 bg-black"
          />

          {/* Loading */}
          {loading && <div className="text-white mt-10 text-center">Loading files...</div>}

          {/* File Table */}
          {!loading && (
            <table className="w-full bg-black border rounded shadow-sm border-cyan-300">
              <thead className="text-left bg-gray-100 border-cyan-300">
                <tr>
                  <th className="p-3 text-orange-500 bg-black">Name</th>
                  <th className="p-3 text-orange-500 bg-black">Created by</th>
                  <th className="p-3 text-orange-500 bg-black">Last updated</th>
                </tr>
              </thead>
              <tbody>
                {docs.map((file, idx) => (
                  <tr
                    key={idx}
                    className="border-b hover:bg-gray-800 cursor-pointer border-cyan-300"
                    onClick={() => handleSelect(file)}
                  >
                    <td className="p-3 flex items-center gap-2 text-purple-500">
                      📄 {file.name} <span className="text-sm text-gray-500">({file.size})</span>
                    </td>
                    <td className="p-3 text-purple-500">{file.createdBy}</td>
                    <td className="p-3 text-purple-500">{file.updatedAt}</td>
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
                <h2 className="text-xl font-semibold text-orange-500">{selected.name}</h2>
                <button
                  onClick={() => setSelected(null)}
                  className="border px-3 py-1 text-sm rounded-md hover:bg-gray-200 transition cursor-pointer"
                >
                  Close
                </button>
              </div>

              <div className="space-y-2 text-sm text-purple-500">
                <p><strong>Document ID:</strong> {selected.docId}</p>
                <p><strong>Last updated:</strong> {selected.updatedAt}</p>
                <p><strong>RAG indexes:</strong> No indexes</p>
                <p><strong>Dependent agents:</strong> No dependent agents</p>
              </div>

              <div className="mt-6">
                <h3 className="text-md font-medium mb-1 text-orange-500">File Content</h3>
                <div
                  className="p-4 rounded-md bg-gray-200 whitespace-pre-wrap text-sm"
                  dangerouslySetInnerHTML={{ __html: selected.content }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
