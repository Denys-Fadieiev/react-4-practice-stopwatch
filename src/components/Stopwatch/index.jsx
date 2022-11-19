// Задача: реализовать компонент секундомера.
// Basic level:
// секунды можно отображать как простое число
// сделать кнопку запуска секундомера, при нажатии на которую раз в секунду увеличивать число
// сделать кнопку остановки секундомера, при нажатии на которую он ставится на паузу
// сделать базовую стилизацию для элементов секундомера
// Advanced level:
// сделать кнопку сброса секундомера. При сбросе нужно вернуть состояние в изначальный вид (подумайте что для этого надо сделать)
// Обьеденить кнопки старта и остановки секундомера в одну кнопку, которая будет менятся в зависимости от состояния секундомера
// Переделать стили для новой кнопки, чтобы они динамически менялись
// Ultra advanced level:
// добавить кнопку круга, при нажатии на неё текущее значение секундомера надо записать в отдельный массив кругов (при этом можно либо обнулять текущее время либо оставлять как есть)
// отдельным списком отобразить все записи в массиве кругов в виде номер_круга : количество_секунд
// Секундомер должен стартовать при монтировании компонента
// Frontend God level:
// разделить компонент Stopwatch на умные  глупые компоненты для умешьшения его размеров. Глупым компонентам передавать данные для отрисовки через пропсы
// Перейти от записи чисел к записи и отображаению реальных дат. При этом необходимо будет поменять логику добавления секунд и лоигку отрисовки дат, так как реакт не будет отображать обьекты, а будет кидаться ошбками. Отобразить даты в виде часы : минуты : секунды
import React, { Component } from 'react';
import styles from './Stopwatch.module.scss';

class Stopwatch extends Component {
  state = {
    isStart: false,
    milliseconds: 0,
    seconds: 0,
    minutes: 0,
  }

  handleStartStop = () => {
    this.setState({isStart: !this.state.isStart})
  }

  startTime = () => {
    const {isStart, milliseconds, seconds, minutes} = this.state;
    if(isStart === true){
      if (milliseconds === 99) {
        this.setState({ milliseconds: 0, seconds: seconds + 1})
      } else {
        this.setState({ milliseconds: milliseconds + 1 });
        }
    
      if (seconds === 59) {
        this.setState({ seconds: 0, minutes: minutes + 1});
      }
    }
  }

  timerId = setInterval(this.startTime, 10);

  resetTime = () => {
    this.setState({ 
      milliseconds: 0, 
      seconds: 0, 
      minutes: 0
    })
  }


  render() {
    return (
      <div className={styles.stopwatchPhoneWrapper}>
        <div className={styles.stopwatchPhoneBrow}>
          <div className={styles.stopwatchPhoneBrowStrip}></div>
        </div>
        <p className={styles.stopwatchTime}>
          {(this.state.minutes <= 9) ? '0' + this.state.minutes : this.state.minutes}:
          {(this.state.seconds <= 9) ? '0' + this.state.seconds : this.state.seconds}, 
          {(this.state.milliseconds <= 9) ? '0' + this.state.milliseconds : this.state.milliseconds}
        </p>
        <div className={styles.btnBlock}>
          <div className={`${styles.btnWrapper} ${styles.btnWrapperReset}`}>
            <button className = {`${styles.btn} ${styles.btnReset}`} onClick={this.resetTime}>Сброс</button>
          </div>
          <div className={`${styles.btnWrapper} ${styles.btnWrapperStart}`}>
            <button className = {`${styles.btn} ${styles.btnStart}`} onClick={this.handleStartStop}>Старт</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Stopwatch;