// Contact Form Constants

// Regular expressions for validation
export const emailRegex =
  /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

export const phoneRegex = /^\+[1-9]\d{9,14}$/;

export const otpRegex = /^\d{6}$/;

// OTP Configuration
export const OTP_COUNTDOWN_SECONDS = 300; // 5 minutes

// Reusable CSS classes
export const INPUT_BASE_CLASSES =
  "h-12 rounded-xl px-4 border-2 transition-all duration-300";

export const INPUT_NORMAL_CLASSES =
  "border-gray-200 dark:border-gray-700 hover:border-emerald-300 dark:hover:border-emerald-700 focus:border-emerald-500 dark:focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/10 dark:focus:ring-emerald-400/20";

export const INPUT_ERROR_CLASSES =
  "border-rose-500 dark:border-rose-500 focus:border-rose-500 dark:focus:border-rose-500 focus:ring-rose-500/10";

export const getInputClasses = (hasError) => {
  return `${INPUT_BASE_CLASSES} ${
    hasError ? INPUT_ERROR_CLASSES : INPUT_NORMAL_CLASSES
  }`;
};

// Button Classes
export const PRIMARY_BUTTON_CLASSES =
  "w-full bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-700 hover:via-teal-700 hover:to-cyan-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold px-8 py-4 rounded-full transition-all duration-300 hover:shadow-xl shadow-emerald-500/30 hover:shadow-emerald-500/40 disabled:hover:shadow-none disabled:cursor-not-allowed relative overflow-hidden group";

export const SECONDARY_BUTTON_CLASSES =
  "w-full h-12 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg disabled:hover:shadow-none disabled:cursor-not-allowed flex items-center justify-center gap-2";

// Icon color classes
export const ICON_COLORS = {
  emerald: "text-emerald-600 dark:text-emerald-400",
  teal: "text-teal-600 dark:text-teal-400",
  cyan: "text-cyan-600 dark:text-cyan-400",
};
