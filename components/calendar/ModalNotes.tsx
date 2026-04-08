'use client';

import { useState } from 'react';
import { format } from 'date-fns';

interface ModalNotesProps {
  selectedDate: string;
  notes: string;
  onClose: () => void;
  onSave: (notes: string) => void;
}

export function ModalNotes({ selectedDate, notes: initialNotes, onClose, onSave }: ModalNotesProps) {
  const [notes, setNotes] = useState(initialNotes);

  const handleSave = () => {
    onSave(notes);
    onClose();
  };

  const dateObj = new Date(selectedDate + 'T00:00:00');
  const displayDate = format(dateObj, 'EEEE, MMMM d, yyyy');

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center p-4 z-50 pointer-events-none">
        <div 
          className="bg-white rounded-lg shadow-2xl w-full max-w-md pointer-events-auto transform transition-all animate-in fade-in zoom-in-95"
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Notes for {displayDate}</h2>
            <p className="text-sm text-gray-600 mt-1">Add or edit your notes for this date</p>
          </div>

          {/* Content */}
          <div className="p-6">
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Write your notes here..."
              className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
            />
          </div>

          {/* Footer */}
          <div className="flex gap-3 px-6 py-4 bg-gray-50 border-t border-gray-200 rounded-b-lg">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 text-gray-700 font-medium hover:bg-gray-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex-1 px-4 py-2 bg-blue-600 text-white font-medium hover:bg-blue-700 rounded-lg transition-colors shadow-sm"
            >
              Save Notes
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
