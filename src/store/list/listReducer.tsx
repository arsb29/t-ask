import {
	CREATE_LIST_SUCCESS,
	CREATE_LIST_FAILED,
	UPDATE_LIST_SUCCESS,
	UPDATE_LIST_FAILED,
	DELETE_LIST_SUCCESS,
	DELETE_LIST_FAILED
} from './listActionsTitles';

const initState = { taskError: null };

const listReducer = (state = initState, action) => {

	switch (action.type) {

		case CREATE_LIST_SUCCESS:
			return { ...state, listError: null }

		case CREATE_LIST_FAILED:
			return { ...state, listError: 'Create list failed' }

		case UPDATE_LIST_SUCCESS:
			return { ...state, listError: null }

		case UPDATE_LIST_FAILED:
			return { ...state, listError: 'Update list failed' }

		case DELETE_LIST_SUCCESS:
			return { ...state, listError: null }

		case DELETE_LIST_FAILED:
			return { ...state, listError: 'Delete list failed' }

		default:
			return state;
	}
}

export default listReducer;