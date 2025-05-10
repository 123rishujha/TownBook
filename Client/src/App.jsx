import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider";
// import { ThemeToggle } from "./components/theme-toggle";
// import { Toaster } from "sonner";
import "./styles/globals.css";
import "./styles/modern-components.css";
import { lazy } from "react";
import LandingPage from "./components/homePage/LandingPage";
import NotFound from "./components/layouts/NotFound";
import { ToastContainer } from "react-toastify";
import { PublicOnlyRoute } from "./utils/RouteValidation";
import MemberRoutes from "./routes/MemberRoutes";

const AuthRoutes = lazy(() => import("./routes/AuthRoutes"));
const LibrarianRoutes = lazy(() => import("./routes/LibrarianRoutes"));

function App() {

  return (
    <ThemeProvider defaultTheme="light" storageKey="masai-theme">
      {/* <Toaster position="top-right" expand={true} richColors /> */}
      <div className="min-h-screen bg-background text-foreground">
        {/* <div className="fixed top-3.5 right-4 z-50">
          <ThemeToggle />
        </div> */}
        <BrowserRouter>
          <Routes>
            <Route path="" element={<LandingPage />} />
            <Route
              path="auth/*"
              element={
                <PublicOnlyRoute>
                  <AuthRoutes />
                </PublicOnlyRoute>
              }
            />
            <Route path="librarian/*" element={<LibrarianRoutes />} />
            <Route path="member/*" element={<MemberRoutes />} />
            <Route path="404" element={<NotFound />} />
            <Route path="*" element={<Navigate replace to="/404" />} />
          </Routes>
        </BrowserRouter>
      </div>
      <ToastContainer />
    </ThemeProvider>
  );
}

export default App;
