export interface Holiday {
  date: string; // 'YYYY-MM-DD'
  name: string;
  color: 'red' | 'blue' | 'green' | 'orange' | 'purple';
}

// 2026 holidays and observances
export const holidays2026: Holiday[] = [
  // January
  { date: '2026-01-01', name: "New Year's Day", color: 'red' },
  { date: '2026-01-19', name: 'MLK Jr. Birthday', color: 'blue' },

  // February
  { date: '2026-02-14', name: "Valentine's Day", color: 'red' },
  { date: '2026-02-16', name: 'Presidents Day', color: 'blue' },

  // March
  { date: '2026-03-17', name: 'St. Patrick\'s Day', color: 'green' },

  // April
  { date: '2026-04-05', name: 'Easter', color: 'purple' },
  { date: '2026-04-22', name: 'Earth Day', color: 'green' },

  // May
  { date: '2026-05-25', name: 'Memorial Day', color: 'blue' },

  // June
  { date: '2026-06-19', name: 'Juneteenth', color: 'blue' },
  { date: '2026-06-21', name: 'Summer Solstice', color: 'orange' },

  // July
  { date: '2026-07-04', name: 'Independence Day', color: 'red' },

  // September
  { date: '2026-09-07', name: 'Labor Day', color: 'blue' },
  { date: '2026-09-23', name: 'Fall Equinox', color: 'orange' },

  // October
  { date: '2026-10-12', name: 'Columbus Day', color: 'blue' },
  { date: '2026-10-31', name: 'Halloween', color: 'orange' },

  // November
  { date: '2026-11-11', name: 'Veterans Day', color: 'blue' },
  { date: '2026-11-26', name: 'Thanksgiving', color: 'orange' },

  // December
  { date: '2026-12-25', name: 'Christmas', color: 'red' },
];

export function getHolidayForDate(dateString: string): Holiday | undefined {
  return holidays2026.find(h => h.date === dateString);
}

export function getColorForHoliday(color: string): string {
  const colorMap: Record<string, string> = {
    red: '#ef4444',
    blue: '#3b82f6',
    green: '#10b981',
    orange: '#f97316',
    purple: '#a855f7',
  };
  return colorMap[color] || '#6b7280';
}
