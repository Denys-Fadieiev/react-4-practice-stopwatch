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
import CircleTime from './CircleTime';
import Btn from './Btn';
import { padNumber } from './utilits';

class Stopwatch extends Component {
  state = {
    isStarted: false,
    milliseconds: 0,
    seconds: 0,
    minutes: 0,
    circles: [],
  }

  handleStartStop = () => {
    this.setState({isStarted: !this.state.isStarted})
  }

  startTime = () => {
    const {isStarted, milliseconds, seconds, minutes} = this.state;
    if(isStarted === true){
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

  componentDidMount() {
  this.timerId = setInterval(this.startTime, 10);
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  resetTime = () => {
    this.setState({ 
      milliseconds: 0, 
      seconds: 0, 
      minutes: 0,
      circles: [],
    })
  }

  circleTime = () => {
    const {circles, milliseconds, seconds, minutes} = this.state;
    const clone = JSON.parse(JSON.stringify(circles));
    
    clone.unshift({
      id: this.state.circles.length + 1,
      milliseconds: padNumber(milliseconds, milliseconds <=9), 
      seconds: padNumber(seconds, seconds <=9),
      minutes: padNumber(minutes, minutes <=9)
    })

    this.setState({
      circles: clone,
    })
  }

  render() {
    const { isStarted, circles, milliseconds, seconds, minutes } = this.state;

    return (
      <div className={styles.stopwatchPhoneWrapper}>
        <div className={styles.stopwatchPhoneBrow}>
          <div className={styles.stopwatchPhoneBrowStrip}></div>
        </div>

        <p className={styles.stopwatchTime}>
          {padNumber(minutes, minutes <= 9)}:
          {padNumber(seconds, seconds <= 9)}, 
          {padNumber(milliseconds, milliseconds <= 9)}
        </p>

        <Btn 
        isStarted = {isStarted}
        circleTime = {this.circleTime}
        resetTime = {this.resetTime}
        handleStartStop = {this.handleStartStop}/>

        <CircleTime
        circles = {circles}/>
      </div>
    );
  }
}

export default Stopwatch;