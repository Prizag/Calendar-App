'use client';

import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { X } from 'lucide-react';

interface DateRange {
  start: Date | null;
  end: Date | null;
}

interface NotesSectionProps {
  selectedDates: DateRange;
  notesContent: string;
  onNotesSave: (noteText: string) => void;
  onReset: () => void;
}

export default function NotesSection({
  selectedDates,
  notesContent,
  onNotesSave,
  onReset,
}: NotesSectionProps) {
  const [noteText, setNoteText] = useState('');

  useEffect(() => {
    setNoteText(notesContent);
  }, [notesContent]);

  const handleSave = () => {
    onNotesSave(noteText);
  };

  const formatDateRange = (): string => {
    if (!selectedDates.start && !selectedDates.end) {
      return 'Select a date range to add notes';
    }

    if (selectedDates.start && !selectedDates.end) {
      return format(selectedDates.start, 'MMMM d, yyyy');
    }

    if (selectedDates.start && selectedDates.end) {
      return `${format(selectedDates.start, 'MMM d')} - ${format(selectedDates.end, 'MMM d, yyyy')}`;
    }

    return '';
  };

  const isDateSelected = selectedDates.start || selectedDates.end;

  return (
    <div className="w-full p-8 border-t-2 border-gray-100">
      {/* Header */}
      <div className="flex items-start justify-between mb-6 pb-4 border-b-2 border-gray-100">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">Quick Notes</h3>
          <p className="text-sm text-gray-600 mt-1">
            {formatDateRange()}
          </p>
        </div>
        {isDateSelected && (
          <button
            onClick={onReset}
            className="p-2 hover:bg-gray-100 rounded-lg transition-all duration-200"
            aria-label="Clear selection"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        )}
      </div>

      {/* Notes Textarea */}
      <div className="flex flex-col gap-4">
        {isDateSelected ? (
          <>
            <textarea
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="Add your notes here..."
              className="w-full p-4 rounded-lg border-2 border-gray-200 bg-white text-gray-900 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 min-h-32"
            />
            <button
              onClick={handleSave}
              className="w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 bg-blue-600 text-white hover:bg-blue-700 active:scale-95 shadow-sm"
            >
              Save Notes
            </button>
          </>
        ) : (
          <div className="flex items-center justify-center p-8 text-center bg-gray-50 rounded-lg">
            <p className="text-gray-500">
              Click on a date or date range to add notes
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
