import styles from './AlarmModal.module.css';
import closeIcon from '../../resources/images/modal_close.png';

interface AlarmModalProps {
  title: string;
  description: string;
  onClickCancle: () => void;
  onClickConfirm: () => void;
}

// 알림 모달 컴포넌트
const AlarmModal = ({ title, description, onClickCancle, onClickConfirm }: AlarmModalProps) => (
  <div className={styles.backgound_wrap}>
    <div className={styles.modal_wrap}>
      <h2>{title}</h2>
      <button type="button" className={styles.modal_close_btn} onClick={onClickCancle}>
        <img src={closeIcon} alt="팝업 닫기" />
      </button>
      <span>{description}</span>
      <div className={styles.modal_footer}>
        <button type="button" onClick={onClickCancle}>
          취소
        </button>
        <button type="button" onClick={onClickConfirm}>
          삭제
        </button>
      </div>
    </div>
  </div>
);

export default AlarmModal;
