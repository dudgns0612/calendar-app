import styles from './TimeSelectBox.module.css';

interface TimeSelectBoxProps {
  title: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

// 캘린더 시간 SelectBox 컴포넌트
const TimeSelectBox = ({ title, value, onChange }: TimeSelectBoxProps) => (
  <div className={styles.time_wrap}>
    <span>{title}</span>
    <select onChange={onChange} value={value}>
      {[...Array(24).keys()].map((hour, hourIndex) =>
        ['00', '30'].map((min, minIndex) => (
          <option key={minIndex} value={`${hourIndex < 10 ? '0' : ''}${hourIndex}:${min}`}>
            {hour >= 12 ? 'PM' : 'AM'}{' '}
            {hour % 12 ? (hour % 12 > 9 ? hour % 12 : `0${hour % 12}`) : 12}:{min}
          </option>
        ))
      )}
    </select>
  </div>
);

export default TimeSelectBox;
