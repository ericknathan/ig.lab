interface InputProps {
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function Input({ type = "text", placeholder, value, onChange }: InputProps) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className='bg-gray-900 rounded px-5 h-14 focus:outline-none focus:outline-green-700 outline-1'
      value={value}
      onChange={onChange}
    />
  );
}
