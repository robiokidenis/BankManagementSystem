import { ButtonHTMLAttributes, InputHTMLAttributes } from 'react';
import DynamicHeroIcon from '../Icons';

type CommonProps = {
  id?: string;
  className?: string;
};

type ButtonProps = CommonProps & ButtonHTMLAttributes<HTMLButtonElement> & {
  type?: 'button' | 'submit' | 'reset';
  icon?: string;
  label: string;
};

type InputProps = CommonProps & InputHTMLAttributes<HTMLInputElement> & {
  type: 'text' | 'email' | 'password' | 'tel';
  label?: string;
};

type Props = ButtonProps | InputProps;

const FormElement = ({ type, label, icon, ...inputProps }: Props) => {
  if (type === 'button') {
    return (
      <button id="we" {...inputProps}>
        {icon && (
          <DynamicHeroIcon icon={icon} className="w-6 h-6 mr-2" />
        )}
        {label}
      </button>
    );
  }

  return (
    <div>
      {label && <label htmlFor={inputProps.id}>{label}</label>}
      <input {...inputProps} />
    </div>
  );
};

export default FormElement
