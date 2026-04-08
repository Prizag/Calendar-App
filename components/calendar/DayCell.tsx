'use client';

import { format } from 'date-fns';
import { getHolidayForDate } from '@/lib/holidays';
import { HolidayMarker } from './HolidayMarker';

interface DayCellProps {
  date: Date;
  isCurrentMonth: boolean;
  isTodayDate: boolean;
  isStartDate: boolean;
  isEndDate: boolean;
  isInRange: boolean;
  onClick: () => void;
}

export default function DayCell({
  date,
  isCurrentMonth,
  isTodayDate,
  isStartDate,
  isEndDate,
  isInRange,
  onClick,
}: DayCellProps) {
  const dayNumber = format(date, 'd');
  const dateString = format(date, 'yyyy-MM-dd');
  const holiday = getHolidayForDate(dateString);

  return (
    <button
      onClick={onClick}
      disabled={!isCurrentMonth}
      className={`
        aspect-square flex items-center justify-center font-bold text-sm
        transition-all duration-150 relative overflow-visible
        ${
          !isCurrentMonth
            ? 'text-gray-300 bg-white/30 cursor-default'
            : 'cursor-pointer'
        }
        ${
          isTodayDate && !isStartDate && !isEndDate && !isInRange
            ? 'ring-2 ring-red-500 bg-red-50 text-gray-900'
            : ''
        }
        ${
          isStartDate || isEndDate
            ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-md'
            : ''
        }
        ${
          isInRange && !isStartDate && !isEndDate
            ? 'bg-blue-100 text-gray-900'
            : ''
        }
        ${
          !isStartDate && !isEndDate && !isInRange && !isTodayDate && isCurrentMonth
            ? 'text-gray-700 hover:bg-gray-100 active:bg-gray-200'
            : ''
        }
      `}
      aria-label={format(date, 'MMMM d, yyyy')}
      aria-pressed={isStartDate || isEndDate || isInRange}
    >
      {holiday && <HolidayMarker name={holiday.name} color={holiday.color} />}
      <span className="relative z-10">{dayNumber}</span>
    </button>
  );
}
