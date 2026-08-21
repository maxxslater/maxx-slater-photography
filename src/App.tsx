import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Layout from "./components/Layout";
import ScrollToTop from "./components/ScrollToTop";
import Cursor from "./components/Cursor";
import BootSequence from "./components/BootSequence";
import ProgressRail from "./components/ProgressRail";
import PageTransition from "./components/PageTransition";
import Home from "./pages/Home";
import About from "./pages/About";
import Portfolio from "./pages/Portfolio";
import Contact from "./pages/Contact";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";

export default function App() {
  const location = useLocation();

  return (
    <>
      <ScrollToTop />

      {/* Global chrome — lives outside AnimatePresence so it survives routing */}
      <BootSequence />
      <Cursor />
      <ProgressRail />
      <div
        className="grain pointer-events-none fixed inset-[-10%] z-[130] opacity-[0.06] mix-blend-screen"
        aria-hidden="true"
      />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route element={<Layout />}>
            <Route
              path="/"
              element={
                <PageTransition>
                  <Home />
                </PageTransition>
              }
            />
            <Route
              path="/about"
              element={
                <PageTransition>
                  <About />
                </PageTransition>
              }
            />
            <Route
              path="/portfolio"
              element={
                <PageTransition>
                  <Portfolio />
                </PageTransition>
              }
            />
            <Route
              path="/contact"
              element={
                <PageTransition>
                  <Contact />
                </PageTransition>
              }
            />
            <Route
              path="/terms"
              element={
                <PageTransition>
                  <Terms />
                </PageTransition>
              }
            />
            <Route
              path="/privacy"
              element={
                <PageTransition>
                  <Privacy />
                </PageTransition>
              }
            />
          </Route>
        </Routes>
      </AnimatePresence>
    </>
  );
}
