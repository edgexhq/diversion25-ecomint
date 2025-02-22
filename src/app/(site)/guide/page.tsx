"use client";

import Cards from "@/components/guide/cards";
import EducationPage from "@/components/guide/education-page";
import Faq from "@/components/guide/faq";
import { LanguageSelector } from "@/components/guide/language-selector";
import Tab from "@/components/guide/tab";
import Logo from "@/components/logo";
import { useEffect } from "react";

const languages = [
  { code: "en", name: "English" },
  { code: "hi", name: "हिन्दी" },
  { code: "bn", name: "বাংলা" },
  { code: "ar", name: "العربية" },
  { code: "ru", name: "Русский" },
  { code: "pt", name: "Português" },
  { code: "es", name: "Español" },
  { code: "fr", name: "Français" },
  { code: "de", name: "Deutsch" },
  { code: "zh", name: "Chinese" },
  { code: "ja", name: "Japanese" },
  { code: "ko", name: "Korean" },
];

export default function GuidePage() {
  useEffect(() => {
    // Load Google Translate script
    const addGoogleTranslateScript = () => {
      if (!document.getElementById("google-translate-script")) {
        const script = document.createElement("script");
        script.id = "google-translate-script";
        script.src =
          "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        script.async = true;
        document.body.appendChild(script);
      }

      // Initialize the Google Translate widget
      window.googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: languages.map((lang) => lang.code).join(","),
          },
          "google_translate_element"
        );
      };
    };

    addGoogleTranslateScript();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 font-inter">
      {/* Hero Section */}
      <section className="mb-12 text-center">
        <Logo className="h-8" />
        <h1 className="mt-6 mb-4 text-4xl font-bold">
          Welcome to <span className="text-emerald-500">EcoMint</span>
        </h1>
        <p className="mx-auto mb-14 max-w-2xl text-lg text-muted-foreground">
          Create, trade, and make an impact. Every NFT you own plants a tree and
          helps protect wildlife.
        </p>
        <EducationPage />
        {/* Flowchart Section */}
        <div className="flex items-center justify-center">
          <img
            src="/flowchart.svg"
            alt="Flowchart"
            className="mb-5 w-[950px] h-[400px] rounded-lg"
          />
        </div>
        <div className="text-center text-base mb-14 text-muted-foreground">
          User Navigation Flow
        </div>
        <Cards />
      </section>

      {/* Main Guide Tabs */}
      <Tab />
      {/* FAQ Section */}
      <Faq />
      <LanguageSelector />
    </div>
  );
}
