'use client';

import { useState, useEffect } from 'react';
import { format, startOfMonth, eachWeekOfInterval, startOfWeek, endOfWeek, isSameMonth, isToday, isSameDay } from 'date-fns';
import Image from 'next/image';
import HeroImage from './HeroImage';
import CalendarGrid from './CalendarGrid';

interface DateRange {
  start: Date | null;
  end: Date | null;
}

interface Notes {
  [key: string]: string;
}

export default function PhysicalCalendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDates, setSelectedDates] = useState<DateRange>({ start: null, end: null });
  const [clickCount, setClickCount] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState<'forward' | 'backward'>('forward');
  const [isMounted, setIsMounted] = useState(false);

  // Load notes from localStorage after component mounts
  // Load notes
const [notes, setNotes] = useState<Notes>(() => {
  try {
    const stored = localStorage.getItem('calendarNotes');
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
});

// Save notes
useEffect(() => {
  try {
    localStorage.setItem('calendarNotes', JSON.stringify(notes));
  } catch (error) {
    console.error('[v0] Error saving notes:', error);
  }
}, [notes]);

  const handleDateClick = (date: Date) => {
    setClickCount(prev => {
      const newCount = (prev + 1) % 3;
      if (newCount === 1) {
        setSelectedDates({ start: date, end: null });
      } else if (newCount === 2) {
        const startDate = selectedDates.start;
        if (startDate && date >= startDate) {
          setSelectedDates({ start: startDate, end: date });
        } else if (startDate) {
          setSelectedDates({ start: date, end: startDate });
        }
      } else {
        setSelectedDates({ start: null, end: null });
      }
      return newCount;
    });
  };

  const handlePrevMonth = () => {
    setFlipDirection('backward');
    setIsFlipping(true);
    setTimeout(() => {
      setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
      setIsFlipping(false);
    }, 600);
  };

  const handleNextMonth = () => {
    setFlipDirection('forward');
    setIsFlipping(true);
    setTimeout(() => {
      setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
      setIsFlipping(false);
    }, 600);
  };

  const handleNoteChange = (dateKey: string, noteText: string) => {
    setNotes(prev => ({
      ...prev,
      [dateKey]: noteText
    }));
  };

  const getSelectedDateRange = (): string[] => {
    if (!selectedDates.start || !selectedDates.end) return [];
    const range: string[] = [];
    const current = new Date(selectedDates.start);
    while (current <= selectedDates.end) {
      range.push(format(current, 'yyyy-MM-dd'));
      current.setDate(current.getDate() + 1);
    }
    return range;
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{
      background: 'linear-gradient(135deg, #8B8680 0%, #A39E98 50%, #8B8680 100%)',
    }}>
      {/* Ambient light effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
      </div>

      {/* Main Calendar Card - Physical Wall Calendar */}
      <div className="relative w-full max-w-2xl" style={{
        perspective: '1200px',
      }}>
        {/* Hanging Nails - Top Left */}
        <div className="absolute -top-8 left-12 w-6 h-6 bg-gradient-to-b from-gray-400 to-gray-600 rounded-full shadow-lg"
          style={{
            boxShadow: '0 4px 8px rgba(0,0,0,0.4), inset -2px -2px 4px rgba(0,0,0,0.3), inset 2px 2px 4px rgba(255,255,255,0.3)',
          }}
        />
        {/* Hanging Nail - Top Right */}
        <div className="absolute -top-8 right-12 w-6 h-6 bg-gradient-to-b from-gray-400 to-gray-600 rounded-full shadow-lg"
          style={{
            boxShadow: '0 4px 8px rgba(0,0,0,0.4), inset -2px -2px 4px rgba(0,0,0,0.3), inset 2px 2px 4px rgba(255,255,255,0.3)',
          }}
        />

        {/* Spiral Binding - Top */}
        <div className="absolute top-0 left-0 right-0 h-10 flex items-center justify-center z-50 overflow-hidden"
          style={{
            background: 'linear-gradient(180deg, #5a5a5a 0%, #4a4a4a 50%, #3a3a3a 100%)',
            boxShadow: 'inset 0 4px 8px rgba(0,0,0,0.6), inset 0 -2px 4px rgba(255,255,255,0.1), 0 4px 12px rgba(0,0,0,0.5)',
          }}
        >
          {/* Spiral ring coils */}
          {Array.from({ length: 50 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center justify-center"
              style={{
  width: '18px',
  height: '100%',
  marginLeft: '-2px',
  marginRight: '-2px',
}}
            >
              {/* Top of coil */}
              <div style={{
                width: '14px',
                height: '5px',
                background: 'linear-gradient(90deg, #666 0%, #888 50%, #555 100%)',
                borderRadius: '2px 2px 0 0',
                boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.3), 0 2px 3px rgba(0,0,0,0.4)',
              }} />
              {/* Middle of coil */}
              <div style={{
                width: '12px',
                height: '5px',
                background: 'linear-gradient(90deg, #555 0%, #777 50%, #444 100%)',
                boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.2), 0 1px 2px rgba(0,0,0,0.5)',
              }} />
              {/* Bottom of coil */}
              <div style={{
                width: '14px',
                height: '5px',
                background: 'linear-gradient(90deg, #444 0%, #666 50%, #333 100%)',
                borderRadius: '0 0 2px 2px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.6)',
              }} />
            </div>
          ))}
        </div>

        {/* Main Card */}
              <div className="relative mt-6 bg-white rounded-none shadow-2xl overflow-hidden"
          style={{
  boxShadow: '0 20px 60px rgba(0,0,0,0.4), 0 0 40px rgba(0,0,0,0.2), inset -1px -1px 2px rgba(0,0,0,0.1)',

  transform: isFlipping ? 'rotateX(180deg)' : 'rotateX(0deg)',

  transformOrigin: flipDirection === 'forward'
    ? 'top center'
    : 'bottom center',

  transition: 'transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)',

  transformStyle: 'preserve-3d',
  perspective: '1200px',
}}
        >
          {/* Top edge highlight */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

          {/* Left edge shadow for depth */}
          <div className="absolute top-0 left-0 bottom-0 w-2 bg-gradient-to-r from-black/20 to-transparent" />

          {/* Content wrapper */}
          <div className="flex flex-col">
            {/* Hero Image Section */}
            <div className="relative h-64 md:h-72 overflow-hidden">
              <HeroImage month={currentMonth} />
              {/* Subtle texture overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/10 pointer-events-none" />
            </div>

            {/* Calendar Grid Section */}
            <div className="p-6 md:p-8 bg-white">
              {/* Month Navigation */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-gray-200">
                <h2 className="text-4xl font-bold text-gray-900">
                  {format(currentMonth, 'MMMM')}
                </h2>
                <p className="text-lg text-gray-500 font-light">
                  {format(currentMonth, 'yyyy')}
                </p>
              </div>

              {/* Calendar Grid */}
              <CalendarGrid
                currentMonth={currentMonth}
                selectedDates={selectedDates}
                selectedDateRange={getSelectedDateRange()}
                onDateClick={handleDateClick}
                onPrevMonth={handlePrevMonth}
                onNextMonth={handleNextMonth}
              />

              {/* Bottom decorative line and Notes Section */}
              {(selectedDates.start || selectedDates.end) && (
                <div className="mt-6 pt-6 border-t-2 border-gray-100">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Notes</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {selectedDates.start && selectedDates.end
                      ? `${format(selectedDates.start, 'MMM d')} - ${format(selectedDates.end, 'MMM d, yyyy')}`
                      : selectedDates.start
                      ? `${format(selectedDates.start, 'MMMM d, yyyy')}`
                      : 'Select dates to add notes'}
                  </p>
                  <textarea
                    value={selectedDates.start ? (notes[format(selectedDates.start, 'yyyy-MM-dd')] || '') : ''}
                    onChange={(e) => {
                      if (selectedDates.start) {
                        handleNoteChange(format(selectedDates.start, 'yyyy-MM-dd'), e.target.value);
                      }
                    }}
                    placeholder="Add notes for the selected date(s)..."
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 resize-none min-h-24 text-gray-900 text-sm"
                  />
                  <button
                    onClick={() => setSelectedDates({ start: null, end: null })}
                    className="mt-3 px-4 py-1 bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold rounded text-sm transition-colors duration-200"
                  >
                    Clear Selection
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right edge shadow */}
          <div className="absolute top-0 right-0 bottom-0 w-4 bg-gradient-to-l from-black/10 to-transparent pointer-events-none" />
        </div>

        {/* Bottom shadow projection */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5/6 h-8 bg-black/20 blur-2xl rounded-full translate-y-full" />
      </div>
    </div>
  );
}
