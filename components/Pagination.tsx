'use client';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function getPaginationRange(current: number, total: number): (number | '...')[] {
  const delta = 1;
  const range: (number | '...')[] = [];

  for (let i = 1; i <= total; i++) {
    if (
      i === 1 || 
      i === total || 
      (i >= current - delta && i <= current + delta)
    ) {
      range.push(i);
    } else if (
      range[range.length - 1] !== '...'
    ) {
      range.push('...');
    }
  }

  return range;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const range = getPaginationRange(currentPage, totalPages);

  return (
    <div className="flex justify-center mt-6 gap-1 select-none">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-2 py-1 rounded-md border disabled:opacity-50 hover:bg-gray-100 transition"
      >
        <ChevronLeft size={16} />
      </button>

      {range.map((item, idx) =>
        item === '...' ? (
          <span key={idx} className="px-2 py-1 text-gray-400 select-none">...</span>
        ) : (
          <button
            key={item}
            onClick={() => onPageChange(item)}
            className={`px-3 py-1 rounded-md border text-sm ${
              currentPage === item
                ? 'bg-amber-500 border-amber-500 text-white font-semibold'
                : 'hover:bg-gray-100'
            }`}
          >
            {item}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-2 py-1 rounded-md border disabled:opacity-50 hover:bg-gray-100 transition"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}
