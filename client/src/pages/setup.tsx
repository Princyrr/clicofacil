import { useState } from "react";
import { useLocation } from "wouter";
import { ArrowLeft, Save, UserCog, Calendar as CalendarIcon, Droplet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { saveCycleData, loadCycleData } from "@/lib/localStorage";
import { useToast } from "@/hooks/use-toast";
import { AnimatedCat } from "@/components/AnimatedCat";

const setupSchema = z.object({
  cycleDuration: z.number().min(21, "Ciclo deve ter pelo menos 21 dias").max(35, "Ciclo deve ter no máximo 35 dias"),
  periodDuration: z.number().min(3, "Menstruação deve durar pelo menos 3 dias").max(7, "Menstruação deve durar no máximo 7 dias"),
  lastPeriodDate: z.string().min(1, "Data é obrigatória"),
});

type SetupFormData = z.infer<typeof setupSchema>;

export default function Setup() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  // Load existing data if available
  const existingData = loadCycleData();
  
  const form = useForm<SetupFormData>({
    resolver: zodResolver(setupSchema),
    defaultValues: {
      cycleDuration: existingData?.cycleDuration || 28,
      periodDuration: existingData?.periodDuration || 5,
      lastPeriodDate: existingData?.lastPeriodDate || "",
    },
  });

  const onSubmit = (data: SetupFormData) => {
    try {
      saveCycleData({
        cycleDuration: data.cycleDuration,
        periodDuration: data.periodDuration,
        lastPeriodDate: data.lastPeriodDate,
      });
      
      toast({
        title: "Configuração salva!",
        description: "Seus dados foram salvos com sucesso.",
      });
      
      setLocation("/calendar");
    } catch (error) {
      toast({
        title: "Erro ao salvar",
        description: "Ocorreu um erro ao salvar suas configurações.",
        variant: "destructive",
      });
    }
  };

  const handleSkip = () => {
    // Use default values
    const today = new Date();
    const lastWeek = new Date(today);
    lastWeek.setDate(today.getDate() - 7);
    
    saveCycleData({
      cycleDuration: 28,
      periodDuration: 5,
      lastPeriodDate: lastWeek.toISOString().split('T')[0],
    });
    
    setLocation("/calendar");
  };

  return (
    <div className="min-h-screen flex flex-col p-6">
      {/* Gatinha Animada */}
      <div className="flex justify-center pt-4">
        <AnimatedCat />
      </div>
      
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setLocation("/")}
          className="w-10 h-10 bg-white rounded-full shadow-md hover:shadow-lg"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-xl font-semibold text-foreground">Configuração do Ciclo</h2>
        <div className="w-10"></div>
      </div>

      {/* Setup Form */}
      <Card className="flex-1 max-w-md mx-auto w-full shadow-xl">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
              <UserCog className="text-white h-8 w-8" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-2">
              Vamos configurar seu ciclo
            </h3>
            <p className="text-muted-foreground">
              Essas informações nos ajudam a fazer previsões mais precisas
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Cycle Duration */}
              <FormField
                control={form.control}
                name="cycleDuration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center text-sm font-medium text-foreground">
                      <CalendarIcon className="text-primary mr-2 h-4 w-4" />
                      Quantos dias dura seu ciclo?
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type="number"
                          placeholder="28"
                          className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-primary text-lg text-center font-semibold"
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                        />
                        <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">
                          dias
                        </span>
                      </div>
                    </FormControl>
                    <p className="text-xs text-muted-foreground text-center">
                      Geralmente entre 21 e 35 dias
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Period Duration */}
              <FormField
                control={form.control}
                name="periodDuration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center text-sm font-medium text-foreground">
                      <Droplet className="text-secondary mr-2 h-4 w-4" />
                      Quantos dias dura sua menstruação?
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type="number"
                          placeholder="5"
                          className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-primary text-lg text-center font-semibold"
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                        />
                        <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">
                          dias
                        </span>
                      </div>
                    </FormControl>
                    <p className="text-xs text-muted-foreground text-center">
                      Geralmente entre 3 e 7 dias
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Last Period Date */}
              <FormField
                control={form.control}
                name="lastPeriodDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center text-sm font-medium text-foreground">
                      <CalendarIcon className="text-primary mr-2 h-4 w-4" />
                      Quando foi o primeiro dia da sua última menstruação?
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-primary text-lg"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg mt-8"
              >
                <Save className="mr-2 h-4 w-4" />
                Salvar e Continuar
              </Button>
            </form>
          </Form>

          {/* Skip Option */}
          <div className="text-center mt-6">
            <Button
              variant="ghost"
              onClick={handleSkip}
              className="text-primary hover:text-primary/80 text-sm font-medium"
            >
              Pular por agora
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
