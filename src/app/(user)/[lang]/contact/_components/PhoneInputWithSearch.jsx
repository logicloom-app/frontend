"use client";

import "react-international-phone/style.css";
import "@/styles/phone-input.css";
import { useState } from "react";
import {
  defaultCountries,
  parseCountry,
  usePhoneInput,
  FlagImage,
} from "react-international-phone";

/**
 * Custom Phone Input Component with Country Search
 * @param {Object} props
 * @param {string} props.value - Phone number value
 * @param {Function} props.onChange - Change handler
 * @param {Function} props.onBlur - Blur handler
 * @param {boolean} props.hasError - Error state
 * @param {boolean} props.disabled - Disabled state
 * @param {Object} props.dict - Translation dictionary
 */
export default function PhoneInputWithSearch({
  value,
  onChange,
  onBlur,
  hasError,
  disabled,
  dict,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const phoneInput = usePhoneInput({
    defaultCountry: "de",
    value,
    countries: defaultCountries,
    onChange: (data) => {
      onChange(data.phone);
    },
  });

  const filteredCountries = defaultCountries.filter((country) => {
    const searchLower = searchTerm.toLowerCase();
    const countryData = parseCountry(country);
    return (
      countryData?.name?.toLowerCase().includes(searchLower) ||
      countryData?.iso2?.toLowerCase().includes(searchLower) ||
      countryData?.dialCode?.includes(searchTerm)
    );
  });

  const handleCountrySelect = (iso2) => {
    phoneInput.setCountry(iso2);
    setIsDropdownOpen(false);
    setSearchTerm("");
  };

  return (
    <div className="relative">
      <div
        className={`flex items-center h-12 rounded-xl border-2 transition-all duration-300 ${
          hasError
            ? "border-rose-500 dark:border-rose-500 focus-within:border-rose-500 dark:focus-within:border-rose-500 focus-within:ring-rose-500/10"
            : "border-gray-200 dark:border-gray-700 hover:border-emerald-300 dark:hover:border-emerald-700 focus-within:border-emerald-500 dark:focus-within:border-emerald-400 focus-within:ring-4 focus-within:ring-emerald-500/10 dark:focus-within:ring-emerald-400/20"
        } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        {/* Country Selector Button */}
        <button
          type="button"
          onClick={() => !disabled && setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center gap-2 px-3 h-full hover:bg-emerald-500/5 dark:hover:bg-emerald-500/10 transition-colors rounded-l-xl"
          disabled={disabled}
        >
          <FlagImage iso2={phoneInput.country.iso2} />
          <svg
            className={`w-4 h-4 text-gray-500 transition-transform ${
              isDropdownOpen ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {/* Phone Input */}
        <input
          ref={phoneInput.inputRef}
          type="tel"
          value={phoneInput.inputValue}
          onChange={phoneInput.handlePhoneValueChange}
          onBlur={onBlur}
          disabled={disabled}
          placeholder={dict?.phonePlaceholder || "Phone number"}
          className="flex-1 h-full px-3 bg-transparent border-none outline-none text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500"
        />
      </div>

      {/* Dropdown */}
      {isDropdownOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsDropdownOpen(false)}
          />

          {/* Dropdown Content */}
          <div className="absolute top-full left-0 right-0 mt-2 z-50 bg-white dark:bg-gray-800 backdrop-blur-xl rounded-2xl shadow-2xl border-2 border-gray-200 dark:border-gray-700 overflow-hidden max-h-80">
            {/* Search Input */}
            <div className="sticky top-0 z-10 p-3 bg-gray-50 dark:bg-gray-900/50 backdrop-blur-xl border-b-2 border-gray-200 dark:border-gray-700">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={dict?.searchCountry || "Search country..."}
                className="w-full px-3 py-2 text-sm bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-lg outline-none focus:border-emerald-500 dark:focus:border-emerald-400 transition-colors text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                autoFocus
              />
            </div>

            {/* Countries List */}
            <div className="overflow-y-auto max-h-64">
              {filteredCountries.length > 0 ? (
                filteredCountries.map((country) => {
                  const parsedCountry = parseCountry(country);
                  const isSelected = parsedCountry.iso2 === phoneInput.country.iso2;

                  return (
                    <button
                      key={parsedCountry.iso2}
                      type="button"
                      onClick={() => handleCountrySelect(parsedCountry.iso2)}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-emerald-500/10 dark:hover:bg-emerald-500/20 transition-colors ${
                        isSelected ? "bg-emerald-500/15 dark:bg-emerald-500/25" : ""
                      }`}
                    >
                      <FlagImage iso2={parsedCountry.iso2} />
                      <span className="flex-1 text-sm font-medium text-gray-900 dark:text-gray-100">
                        {parsedCountry.name}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        +{parsedCountry.dialCode}
                      </span>
                    </button>
                  );
                })
              ) : (
                <div className="px-4 py-8 text-center text-sm text-gray-500 dark:text-gray-400">
                  {dict?.noCountryFound || "No country found"}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
