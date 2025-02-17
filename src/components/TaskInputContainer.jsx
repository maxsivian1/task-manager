// TaskInputContainer.jsx

import { useState, useRef } from 'react';
import styles from "./TaskInputContainer.module.css";
import { useDispatch } from "react-redux";
import { addTask } from '../redux/tasksSlice';
import { memo } from 'react';


const TaskInputContainer = () => {

  const [task, setTask] = useState({ title: "", desc: "" });
  const [isTitleEmpty, setIsTitleEmpty] = useState(false)

  const dispatch = useDispatch();
  const titleRef = useRef()

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
    if (isTitleEmpty === true) {
      setIsTitleEmpty(false)
    }
  };

  const handleAdd = (e) => {
    e.preventDefault();

    if (task.title.trim() !== "") {
      dispatch(addTask(task));
      setTask({ title: "", desc: "" });
    }
    else {
      setIsTitleEmpty(true)
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2>Add Task</h2>
      <form onSubmit={handleAdd} className={styles.form}>
        <div className={styles.left}>
          <input
            type="text"
            placeholder="title"
            name="title"
            value={task.title}
            onChange={handleChange}
            className={`${isTitleEmpty ? styles.outlineRed : ""} othercommonclasses`}
            tabIndex={0}
            autoFocus
            ref={titleRef}
            aria-label='Title'
          />
          <input
            type="text"
            placeholder="description (optional)"
            name="desc"
            value={task.desc}
            onChange={handleChange}
            tabIndex={0}
            aria-label='Description'
          />
        </div>
        <div className={styles.right}>
          <button type="submit" tabIndex={-1} aria-label='Add'>+</button>
        </div>
      </form>
    </div>
  );
};

export default memo(TaskInputContainer);
