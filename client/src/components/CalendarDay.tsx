import { CalendarDay as CalendarDayType } from "@/lib/cycleCalculations";
import { cn } from "@/lib/utils";

interface CalendarDayProps {
  day: CalendarDayType;
  onDayClick?: (date: Date) => void;
}

export function CalendarDay({ day, onDayClick }: CalendarDayProps) {
  const handleClick = () => {
    if (onDayClick && day.isCurrentMonth) {
      onDayClick(day.date);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={cn(
        "calendar-day",
        {
          "opacity-30 text-gray-400": !day.isCurrentMonth,
          "text-gray-900 hover:bg-gray-100 cursor-pointer": day.isCurrentMonth && !day.isToday && !day.isPeriodDay && !day.isOvulationDay,
          "period-day": day.isPeriodDay,
          "ovulation-day relative": day.isOvulationDay && !day.isPeriodDay,
          "today-day": day.isToday && !day.isPeriodDay,
          "rounded-lg shadow-md": day.isPeriodDay || day.isOvulationDay || day.isToday,
        }
      )}
    >
      {day.dayNumber}
      {day.isOvulationDay && !day.isPeriodDay && (
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full"></div>
      )}
    </div>
  );
}
