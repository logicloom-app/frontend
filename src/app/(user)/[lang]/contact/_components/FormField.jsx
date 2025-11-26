import { getInputClasses } from "./contactConstants";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

/**
 * Reusable Form Field Component
 * @param {Object} props
 * @param {string} props.label - Field label
 * @param {React.ReactNode} props.icon - Icon component
 * @param {string} props.iconColor - Icon color class
 * @param {string} props.name - Field name
 * @param {string} props.type - Input type (text, email, textarea)
 * @param {string} props.placeholder - Placeholder text
 * @param {string} props.value - Field value
 * @param {Function} props.onChange - Change handler
 * @param {Function} props.onBlur - Blur handler
 * @param {boolean} props.touched - Touched state
 * @param {string} props.error - Error message
 * @param {boolean} props.optional - Is field optional
 * @param {number} props.rows - Textarea rows
 * @param {number} props.maxLength - Max length
 */
export default function FormField({
  label,
  icon: Icon,
  iconColor,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  onBlur,
  touched,
  error,
  optional = false,
  rows,
  maxLength,
}) {
  const hasError = touched && error;
  const isTextarea = type === "textarea";

  const commonProps = {
    id: name,
    name,
    placeholder,
    value,
    onChange,
    onBlur,
    className: getInputClasses(hasError),
  };

  return (
    <div className="space-y-2">
      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
        {Icon && <Icon className={`w-5 h-5 ${iconColor || ""}`} />}
        {label}
        {optional && <span className="text-gray-400">(Optional)</span>}
      </label>

      {isTextarea ? (
        <Textarea {...commonProps} rows={rows} />
      ) : (
        <Input {...commonProps} type={type} maxLength={maxLength} noBorder={true} />
      )}

      {hasError && (
        <div className="text-rose-500 text-sm flex items-center gap-1">{error}</div>
      )}
    </div>
  );
}
