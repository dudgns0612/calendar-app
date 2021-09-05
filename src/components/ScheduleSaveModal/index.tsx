import { useState } from 'react';
import moment from 'moment';
import randomColor from 'randomcolor';
import useInput from '../../hooks/useInput';
import useSelectBox from '../../hooks/useSelectBox';
import DateInput from '../DateInput';
import TimeSelectBox from '../TimeSelectBox';
import AlarmModal from '../AlarmModal';

import { DaySchedule } from '../../types/calendarTypes';
import styles from './ScheduleSaveModal.module.css';
import closeIcon from '../../resources/images/modal_close.png';

interface ScheduleSaveModalProps {
  daySchedules: DaySchedule[];
  daySchedule: DaySchedule;
  onClickSave: (daySchedule: DaySchedule) => void;
  onClickDelete: (daySchedule: DaySchedule) => void;
  onClickSaveCancle: () => void;
}

// 캘린더 일정 등록 모달 컴포넌트
const ScheduleSaveModal = ({
  daySchedules,
  daySchedule,
  onClickSave,
  onClickDelete,
  onClickSaveCancle,
}: ScheduleSaveModalProps) => {
  // 제목
  const [title, setTitle] = useInput(daySchedule.title);
  // 시작날짜
  const [startDate, setStartDate] = useInput(daySchedule.startDate.format('YYYY-MM-DD'));
  // 종료날짜
  const [endDate, setEndDate] = useInput(daySchedule.endDate.format('YYYY-MM-DD'));
  // 시작시간
  const [startTime, setStartTime] = useSelectBox(daySchedule.startTime);
  // 종료시간
  const [endTime, setEndTime] = useSelectBox(daySchedule.endTime);
  // 일정 삭제확인 모달 표출 여부
  const [isConfirmModal, setIsConfirmModal] = useState<boolean>(false);

  const handleScheduleSave = () => {
    // 제목 적합성 체크
    if (!title) {
      alert('일정 제목을 입력하여 주세요.');
      return;
    }

    // 시간 적합성 체크
    if (
      startDate === endDate &&
      Number(startTime.replace(':', '')) >= Number(endTime.replace(':', ''))
    ) {
      alert('시간 설정이 잘못되었습니다. 다시 설정 하여주세요.');
      return;
    }

    // 날짜 적합성 체크
    const startDateMoment = moment(`${startDate} ${startTime}`);
    const endDateMoment = moment(`${endDate} ${endTime}`);
    if (startDateMoment.diff(endDateMoment) > 0) {
      alert('날짜 설정이 잘못되었습니다. 다시 설정 하여 주세요.');
      return;
    }

    let validDaySchedules = daySchedules;
    let { color } = daySchedule;
    // 해당 일정 제외 및 컬러 설정
    if (daySchedule.scheduleNo !== 0) {
      validDaySchedules = daySchedules.filter(
        (schedule) => schedule.scheduleNo !== daySchedule.scheduleNo
      );
    } else {
      color = randomColor();
    }

    // 중복일정 체크
    for (let i = 0; i < validDaySchedules.length; i++) {
      // 기존에 있는 일정과 겹치는지 확인
      if (
        (startDateMoment > validDaySchedules[i].startDate &&
          startDateMoment < validDaySchedules[i].endDate) ||
        (endDateMoment > validDaySchedules[i].startDate &&
          endDateMoment < validDaySchedules[i].endDate) ||
        (startDateMoment < validDaySchedules[i].startDate &&
          endDateMoment > validDaySchedules[i].endDate)
      ) {
        alert('일정이 중복됩니다. 일정을 확인하여 주세요.');
        return;
      }
    }

    onClickSave({
      scheduleNo: daySchedule.scheduleNo,
      title,
      startDate: startDateMoment,
      endDate: endDateMoment,
      startTime,
      endTime,
      color,
    });
  };

  // 삭제 알림 모달 확인 이벤트
  const handleAlarmModalConfirm = () => {
    onClickDelete(daySchedule);
    setIsConfirmModal(false);
  };

  // 삭제 알림 모달 취소 이벤트
  const handleAlarmModalCancle = () => {
    setIsConfirmModal(false);
  };

  return (
    <>
      <div className={styles.backgound_wrap}>
        <div className={styles.modal_wrap}>
          <div className={styles.modal_header}>
            <h2>일정 {daySchedule.scheduleNo > 0 ? '수정하기' : '만들기'}</h2>
            <button type="button" onClick={onClickSaveCancle}>
              <img src={closeIcon} alt="팝업 닫기" />
            </button>
          </div>
          <div className={styles.modal_body}>
            <div className={styles.input_wrap}>
              <span>일정 제목을 입력하세요.</span>
              <input type="text" value={title} onChange={setTitle} />
            </div>
            <div className={styles.date_time_wrap}>
              <div className={styles.date_time}>
                <DateInput title="시작날짜" value={startDate} onChange={setStartDate} />
              </div>
              <div className={styles.date_time}>
                <TimeSelectBox title="시작시간" value={startTime} onChange={setStartTime} />
              </div>
            </div>
            <div className={styles.date_time_wrap}>
              <div className={styles.date_time}>
                <DateInput title="종료날짜" value={endDate} onChange={setEndDate} />
              </div>
              <div className={styles.date_time}>
                <TimeSelectBox title="종료시간" value={endTime} onChange={setEndTime} />
              </div>
            </div>
          </div>
          <div className={styles.modal_footer}>
            <button type="button" onClick={onClickSaveCancle}>
              취소
            </button>
            {daySchedule.scheduleNo > 0 && (
              <button type="button" onClick={() => setIsConfirmModal(true)}>
                삭제
              </button>
            )}
            <button type="button" onClick={() => handleScheduleSave()}>
              저장
            </button>
          </div>
        </div>
      </div>
      {isConfirmModal && (
        <AlarmModal
          title="알림"
          description="해당 일정을 삭제하시겠습니까?"
          onClickCancle={handleAlarmModalCancle}
          onClickConfirm={handleAlarmModalConfirm}
        />
      )}
    </>
  );
};

export default ScheduleSaveModal;
