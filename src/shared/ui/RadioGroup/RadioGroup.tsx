import { RadioGroup } from '@radix-ui/react-radio-group';
import './RadioGroup.scss';
import { RadioButton } from '@/src/shared/ui/RadioGroup/RadioButton/RadioButton';

export const RadioGroup = ({
  name,
  options = [],
  selectedValue,
  defaultValue,
  required = false,
  onChange,
  className
}: RadioGroupProps) => {
  const value = selectedValue || defaultValue || (options.length > 0 ? options[0].option : null);
  return (
    <RadioGroup.Root className={className || ''} value={value} onValueChange={onChange} required={required}>
      {options.map(({ option, label }, index) => {
        const id = `${name}-${index}`;
        return (
          <RadioGroup.Item id={id} key={index} value={option} checked={defaultValue || selectedValue === option}>
            <RadioGroup.Indicator />
            <label htmlFor={id}>{label}</label>
          </RadioGroup.Item>
        );
      })}
    </RadioGroup.Root>
  );
};

//type
export type RadioGroupProps = {
  name: string;
  options: Option[];
  selectedValue?: string;
  defaultValue?: string;
  required: boolean;
  onChange: (value: string) => void;
  className?: string;
};

type Option = {
  option: string;
  label: string;
};
