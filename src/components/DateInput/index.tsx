import styles from './DateInput.module.css';

interface DateInputProps {
  title: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

// 캘린더 Input Date 컴포넌트
const DateInput = ({ title, value, onChange }: DateInputProps) => (
  <div className={styles.date_wrap}>
    <span>{title}</span>
    <input type="date" value={value} onChange={onChange} />
  </div>
);

export default DateInput;
