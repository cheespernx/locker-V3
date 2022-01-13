import './styles.scss';

type InputProps = {
  isLabelled?: boolean;
  type?: string;
  label?: string;
  isRequired?: boolean;
  value?: string;
};

export default function Input({ isLabelled = false, type = 'text', label = '', isRequired = false, ...props }: InputProps & React.InputHTMLAttributes<HTMLInputElement>){
    return (
      <div className="input-group">
        { isLabelled ? <label>{label}</label> : '' }
        { isRequired ? <span className="required">*</span> : '' }
        <input type={type} className={props.className} placeholder={props.placeholder} value={props.value} {...props} />
      </div>
    )
}