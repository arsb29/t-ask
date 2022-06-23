import {
	CREATE_PROJECT_SUCCESS,
	CREATE_PROJECT_FAILED,
	UPDATE_PROJECT_SUCCESS,
	UPDATE_PROJECT_FAILED,
	DELETE_PROJECT_SUCCESS,
	DELETE_PROJECT_FAILED,
	ADD_VOTING_SUCCESS,
	ADD_VOTING_FAILED,
	ADD_VOTE_SUCCESS,
	ADD_VOTE_FAILED,
	DELETE_VOTING_SUCCESS,
	DELETE_VOTING_FAILED
} from './projectActionsTitle';

const initState = { projectError: null };

const projectReducer = (state = initState, action) => {

	switch (action.type) {

		case CREATE_PROJECT_SUCCESS:
			return { ...state, projectError: null }

		case CREATE_PROJECT_FAILED:
			return { ...state, projectError: 'Create project failed' }

		case UPDATE_PROJECT_SUCCESS:
			return { ...state, projectError: null }

		case UPDATE_PROJECT_FAILED:
			return { ...state, projectError: 'Update project failed' }

		case DELETE_PROJECT_SUCCESS:
			return { ...state, projectError: null }

		case DELETE_PROJECT_FAILED:
			return { ...state, projectError: 'Delete project failed' }

		case ADD_VOTING_SUCCESS:
			return { ...state, projectError: null }

		case ADD_VOTING_FAILED:
			return { ...state, projectError: 'Add voting failed' }

		case ADD_VOTE_SUCCESS:
			return { ...state, projectError: null }

		case ADD_VOTE_FAILED:
			return { ...state, projectError: 'Add vote failed' }

		case DELETE_VOTING_SUCCESS:
			return { ...state, projectError: null }

		case DELETE_VOTING_FAILED:
			return { ...state, projectError: 'Delete voting failed' }

		default:
			return state;
	}
}

export default projectReducer;