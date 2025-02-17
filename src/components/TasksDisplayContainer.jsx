// TasksDisplayContainer.jsx

import styles from "./TasksDisplayContainer.module.css"
import TaskItem from './TaskItem'
import { useSelector, useDispatch } from "react-redux";
import { memo } from 'react';
import { useEffect, useState } from 'react';
import { toggleTaskCompletion, showPopup, deleteTask, sortImportantTasks } from "../redux/tasksSlice";


const TasksDisplayContainer = () => {

    const tasks = useSelector((state) => state.tasks.values)
    const [showFinishedTasks, setShowFinishedTasks] = useState(true)

    const dispatch = useDispatch();
    const toggleTask = (id) => dispatch(toggleTaskCompletion(id));
    const editTask = (value) => dispatch(showPopup(value));
    const deleteTaskById = (id) => dispatch(deleteTask(id));
    const markImportant = (id) => dispatch(sortImportantTasks(id));


    useEffect(() => {
        const script1 = document.createElement("script");
        // script1.src = "https://cdn.lordicon.com/lordicon.js";
        script1.src = "./lordicon.js";
        script1.defer = true;
        document.body.appendChild(script1);

        const script = document.createElement("script");

        script1.onload = () => {
            script.src = "./lordicon-event-delegation.js";
            script.defer = true;
            document.body.appendChild(script);
        };

        return () => {
            document.body.removeChild(script1);
            if (script && script.parentNode) {
                document.body.removeChild(script);
            }
        };
    }, []);


    return (
        <div className={styles.container}>
            <div className={styles.heading}>
                <h2>My Tasks</h2>
                <div className={styles.checkbox}>
                    <input type="checkbox" tabIndex={-1} className={styles.customCheckbox} onChange={() => setShowFinishedTasks(!showFinishedTasks)} checked={showFinishedTasks} id='showFinishedTasks' />
                    <label htmlFor='showFinishedTasks'>Show finished tasks</label>
                </div>
            </div>

            <ul className={`${styles.tasks} parent`}>

                {tasks.length === 0 && <div>No tasks to display</div>}

                {
                    tasks.map((value, index) => {
                        return (
                            (showFinishedTasks || !value.isCompleted) && (
                                <TaskItem
                                    {...value}
                                    index={index}
                                    key={value.id}
                                    toggleTask={toggleTask}
                                    editTask={editTask}
                                    deleteTaskById={deleteTaskById}
                                    markImportant={markImportant}
                                />

                            )
                        )
                    })
                }

            </ul>

        </div>
    )
}

export default memo(TasksDisplayContainer)

