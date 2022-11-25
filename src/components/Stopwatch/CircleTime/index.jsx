import React from 'react';
import styles from './CircleTime.module.scss';

const CircleTime = (props) => {
  const { circles } = props;

  const circlesList = circles.map(({id, milliseconds, seconds, minutes}) => (
    <li className={styles.circlesListItems} id = {id} key={id}>
      <p>
      Круг {id}
      </p>
      <p>
        {minutes}:{seconds},{milliseconds}
      </p>
    </li>
  ));


  return (
    <ul className={styles.circlesList}>
    {circlesList}
  </ul>
  );
}

export default CircleTime;
