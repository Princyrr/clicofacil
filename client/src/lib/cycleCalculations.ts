export interface CycleInfo {
  cycleDuration: number;
  periodDuration: number;
  lastPeriodDate: Date;
}

export interface PredictedPeriod {
  startDate: Date;
  endDate: Date;
}

export interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  isPeriodDay: boolean;
  isOvulationDay: boolean;
  isToday: boolean;
  dayNumber: number;
}

export function calculateNextPeriods(cycleInfo: CycleInfo, monthsAhead: number = 12): PredictedPeriod[] {
  const periods: PredictedPeriod[] = [];
  const { cycleDuration, periodDuration, lastPeriodDate } = cycleInfo;
  
  for (let i = 1; i <= monthsAhead; i++) {
    const nextStartDate = new Date(lastPeriodDate);
    nextStartDate.setDate(nextStartDate.getDate() + (cycleDuration * i));
    
    const nextEndDate = new Date(nextStartDate);
    nextEndDate.setDate(nextEndDate.getDate() + (periodDuration - 1));
    
    periods.push({
      startDate: nextStartDate,
      endDate: nextEndDate
    });
  }
  
  return periods;
}

export function calculateOvulationDate(cycleInfo: CycleInfo): Date {
  const { cycleDuration, lastPeriodDate } = cycleInfo;
  const ovulationDate = new Date(lastPeriodDate);
  ovulationDate.setDate(ovulationDate.getDate() + cycleDuration - 14);
  return ovulationDate;
}

export function getDaysUntilNextPeriod(cycleInfo: CycleInfo): number {
  const today = new Date();
  const nextPeriods = calculateNextPeriods(cycleInfo, 1);
  
  if (nextPeriods.length > 0) {
    const timeDiff = nextPeriods[0].startDate.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return Math.max(0, daysDiff);
  }
  
  return 0;
}

export function getCurrentCycleDay(cycleInfo: CycleInfo): number {
  const today = new Date();
  const { lastPeriodDate, cycleDuration } = cycleInfo;
  
  const timeDiff = today.getTime() - lastPeriodDate.getTime();
  const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
  
  return (daysDiff % cycleDuration) + 1;
}

export function generateCalendarDays(year: number, month: number, cycleInfo?: CycleInfo): CalendarDay[] {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDate = new Date(firstDay);
  startDate.setDate(startDate.getDate() - firstDay.getDay());
  
  const days: CalendarDay[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  let predictedPeriods: PredictedPeriod[] = [];
  let ovulationDate: Date | null = null;
  
  if (cycleInfo) {
    predictedPeriods = calculateNextPeriods(cycleInfo, 6);
    ovulationDate = calculateOvulationDate(cycleInfo);
  }
  
  for (let i = 0; i < 42; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);
    
    const isCurrentMonth = currentDate.getMonth() === month;
    const isToday = currentDate.getTime() === today.getTime();
    
    let isPeriodDay = false;
    let isOvulationDay = false;
    
    if (cycleInfo) {
      // Check if this date is a period day
      isPeriodDay = predictedPeriods.some(period => {
        return currentDate >= period.startDate && currentDate <= period.endDate;
      });
      
      // Check if this date is ovulation day
      if (ovulationDate) {
        const ovulationDateOnly = new Date(ovulationDate);
        ovulationDateOnly.setHours(0, 0, 0, 0);
        isOvulationDay = currentDate.getTime() === ovulationDateOnly.getTime();
      }
    }
    
    days.push({
      date: currentDate,
      isCurrentMonth,
      isPeriodDay,
      isOvulationDay,
      isToday,
      dayNumber: currentDate.getDate()
    });
  }
  
  return days;
}

export function getCycleStatus(cycleInfo: CycleInfo): string {
  const daysUntil = getDaysUntilNextPeriod(cycleInfo);
  
  if (daysUntil === 0) {
    return "Menstruação hoje";
  } else if (daysUntil === 1) {
    return "Próxima menstruação";
  } else {
    return "Próxima menstruação";
  }
}
