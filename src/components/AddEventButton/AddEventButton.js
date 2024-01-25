import React from 'react';
import styles from './AddEventButton.module.css'

const AddEventButton = ({ onClick,children }) => {
  return (
    <button className={styles.btn}type="button" onClick={onClick}>
      {children}
    </button>
  );
};

export default AddEventButton;
