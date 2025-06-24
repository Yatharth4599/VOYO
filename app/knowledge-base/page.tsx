'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createApiUrl } from '@/lib/config';
import NavigationLayout from '@/components/NavigationLayout';
import Pagination from '@/components/Pagination';

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
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;


  // Fetch docs function
  const fetchDocs = async () => {
    try {
      if (typeof window === 'undefined') return;
      
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
    if (typeof window === 'undefined') return;

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
      if (typeof window === 'undefined') return;
      
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



  const handleDelete = async (docId: string) => {
  if (!confirm('Are you sure you want to remove this file?')) return;

  try {
    const token = localStorage.getItem('jwtToken');
    if (!token) throw new Error('No auth token found');

    const res = await fetch(createApiUrl(`/user/knowledge-base/${docId}`), {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      // Remove the doc from local state
      setDocs((prev) => prev.filter((doc) => doc.docId !== docId));
      // Close detail view if it was open
      if (selected?.docId === docId) setSelected(null);
    } else {
      const errorText = await res.text();
      alert(`Delete failed: ${errorText}`);
    }
  } catch (err) {
    console.error('Delete error:', err);
    alert('Something went wrong trying to delete the document');
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
  

  const totalPages = Math.ceil(docs.length / rowsPerPage);
  const paginatedDocs = docs.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  useEffect(() => {
  setCurrentPage(1);}, 
  [docs]);


  return (
    <NavigationLayout 
      title="Knowledge Base" 
      currentPage="/knowledge-base"
      showCreateButton={true}
      onCreateClick={() => {
        setShowUploadModal(true);
        setUploadFile(null);
        setUploadError(null);
      }}
      createButtonText="➕ Add Knowledge Base File"
    >
      <div className="flex-1 flex relative h-screen overflow-hidden">
        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Search */}
          <input
            type="text"
            placeholder="Search Knowledge Base..."
            className="w-full p-3 mb-4 border rounded-lg border-gray-200 text-gray-900 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
          />

          {/* Loading */}
          {loading && <div className="text-gray-600 mt-10 text-center">Loading files...</div>}

          {/* File Table */}
          {!loading && (
            <div className="modern-card overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="p-4 text-left text-sm font-semibold text-gray-900">Name</th>
                    <th className="p-4 text-left text-sm font-semibold text-gray-900">Created by</th>
                    <th className="p-4 text-left text-sm font-semibold text-gray-900">Last updated</th>
                    <th className="p-4 text-left text-sm font-semibold text-gray-900"></th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedDocs.map((file, idx) => (
                    <tr
                      key={idx}
                      className="border-t border-gray-100 hover:bg-gray-50 transition-colors duration-200"
                    >
                      <td
                        onClick={() => handleSelect(file)}
                        className="p-4 flex items-center gap-2 text-gray-900 cursor-pointer"
                      >
                        📄 {file.name} <span className="text-sm text-gray-500">({file.size})</span>
                      </td>
                      <td className="p-4 text-gray-700">{file.createdBy}</td>
                      <td className="p-4 text-gray-700">{file.updatedAt}</td>
                      <td className="p-4">
                        <button
                          onClick={() => handleDelete(file.docId)}
                          className="text-red-600 hover:text-red-800 font-medium text-sm px-3 py-1 rounded border border-red-200 hover:bg-red-50 transition-colors cursor-pointer"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
          )}
          {!loading && docs.length > rowsPerPage && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}

        </div>

        {/* Slide-in Detail View */}

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
                className="bg-white rounded-lg p-6 max-w-md w-full mx-4 border border-gray-200 shadow-xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-gray-900">Upload Knowledge Base File</h3>
                  <button
                    onClick={() => setShowUploadModal(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select a text file (.txt)
                    </label>
                    <input
                      type="file"
                      accept=".txt"
                      onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
                      className="w-full p-2 border border-gray-200 rounded-lg bg-white text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-orange-500 file:text-white file:cursor-pointer hover:file:bg-orange-600 transition-colors"
                    />
                  </div>

                  {uploadFile && (
                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <p className="text-sm text-gray-900">
                        <strong>Selected:</strong> {uploadFile.name}
                      </p>
                      <p className="text-sm text-gray-600">
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
                      className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleFileUpload}
                      disabled={!uploadFile || uploading}
                      className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      {uploading ? 'Uploading...' : 'Upload'}
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

        <AnimatePresence>
          {selected && (
            <motion.div
              key="detail"
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed top-0 right-0 h-screen w-1/2 bg-white text-gray-900 p-6 shadow-2xl overflow-y-auto z-[999] border-l border-gray-200"
              ref={detailRef}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900">{selected.name}</h2>
                <button
                  onClick={() => setSelected(null)}
                  className="border border-gray-200 px-3 py-1 text-sm rounded-md hover:bg-gray-50 transition-colors cursor-pointer text-gray-700"
                >
                  Close
                </button>
              </div>

              <div className="space-y-2 text-sm text-gray-700">
                <p><strong className="text-gray-900">Document ID:</strong> {selected.docId}</p>
                <p><strong className="text-gray-900">Last updated:</strong> {selected.updatedAt}</p>
                <p><strong className="text-gray-900">RAG indexes:</strong> No indexes</p>
                <p><strong className="text-gray-900">Dependent agents:</strong> No dependent agents</p>
              </div>

              <div className="mt-6">
                <h3 className="text-md font-medium mb-1 text-gray-900">File Content</h3>
                <div
                  className="p-4 rounded-lg bg-gray-50 whitespace-pre-wrap text-sm border border-gray-200 text-gray-800"
                  dangerouslySetInnerHTML={{ __html: selected.content }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
    </NavigationLayout>
  );
}
