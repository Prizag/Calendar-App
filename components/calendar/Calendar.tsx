'use client';

import { useState, useEffect } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth } from 'date-fns';
import CalendarGrid from './CalendarGrid';
import NotesSection from './NotesSection';
import HeroImage from './HeroImage';
import { ModalNotes } from './ModalNotes';
import { WallCalendarCard } from './WallCalendarCard';

interface DateRange {
  start: Date | null;
  end: Date | null;
}

interface Notes {
  [key: string]: string;
}

export default function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDates, setSelectedDates] = useState<DateRange>({ start: null, end: null });
  const [clickCount, setClickCount] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [showNoteModal, setShowNoteModal] = useState(false);

  // Load notes from localStorage on mount
  const [notes, setNotes] = useState<Notes>(() => {
   if (typeof window !== 'undefined') {
     const stored = localStorage.getItem('calendarNotes');
     return stored ? JSON.parse(stored) : {};
   }
   return {};
 });

  // Save notes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('calendarNotes', JSON.stringify(notes));
  }, [notes]);

  const handleDateClick = (date: Date) => {
    // Open modal for note editing
    setShowNoteModal(true);
    
    setClickCount(prev => {
      const newCount = (prev + 1) % 3;
      
      if (newCount === 1) {
        // First click: set start date
        setSelectedDates({ start: date, end: null });
      } else if (newCount === 2) {
        // Second click: set end date
        const startDate = selectedDates.start;
        if (startDate && date >= startDate) {
          setSelectedDates({ start: startDate, end: date });
        } else {
          // If end date is before start date, swap them
          setSelectedDates({ start: date, end: startDate });
        }
      } else {
        // Third click: reset
        setSelectedDates({ start: null, end: null });
      }
      
      return newCount;
    });
  };

  const getSelectedDateRange = (): string[] => {
    if (!selectedDates.start || !selectedDates.end) return [];
    
    const allDays = eachDayOfInterval({
      start: selectedDates.start,
      end: selectedDates.end
    });
    
    return allDays.map(day => format(day, 'yyyy-MM-dd'));
  };

  const selectedDateRange = getSelectedDateRange();

  const handleNoteChange = (dateKey: string, noteText: string) => {
    setNotes(prev => ({
      ...prev,
      [dateKey]: noteText
    }));
  };

  const getNotesForDateRange = (): string => {
    if (!selectedDates.start && !selectedDates.end) return '';
    
    if (selectedDates.start && !selectedDates.end) {
      const key = format(selectedDates.start, 'yyyy-MM-dd');
      return notes[key] || '';
    }
    
    if (selectedDates.start && selectedDates.end) {
      // Concatenate notes from all selected dates
      return selectedDateRange
        .map(dateKey => notes[dateKey] || '')
        .filter(note => note.length > 0)
        .join('\n');
    }
    
    return '';
  };

  const handleNotesSave = (noteText: string) => {
    if (!selectedDates.start && !selectedDates.end) return;
    
    if (selectedDates.start && !selectedDates.end) {
      const key = format(selectedDates.start, 'yyyy-MM-dd');
      handleNoteChange(key, noteText);
    } else if (selectedDates.start && selectedDates.end) {
      // For ranges, save to the first date
      const key = format(selectedDates.start, 'yyyy-MM-dd');
      handleNoteChange(key, noteText);
    }
  };

  const handlePrevMonth = () => {
    setIsFlipping(true);
    setTimeout(() => {
      setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
      setIsFlipping(false);
    }, 250);
  };

  const handleNextMonth = () => {
    setIsFlipping(true);
    setTimeout(() => {
      setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
      setIsFlipping(false);
    }, 250);
  };

  const handleReset = () => {
    setSelectedDates({ start: null, end: null });
    setClickCount(0);
  };

  const getSelectedDateKey = (): string => {
    if (!selectedDates.start && !selectedDates.end) return '';
    if (selectedDates.start && !selectedDates.end) {
      return format(selectedDates.start, 'yyyy-MM-dd');
    }
    return '';
  };

  const modalDateKey = getSelectedDateKey();

  return (
    <WallCalendarCard isFlipping={isFlipping}>
      {/* Hero Image */}
      <HeroImage month={currentMonth} />

      {/* Calendar Grid */}
      <CalendarGrid
        currentMonth={currentMonth}
        selectedDates={selectedDates}
        selectedDateRange={selectedDateRange}
        onDateClick={handleDateClick}
        onPrevMonth={handlePrevMonth}
        onNextMonth={handleNextMonth}
      />

      {/* Notes Section */}
      <NotesSection
        selectedDates={selectedDates}
        notesContent={getNotesForDateRange()}
        onNotesSave={handleNotesSave}
        onReset={handleReset}
      />

      {/* Modal Notes */}
      {showNoteModal && modalDateKey && (
        <ModalNotes
          selectedDate={modalDateKey}
          notes={notes[modalDateKey] || ''}
          onClose={() => setShowNoteModal(false)}
          onSave={(noteText) => handleNoteChange(modalDateKey, noteText)}
        />
      )}
    </WallCalendarCard>
  );
}
