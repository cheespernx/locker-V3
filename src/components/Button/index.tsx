import { ButtonHTMLAttributes } from 'react';


import './styles.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    isOutlined?: boolean;
    isDanger?: boolean;
    isPrimary?: boolean;
};

export function Button({ isOutlined = false, isDanger = false, isPrimary= false, ...props }: ButtonProps){
    return (
        <button 
          className={`button 
            ${isOutlined ? 'outlined' : ''} 
            ${isDanger ? 'danger' : ''} 
            ${isPrimary ? 'primary' : ''}
            ${props.className}
          `}
          {...props} 
        >
          {props.children}
        </button> 
    )
}