import { BrowserRouter, Routes, Route } from "react-router-dom";

import Features from "./pages/Features";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Landing from "./pages/Landing";
import { Toaster } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { ClerkProvider } from "@clerk/clerk-react";
import { useTheme } from "./components/theme-provider";
import { dark } from "@clerk/themes";
import DashboardLayout from "./layouts/DashboardLayout";
import { useAuth } from "@clerk/clerk-react";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import Dashboard from "./pages/Dashboard";
import Favorite from "./pages/Favorite";
import ResumeBuilder from "./components/dashboard/ResumeBuilder";
import ResumePage from "./pages/ResumePage";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
if (!PUBLISHABLE_KEY) {
  throw new Error("Add your Clerk Publishable Key to the .env file");
}

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL);

const App = () => {
  const { theme } = useTheme();

  return (
    <ClerkProvider
      appearance={{ theme: theme == "dark" ? dark : null }}
      publishableKey={PUBLISHABLE_KEY}
    >
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        <TooltipProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/features" element={<Features />} />
              <Route path="/contact" element={<Contact />} />

              {/* Layout for dashboard + fav */}
              <Route element={<DashboardLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/fav" element={<Favorite />} />
              </Route>

              <Route path="/builder" element={<ResumeBuilder />} />
              <Route path="/resume/:id" element={<ResumePage />} />

              {/* Catch-all */}
              < Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
};

export default App;
