export const RadioButton = ({
  value,
  checked,
  onChange,
  disabled,
  name,
  labelText,
}: RadioButtonProps) => {
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
      {labelText}
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
  labelText: string;
};
