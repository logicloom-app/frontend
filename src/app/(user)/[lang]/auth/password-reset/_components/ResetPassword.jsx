import { useState } from "react";
import ResetPasswordForm from "./ResetPasswordForm";
import ResetPasswordCheckOtp from "./ResetPasswordCheckOtp";

export default function ResetPassword({ dict, step, setStep }) {
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const renderSteps = () => {
    switch (step) {
      case 0:
        return (
          <ResetPasswordForm
            setStep={setStep}
            dict={dict}
            setEmail={setEmail}
            setPassword={setPassword}
          />
        );
      case 1:
        return (
          <ResetPasswordCheckOtp
            setStep={setStep}
            setOtp={setOtp}
            otp={otp}
            dict={dict}
            email={email}
            password={password}
          />
        );
    }
  };

  return <>{renderSteps()}</>;
}
