"use client";

import { useState, useEffect } from "react";
import { Globe } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const languages = [
  { code: "en", name: "English" },
  { code: "hi", name: "हिन्दी" },
  { code: "bn", name: "বাংলা" },
  { code: "es", name: "Español" },
  { code: "fr", name: "Français" },
  { code: "de", name: "Deutsch" },
  { code: "zh", name: "Chinese" },
  { code: "ja", name: "Japanese" },
  { code: "ko", name: "Korean" },
];

declare global {
  interface Window {
    google: any;
    googleTranslateElementInit: () => void;
  }
}

export function LanguageSelector() {
  const [currentLang, setCurrentLang] = useState("en");

  useEffect(() => {
    // Check if script already exists
    if (!document.getElementById("google-translate-script")) {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    }

    // Initialize Google Translate
    window.googleTranslateElementInit = () => {
      if (!document.getElementById("google_translate_element")) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: languages.map((lang) => lang.code).join(","),
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          },
          "google_translate_element"
        );
      }
    };
  }, []);

  // Handle language change via Google Translate dropdown
  const handleChangeLanguage = (lang: string) => {
    setCurrentLang(lang);
    const translateDropdown = document.querySelector(".goog-te-combo") as HTMLSelectElement;
    if (translateDropdown) {
      translateDropdown.value = lang;
      translateDropdown.dispatchEvent(new Event("change"));
    }
  };

  return (
    <div className="fixed right-4 top-10 z-50 flex items-center gap-2">
      <Globe className="h-4 w-4" />
      <Select onValueChange={handleChangeLanguage} value={currentLang}>
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="Select Language" />
        </SelectTrigger>
        <SelectContent>
          {languages.map((lang) => (
            <SelectItem key={lang.code} value={lang.code}>
              {lang.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div id="google_translate_element" className="hidden" />
    </div>
  );
}
