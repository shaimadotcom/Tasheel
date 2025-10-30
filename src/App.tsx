import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Onboarding } from "./pages/Onboarding";
import { DataInput } from "./pages/DataInput";
import { DocumentUpload } from "./pages/DocumentUpload";
import { Processing } from "./pages/Processing";
import { Results } from "./pages/Results";
import { FasahSubmission } from "./pages/FasahSubmission";
import { Verification } from "./pages/Verification";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Onboarding />} />
          <Route path="/journey" element={<DataInput />} />
          <Route path="/upload" element={<DocumentUpload />} />
          <Route path="/processing" element={<Processing />} />
          <Route path="/results" element={<Results />} />
          <Route path="/fasah-submission" element={<FasahSubmission />} />
          <Route path="/verify/:qrId" element={<Verification />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
