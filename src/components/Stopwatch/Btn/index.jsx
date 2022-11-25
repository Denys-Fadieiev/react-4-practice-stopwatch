import React from 'react';
import styles from './Btn.module.scss';
import classNames from 'classnames';

const Btn = (props) => {
  const {
    isStarted,
    circleTime,
    resetTime,
    handleStartStop,
    // resettBtnCallback,
  } = props;

  const resettBtnCallback = isStarted ? circleTime : resetTime;

  const nameBtnCircleReset = isStarted ? 'Круг' : 'Сброс';
  
  const nameBtnStartStop = isStarted ? 'Стоп' : 'Старт';

  return (
    <div className={styles.btnBlock}>
      <div>
        <button className = {`${styles.btn} ${styles.btnReset}`} 
        onClick={resettBtnCallback}>{nameBtnCircleReset}</button>
      </div>
      <div>
        <button className = {classNames(styles.btn, {
          [styles.btnStop]: isStarted, 
          [styles.btnStart]: !isStarted
        })}
        onClick={handleStartStop}>{nameBtnStartStop}</button>
      </div>
    </div>
  );
}

export default Btn;
