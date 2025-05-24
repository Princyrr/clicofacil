import { Link } from "wouter";
import { Calendar, Settings, TrendingUp, Bell, Heart, LogIn, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { hasCycleData } from "@/lib/localStorage";
import { AnimatedCat } from "@/components/AnimatedCat";

export default function Welcome() {
  const hasData = hasCycleData();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      {/* Gatinha Animada */}
      <AnimatedCat />
      
      <Card className="w-full max-w-md mx-auto shadow-xl">
        <CardContent className="p-8 text-center">
          {/* Logo */}
          <div className="mb-8">
            <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Calendar className="text-white text-3xl w-8 h-8" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Bem-vinda ao CicloFácil
            </h1>
            <p className="text-muted-foreground text-lg">
              Acompanhe seu ciclo de forma simples
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <Link href="/login">
              <Button className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg">
                <LogIn className="mr-2 h-4 w-4" />
                Entrar
              </Button>
            </Link>
            
            <Link href="/register">
              <Button 
                variant="outline" 
                className="w-full border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300"
              >
                <UserPlus className="mr-2 h-4 w-4" />
                Criar Conta
              </Button>
            </Link>
            
            <div className="flex space-x-2">
              <Link href="/setup" className="flex-1">
                <Button 
                  variant="outline" 
                  className="w-full border-2 border-secondary text-secondary hover:bg-secondary hover:text-white font-medium py-3 px-4 rounded-xl transition-all duration-300"
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Setup
                </Button>
              </Link>
              
              {hasData && (
                <Link href="/calendar" className="flex-1">
                  <Button 
                    variant="outline" 
                    className="w-full border-2 border-secondary text-secondary hover:bg-secondary hover:text-white font-medium py-3 px-4 rounded-xl transition-all duration-300"
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    Calendário
                  </Button>
                </Link>
              )}
            </div>
          </div>

          {/* App Features */}
          <div className="mt-8 grid grid-cols-3 gap-4 text-center">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mb-2">
                <TrendingUp className="text-primary h-5 w-5" />
              </div>
              <span className="text-xs text-muted-foreground">Previsões</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mb-2">
                <Bell className="text-primary h-5 w-5" />
              </div>
              <span className="text-xs text-muted-foreground">Lembretes</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mb-2">
                <Heart className="text-primary h-5 w-5" />
              </div>
              <span className="text-xs text-muted-foreground">Saúde</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
