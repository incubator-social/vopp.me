export const RadioButton = ({ value, checked, onChange, disabled, name, label }: RadioButtonProps) => {
  const handleChange = () => {
    if (!disabled) {
      onChange(value);
    }
  };

  return (
    <label>
      <input
        type="radio"
        value={value}
        checked={checked}
        onChange={handleChange}
        disabled={disabled || false}
        name={name}
      />
      {label}
    </label>
  );
};

// types
type RadioButtonProps = {
  key: number;
  value: string;
  checked: boolean;
  onChange: (value: string) => void;
  disabled?: boolean;
  name: string;
  label: string;
};
