import authReducer from './auth/authReducer';
import projectReducer from './project/projectReducer';
import taskReducer from './task/taskReducer';
import listReducer from './list/listReducer';
import { combineReducers } from 'redux';
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from 'redux-firestore';


const rootReducer = combineReducers({
	auth: authReducer,
	project: projectReducer,
	task: taskReducer,
	list: listReducer,
	firebase: firebaseReducer,
	firestore: firestoreReducer
})

export default rootReducer;