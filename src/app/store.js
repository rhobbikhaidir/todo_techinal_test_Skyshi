import {
  configureStore
} from '@reduxjs/toolkit';
import todosSlicer from '../redux/todosSlicer';


export const store = configureStore({
  reducer: {
    todosSlicer
  },
});