import {
	CREATE_TASK_SUCCESS,
	CREATE_TASK_FAILED,
	// DELETE_TASK_SUCCESS,
	// DELETE_TASK_FAILED,
	UPDATE_TASK_SUCCESS,
	UPDATE_TASK_FAILED
} from './taskActionsTitles';

const initState = { taskError: null };

const taskReducer = (state = initState, action) => {

	switch (action.type) {

		case CREATE_TASK_SUCCESS:
			return { ...state, taskError: null }

		case CREATE_TASK_FAILED:
			return { ...state, taskError: 'Create task failed' }

		case UPDATE_TASK_SUCCESS:
			return { ...state, taskError: null }

		case UPDATE_TASK_FAILED:
			return { ...state, taskError: 'update task failed' }

		default:
			return state;
	}
}

export default taskReducer;