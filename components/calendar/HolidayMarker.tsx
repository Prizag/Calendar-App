import { getColorForHoliday } from '@/lib/holidays';

interface HolidayMarkerProps {
  name: string;
  color: 'red' | 'blue' | 'green' | 'orange' | 'purple';
}

export function HolidayMarker({ name, color }: HolidayMarkerProps) {
  const bgColor = getColorForHoliday(color);

  return (
    <div 
      className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full text-white text-xs font-semibold shadow-md transform scale-90 origin-top-right"
      style={{
        backgroundColor: bgColor,
        boxShadow: `0 4px 12px ${bgColor}40`,
      }}
      title={name}
    >
      {name.split(' ')[0].substring(0, 3)}
    </div>
  );
}
