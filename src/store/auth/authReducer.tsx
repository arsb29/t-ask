import { LOGIN_SUCCESS, LOGIN_ERROR, SIGN_OUT_SUCCESS, SIGN_OUT_ERROR, SIGN_UP_SUCCESS, SIGN_UP_ERROR } from './authActionsTitles';

const initState = { authError: null };

const authReducer = (state = initState, action) => {

	switch (action.type) {

		case LOGIN_SUCCESS:
			return { ...state, authError: null }

		case LOGIN_ERROR:
			return { ...state, authError: action.err.message }

		case SIGN_OUT_SUCCESS:
			return { ...state, authError: null };

		case SIGN_OUT_ERROR:
			return { ...state, authError: 'Sign out failed' };

		case SIGN_UP_SUCCESS:
			return { ...state, authError: null };

		case SIGN_UP_ERROR:
			return { ...state, authError: action.err.message };

		default:
			return state;
	}
}

export default authReducer