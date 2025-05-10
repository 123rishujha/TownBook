import React from "react";
import Hero from "./components/Hero";
import Features from "./components/Features";
import HowItWorks from "./components/HowItWorks";
import Community from "./components/Community";
import CallToAction from "./components/CallToAction";
import Footer from "./components/Footer";
import PublicNavbar from "../Navbar/PublicNavbar";

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background font-sans">
      <PublicNavbar />
      <main className="flex-1">
        <Hero />
        <Features />
        <HowItWorks />
        <Community />
        <CallToAction />
      </main>

      <Footer />
    </div>
  );
};

export default LandingPage;
