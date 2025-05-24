import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { ArrowLeft, ChevronLeft, ChevronRight, Settings, Droplet, PieChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarDay } from "@/components/CalendarDay";
import { loadCycleData, saveCycleData } from "@/lib/localStorage";
import { 
  generateCalendarDays, 
  getCycleStatus, 
  getDaysUntilNextPeriod, 
  getCurrentCycleDay,
  type CycleInfo 
} from "@/lib/cycleCalculations";
import { useToast } from "@/hooks/use-toast";

const MONTHS = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

const WEEKDAYS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

export default function Calendar() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [cycleInfo, setCycleInfo] = useState<CycleInfo | null>(null);

  useEffect(() => {
    const data = loadCycleData();
    if (data) {
      setCycleInfo({
        cycleDuration: data.cycleDuration,
        periodDuration: data.periodDuration,
        lastPeriodDate: new Date(data.lastPeriodDate),
      });
    } else {
      // Redirect to setup if no data
      setLocation("/setup");
    }
  }, [setLocation]);

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  
  const calendarDays = generateCalendarDays(currentYear, currentMonth, cycleInfo || undefined);

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };

  const markPeriodStart = () => {
    if (!cycleInfo) return;
    
    const today = new Date();
    const updatedCycleInfo = {
      ...cycleInfo,
      lastPeriodDate: today,
    };
    
    const dataToSave = {
      cycleDuration: updatedCycleInfo.cycleDuration,
      periodDuration: updatedCycleInfo.periodDuration,
      lastPeriodDate: today.toISOString().split('T')[0],
    };
    
    saveCycleData(dataToSave);
    setCycleInfo(updatedCycleInfo);
    
    toast({
      title: "Período marcado!",
      description: "Início do período marcado para hoje.",
    });
  };

  if (!cycleInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }

  const cycleStatus = getCycleStatus(cycleInfo);
  const daysUntilNext = getDaysUntilNextPeriod(cycleInfo);
  const currentCycleDay = getCurrentCycleDay(cycleInfo);

  return (
    <div className="min-h-screen flex flex-col p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pt-8">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setLocation("/")}
          className="w-10 h-10 bg-white rounded-full shadow-md hover:shadow-lg"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={goToPreviousMonth}
            className="w-10 h-10 bg-white rounded-full shadow-md hover:shadow-lg"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <h2 className="text-xl font-semibold text-foreground min-w-[140px] text-center">
            {MONTHS[currentMonth]} {currentYear}
          </h2>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={goToNextMonth}
            className="w-10 h-10 bg-white rounded-full shadow-md hover:shadow-lg"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setLocation("/setup")}
          className="w-10 h-10 bg-white rounded-full shadow-md hover:shadow-lg"
        >
          <Settings className="h-4 w-4" />
        </Button>
      </div>

      {/* Cycle Info */}
      <Card className="mb-6 shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                <Droplet className="text-white h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{cycleStatus}</h3>
                <p className="text-muted-foreground">
                  {daysUntilNext === 0 ? "Hoje" : `Em ${daysUntilNext} dias`}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-primary">{currentCycleDay}</div>
              <div className="text-xs text-muted-foreground">Dia do ciclo</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Calendar */}
      <Card className="flex-1 shadow-lg">
        <CardContent className="p-6">
          {/* Weekday Headers */}
          <div className="grid grid-cols-7 gap-1 mb-4">
            {WEEKDAYS.map((day) => (
              <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1 mb-6">
            {calendarDays.map((day, index) => (
              <CalendarDay
                key={index}
                day={day}
                onDayClick={(date) => {
                  // Could implement day selection functionality here
                  console.log("Day clicked:", date);
                }}
              />
            ))}
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-secondary rounded-full"></div>
              <span className="text-muted-foreground">Menstruação</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-accent rounded-full border-2 border-primary"></div>
              <span className="text-muted-foreground">Ovulação</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-primary rounded-full"></div>
              <span className="text-muted-foreground">Hoje</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        <Button
          onClick={markPeriodStart}
          className="bg-secondary hover:bg-secondary/90 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2"
        >
          <Droplet className="h-4 w-4" />
          <span>Marcar Início</span>
        </Button>
        
        <Button
          variant="outline"
          className="border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2"
          onClick={() => {
            toast({
              title: "Em breve",
              description: "Estatísticas em desenvolvimento.",
            });
          }}
        >
          <PieChart className="h-4 w-4" />
          <span>Estatísticas</span>
        </Button>
      </div>
    </div>
  );
}
