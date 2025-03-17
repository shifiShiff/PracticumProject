// filepath: /C:/Users/User/Desktop/פרקטיקום/ReactClient/src/redux/rootReducer.ts
import { combineReducers } from 'redux';
import imageReducer from './slices/imageSlice';

const rootReducer = combineReducers({
  images: imageReducer,
});

export default rootReducer;