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
    circles: [],
    isCircle: false,
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
      minutes: 0,
      circles: [],
    })
  }

  circleTime = () => {
    const newCircle = this.state.circles;
    newCircle.unshift({
      id: this.state.circles.length + 1,
      milliseconds: this.state.milliseconds <= 9 ? `0${this.state.milliseconds}` : this.state.milliseconds, 
      seconds: this.state.seconds <= 9 ? `0${this.state.seconds}` : this.state.seconds,
      minutes: this.state.minutes <=9 ? `0${this.state.minutes}` : this.state.minutes,
    })
  }

  render() {
    const { isStart, circles } = this.state;
    // Стили кнопок старт/стоп
    const btnStartStop = {
      backgroundColor: isStart === true ? 'rgb(86, 13, 13, 0.828)' : 'rgb(12, 49, 12)',
      color: isStart === true ? 'rgb(245, 53, 10)' : 'rgb(29, 197, 29)',
    }

    const btnStartStopCircle = {
      border: isStart === true ? '3px solid rgb(86, 13, 13, 0.828)' : '3px solid rgb(12, 49, 12)',
    }

    // Стили кнопок круг/сброс
    // const btnCircleReset = {
    //   border: isStart === true ? '3px solid rgb(86, 13, 13, 0.828)' : '3px solid rgb(12, 49, 12)',
    // }

    const nameBtnStartStop = isStart === true ? 'Стоп' : 'Старт';
    const nameBtnCircleReset = isStart === true ? 'Круг' : 'Сброс';

    //Отрисовка листа
    const circlesList = circles.map(({id, milliseconds, seconds, minutes}) => (
      <li className={styles.circlesListItems} id = {id}>
        <p>
        Круг {id}
        </p>
        <p>
          {minutes}:{seconds},{milliseconds}
        </p>
      </li>
    ));

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
            <button className = {`${styles.btn} ${styles.btnReset}`} onClick={this.circleTime}>{nameBtnCircleReset}</button>
          </div>
          <div style={btnStartStopCircle} className={styles.btnWrapper}>
            <button style={btnStartStop} className = {styles.btn} onClick={this.handleStartStop}>{nameBtnStartStop}</button>
          </div>
        </div>
        <ul className={styles.circlesList}>
          {circlesList}
        </ul>
      </div>
    );
  }
}

export default Stopwatch;