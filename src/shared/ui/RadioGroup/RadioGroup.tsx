import './RadioGroup.scss';
import { RadioButton } from '@/src/shared/ui/RadioGroup/RadioButton/RadioButton';

export const RadioGroup = ({
  name,
  options = [],
  selectedValue,
  onChange,
  className,
}: RadioGroupProps) => {
  return (
    <div className={className || ''}>
      {options.map((option, index) => (
        <RadioButton
          key={index}
          value={option}
          checked={(!selectedValue && index === 0) || selectedValue === option}
          onChange={onChange}
          name={name}
          label={option.label}
        />
      ))}
    </div>
  );
};

//type
type RadioGroupProps = {
  name: string;
  options: string[];
  selectedValue: string;
  onChange: (value: string) => void;
  className?: string;
};
