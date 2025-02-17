// tasksSlice.js

import { createSlice, nanoid } from "@reduxjs/toolkit"

const initialState = {
    values: JSON.parse(localStorage.getItem("tasks")) || [],
    popupVisible: false,
    taskToUpdate: null,
};

const storeToLS = (array)=>{
    localStorage.setItem("tasks", JSON.stringify(array))
}

const handleShowPopup = (state, action) => {
    state.popupVisible = true;
    state.taskToUpdate = action.payload;
};

const handleHidePopup = (state) => {
    state.popupVisible = false;
    state.taskToUpdate = null;
};

const handleAddTask = (state, action) => {
    const task = {
        id: nanoid(),
        title: action.payload.title,
        desc: action.payload.desc,
        isCompleted: false,
        isImportant: false
    }
    state.values.unshift(task)
    storeToLS(state.values)
}

const handleDeleteTask = (state, action) => {
    state.values = state.values.filter(item => item.id !== action.payload)
    storeToLS(state.values)
}

const handleUpdateTask = (state, action) => {
    // if equal dont call db
    const { id, title, desc } = action.payload;
    let task = state.values.find(task => task.id === id);
    if (task) {
        task.title = title;
        task.desc = desc;
    }
    state.popupVisible = false; // Hide popup after update
    state.taskToUpdate = null;
    storeToLS(state.values)
};

const handleToggleTaskCompletion = (state, action) => {
    const taskIndex = state.values.findIndex(task => task.id === action.payload);
    if (taskIndex === -1) return; 
    const task = state.values[taskIndex];
    task.isCompleted = !task.isCompleted;
    state.values.splice(taskIndex, 1);
    if (task.isCompleted) {
        state.values.push(task); 
    } else {
        state.values.unshift(task); 
    }
    storeToLS(state.values)
};
 

// const handleSortImportantTasks = (state, action) => {
//     const taskIndex = state.values.findIndex(task => task.id === action.payload);
//     if (taskIndex !== -1) {
//         // Clone the array to trigger state updates
//         // state.values = [...state.values];
//         state.values[taskIndex].isImportant = !state.values[taskIndex].isImportant;
//         state.values.sort((a, b) => b.isImportant - a.isImportant);
//     }
// };


const handleSortImportantTasks = (state, action) => {
    const taskIndex = state.values.findIndex(task => task.id === action.payload);
    if (taskIndex === -1) return; 

    const task = state.values[taskIndex];
    task.isImportant = !task.isImportant;
    state.values.splice(taskIndex, 1);

    if (task.isImportant) {
        state.values.unshift(task);  
    } else {
        state.values.push(task); 
    }
    storeToLS(state.values)
};

const handleClearLocalStorage = (state)=>{
    let answer  = confirm("ARE YOU SURE TO DELETE ALL TASKS ?")
    if (!answer) return
    localStorage.removeItem("tasks")
    state.values = [] //to trigger rerender
}

const handleClearCompletedTasks = (state)=>{
    let answer  = confirm("ARE YOU SURE TO DELETE ALL COMPLETED TASKS ?")
    if (!answer) return
    state.values = state.values.filter(task => !task.isCompleted)
}


export const tasksSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        addTask: handleAddTask,
        deleteTask: handleDeleteTask,
        updateTask: handleUpdateTask,
        showPopup: handleShowPopup,
        hidePopup: handleHidePopup,
        toggleTaskCompletion: handleToggleTaskCompletion,
        sortImportantTasks: handleSortImportantTasks,
        clearLocalStorage: handleClearLocalStorage,
        clearCompletedTasks: handleClearCompletedTasks
    }

})


export const { addTask, deleteTask, updateTask, showPopup, hidePopup, toggleTaskCompletion, sortImportantTasks, clearLocalStorage, clearCompletedTasks } = tasksSlice.actions

export default tasksSlice.reducer