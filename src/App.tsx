
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
<BrowserRouter basename="/mp-population-map">
  <Routes>
    <Route path="/" element={<Index />} />
    <Route path="/journey" element={<LifeJourney />} />
    <Route path="/mission-health" element={<MissionHealth />} />
    <Route path="/health-wordle" element={<HealthWordle />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
</BrowserRouter>

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/journey" element={<LifeJourney />} />
          <Route path="/mission-health" element={<MissionHealth />} />
          <Route path="/health-wordle" element={<HealthWordle />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
