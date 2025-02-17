// TaskItem.js

import { memo } from "react";
import styles from "./TaskItem.module.css";


const TaskItem = ({ title, desc, isCompleted, id, index, isImportant, toggleTask, editTask, deleteTaskById, markImportant }) => {

  return (
    <li className={styles.task}>
      <span className={styles.index}>{index + 1}.</span>
      <div className={styles.text}>
        <span className={isCompleted ? `${styles.title} ${styles.strike}` : styles.title}>{title}</span>
        <span className={isCompleted ? `${styles.desc} ${styles.strike}` : styles.desc}>{desc}</span>
      </div>
      <div className={styles.buttons}>
        <input type="checkbox" tabIndex={-1} className={styles.customCheckbox} checked={isCompleted} onChange={() => toggleTask(id)} aria-label="Mark Complete" />

        <button className={styles.button} onClick={() => markImportant(id)} tabIndex={-1} aria-label="Mark Important">
          <svg xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" viewBox="0 0 100 100" width="100%" height="100%"><path fill={isImportant? "#ffd700" : "gray"} d="M52.917,13.791L60.84,36.74c0.403,0.806,1.181,1.364,2.081,1.493l24.29,0.162  c2.668,0.383,3.734,3.621,1.803,5.479l-19.393,14.72c-0.651,0.627-0.949,1.531-0.795,2.416l7.088,22.675  c0.456,2.624-2.333,4.625-4.72,3.386L51.286,73.595c-0.805-0.418-1.767-0.418-2.573,0L28.805,87.072  c-2.387,1.239-5.176-0.762-4.72-3.386l7.088-22.675c0.154-0.885-0.143-1.789-0.795-2.416l-19.393-14.72  c-1.931-1.858-0.865-5.096,1.803-5.479l24.29-0.162c0.9-0.129,1.679-0.688,2.081-1.493l7.923-22.949  C48.276,11.403,51.724,11.403,52.917,13.791z" /></svg>
        </button>

        <button onClick={() => editTask({ title, desc, isCompleted, id })} className={styles.lordIcon} tabIndex={-1} aria-label="Edit">
          <lord-icon src="./edit.json" stroke="bold" colors="primary:white,secondary:white"></lord-icon>
        </button>

        <button onClick={() => deleteTaskById(id)} className={styles.lordIcon} tabIndex={-1} aria-label="Delete">
          <lord-icon src="./delete.json" stroke="bold" colors="primary:white,secondary:white"></lord-icon>
        </button>
      </div>
    </li>
  );
};

export default memo(TaskItem);