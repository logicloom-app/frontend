import { SECONDARY_BUTTON_CLASSES, getInputClasses } from "./contactConstants";
import { TbLock, TbCheck, TbClock } from "react-icons/tb";
import { Input } from "@/components/ui/input";
import Spinner from "@/components/ui/Spinner";

/**
 * OTP Verification Section Component
 * @param {Object} props
 * @param {Object} props.dict - Translation dictionary
 * @param {boolean} props.otpSent - Is OTP sent
 * @param {boolean} props.otpVerified - Is OTP verified
 * @param {number} props.countdown - Countdown timer
 * @param {boolean} props.isGeneratingOTP - Is generating OTP
 * @param {boolean} props.isVerifyingOTP - Is verifying OTP
 * @param {Function} props.onGenerateOTP - Generate OTP handler
 * @param {Function} props.onVerifyOTP - Verify OTP handler
 * @param {Object} props.formik - Formik instance
 */
export default function OTPSection({
  dict,
  otpSent,
  otpVerified,
  countdown,
  isGeneratingOTP,
  isVerifyingOTP,
  onGenerateOTP,
  onVerifyOTP,
  formik,
}) {
  const hasError = formik?.touched?.otp && formik?.errors?.otp;

  return (
    <div className="space-y-4 p-6 bg-gradient-to-br from-emerald-50/50 to-teal-50/50 dark:from-emerald-950/20 dark:to-teal-950/20 rounded-2xl border-2 border-emerald-200/50 dark:border-emerald-900/50 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex items-center gap-2 mb-2">
        <TbLock className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          {dict?.otp?.emailVerification || "Email Verification"}{" "}
          {otpVerified && <TbCheck className="inline w-5 h-5 text-green-500 ml-2" />}
        </h3>
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        {dict?.otp?.verificationDescription ||
          "We'll send a verification code to your email address to ensure its validity."}
      </p>

      {/* Generate OTP & OTP Input */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Generate OTP Button */}
        <div>
          <button
            type="button"
            onClick={onGenerateOTP}
            disabled={isGeneratingOTP || countdown > 0}
            className={SECONDARY_BUTTON_CLASSES}
          >
            {isGeneratingOTP ? (
              <>
                <Spinner className="w-4 h-4" />
                <span>{dict?.otp?.sending || "Sending..."}</span>
              </>
            ) : countdown > 0 ? (
              <>
                <TbClock className="w-5 h-5" />
                <span>
                  {dict?.otp?.resendIn || "Resend in"} {Math.floor(countdown / 60)}:
                  {String(countdown % 60).padStart(2, "0")}
                </span>
              </>
            ) : (
              <span>
                {otpSent
                  ? dict?.otp?.resendOTP || "Resend OTP"
                  : dict?.otp?.sendOTP || "Send OTP"}
              </span>
            )}
          </button>
        </div>

        {/* OTP Input */}
        <div className="space-y-2">
          <Input
            type="text"
            id="otp"
            name="otp"
            placeholder={dict?.otp?.enterOTP || "Enter 6-digit OTP"}
            maxLength={6}
            disabled={!otpSent}
            noBorder={true}
            className={`h-12 rounded-xl px-4 border-2 transition-all duration-300 text-center text-lg font-mono tracking-wider ${
              hasError
                ? "border-rose-500 dark:border-rose-500 focus:border-rose-500 dark:focus:border-rose-500 focus:ring-rose-500/10"
                : !otpSent
                ? "border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 cursor-not-allowed"
                : otpVerified
                ? "border-green-500 dark:border-green-500 bg-green-50 dark:bg-green-950/20"
                : "border-gray-200 dark:border-gray-700 hover:border-emerald-300 dark:hover:border-emerald-700 focus:border-emerald-500 dark:focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/10 dark:focus:ring-emerald-400/20"
            }`}
            onBlur={formik.handleBlur}
            value={formik.values.otp}
            onChange={formik.handleChange}
          />
          {hasError && (
            <div className="text-rose-500 text-sm text-center">
              {formik.errors?.otp}
            </div>
          )}
        </div>
      </div>

      {/* Optional Verify Button */}
      {otpSent && formik.values.otp && !otpVerified && (
        <button
          type="button"
          onClick={onVerifyOTP}
          disabled={isVerifyingOTP || formik.errors.otp}
          className="w-full h-10 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-medium rounded-xl transition-all duration-300 flex items-center justify-center gap-2 text-sm"
        >
          {isVerifyingOTP ? (
            <>
              <Spinner className="w-4 h-4" />
              <span>{dict?.otp?.verifying || "Verifying..."}</span>
            </>
          ) : (
            <>
              <TbCheck className="w-4 h-4" />
              <span>{dict?.otp?.verifyOTP || "Verify OTP (Optional)"}</span>
            </>
          )}
        </button>
      )}

      {/* Success Message */}
      {otpVerified && (
        <div className="flex items-center gap-2 text-green-600 dark:text-green-400 text-sm font-medium bg-green-50 dark:bg-green-950/20 px-4 py-2 rounded-lg">
          <TbCheck className="w-5 h-5" />
          <span>{dict?.otp?.verified || "Email verified successfully!"}</span>
        </div>
      )}
    </div>
  );
}
