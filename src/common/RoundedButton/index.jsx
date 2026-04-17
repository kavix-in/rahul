import React from 'react'
import styles from './style.module.scss';
import Magnetic from '../Magnetic';

export default function RoundedButton({children, backgroundColor="#ffffff", ...attributes}) {

  return (
    <Magnetic>
      <div
        className={styles.roundedButton}
        style={{ '--rounded-hover-fill': backgroundColor }}
        {...attributes}
      >
        {children}
      </div>
    </Magnetic>
  )
}
