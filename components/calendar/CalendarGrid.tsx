'use client';

import { format, startOfMonth, endOfMonth, eachDayOfInterval, eachWeekOfInterval, startOfWeek, endOfWeek, isSameDay, isToday, isSameMonth } from 'date-fns';
import DayCell from './DayCell';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface DateRange {
  start: Date | null;
  end: Date | null;
}

interface CalendarGridProps {
  currentMonth: Date;
  selectedDates: DateRange;
  selectedDateRange: string[];
  onDateClick: (date: Date) => void;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}

export default function CalendarGrid({
  currentMonth,
  selectedDates,
  selectedDateRange,
  onDateClick,
  onPrevMonth,
  onNextMonth,
}: CalendarGridProps) {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);

  const weeks = eachWeekOfInterval({
    start: calendarStart,
    end: calendarEnd,
  });

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="w-full">
      {/* Weekday Headers */}
      <div className="grid grid-cols-7 gap-2 mb-4">
        {weekDays.map(day => (
          <div
            key={day}
            className="text-center text-xs font-bold text-gray-700 py-2 uppercase tracking-wider"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Days */}
      <div className="space-y-2">
        {weeks.map((weekStart, weekIndex) => (
          <div key={weekIndex} className="grid grid-cols-7 gap-2">
            {Array.from({ length: 7 }).map((_, dayIndex) => {
              const date = new Date(weekStart);
              date.setDate(date.getDate() + dayIndex);
              const dateKey = format(date, 'yyyy-MM-dd');
              const isCurrentMonth = isSameMonth(date, currentMonth);
              const isTodayDate = isToday(date);
              const isStartDate = selectedDates.start ? isSameDay(date, selectedDates.start) : false;
              const isEndDate = selectedDates.end ? isSameDay(date, selectedDates.end) : false;
              const isInRange = selectedDateRange.includes(dateKey);

              return (
                <DayCell
                  key={dateKey}
                  date={date}
                  isCurrentMonth={isCurrentMonth}
                  isTodayDate={isTodayDate}
                  isStartDate={isStartDate}
                  isEndDate={isEndDate}
                  isInRange={isInRange}
                  onClick={() => isCurrentMonth && onDateClick(date)}
                />
              );
            })}
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
        <button
          onClick={onPrevMonth}
          className="px-6 py-2 text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
          aria-label="Previous month"
        >
          ← Previous
        </button>
        <button
          onClick={onNextMonth}
          className="px-6 py-2 text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
          aria-label="Next month"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
