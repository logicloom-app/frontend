import { emailRegex, phoneRegex, otpRegex } from "./contactConstants";
import { yupTextQualityTest } from "@/lib/utils/textValidation";
import * as Yup from "yup";

/**
 * Create Contact Form Validation Schema
 * @param {Object} dict - Translation dictionary
 * @returns {Yup.ObjectSchema} Validation schema
 */
export const createContactSchema = (dict) => {
  const validationMessages = {
    singleCharacters: dict?.validation?.singleCharacters,
    meaningfulContent: dict?.validation?.meaningfulContent,
    randomKeyboard: dict?.validation?.randomKeyboard,
    tooMuchRepetition: dict?.validation?.tooMuchRepetition,
    randomCharacters: dict?.validation?.randomCharacters,
    notNaturalLanguage: dict?.validation?.notNaturalLanguage,
    recognizableWords: dict?.validation?.recognizableWords,
  };

  return Yup.object().shape({
    name: Yup.string()
      .min(
        2,
        dict?.validation?.nameMinLength || "Name must be at least 2 characters"
      )
      .max(
        100,
        dict?.validation?.nameMaxLength || "Name must be less than 100 characters"
      )
      .required(dict?.validation?.nameRequired || "Name is required")
      .test(
        "quality",
        yupTextQualityTest(
          dict?.validation?.nameSpam || "Name appears to be spam or invalid",
          validationMessages
        )
      ),
    company: Yup.string().max(
      100,
      dict?.validation?.companyMaxLength ||
        "Company name must be less than 100 characters"
    ),
    email: Yup.string()
      .matches(
        emailRegex,
        dict?.validation?.emailInvalid || "Please enter a valid email address"
      )
      .required(dict?.validation?.emailRequired || "Email is required"),
    phone: Yup.string()
      .matches(
        phoneRegex,
        dict?.validation?.phoneInvalid ||
          "Please enter a valid phone number with country code"
      )
      .required(dict?.validation?.phoneRequired || "Phone number is required"),
    description: Yup.string()
      .min(
        10,
        dict?.validation?.descriptionMinLength ||
          "Description must be at least 10 characters"
      )
      .max(
        1000,
        dict?.validation?.descriptionMaxLength ||
          "Description must be less than 1000 characters"
      )
      .required(dict?.validation?.descriptionRequired || "Description is required")
      .test(
        "quality",
        yupTextQualityTest(
          dict?.validation?.descriptionSpam ||
            "Description appears to be spam or meaningless text",
          validationMessages
        )
      ),
    otp: Yup.string()
      .matches(otpRegex, dict?.otp?.otpMustBe6Digits || "OTP must be 6 digits")
      .required(dict?.otp?.otpRequired || "OTP is required"),
  });
};
