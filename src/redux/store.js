//store.js

import {configureStore} from "@reduxjs/toolkit"
import tasksReducer from "./tasksSlice"
import themesReducer from "./themesSlice"


export const store = configureStore({
    reducer:{
        tasks: tasksReducer,
        themes: themesReducer
    }
})
