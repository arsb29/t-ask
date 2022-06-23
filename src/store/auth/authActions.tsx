import { LOGIN_SUCCESS, LOGIN_ERROR, SIGN_OUT_SUCCESS, SIGN_OUT_ERROR, SIGN_UP_SUCCESS, SIGN_UP_ERROR } from './authActionsTitles';

export const signIn = ({ firebase }, crendentials) => {
	return (dispatch) => {
		firebase.auth().signInWithEmailAndPassword(
			crendentials.email,
			crendentials.password
		).then(() => {
			dispatch(loginSuccess())
		}).catch((err) => {
			dispatch(loginError(err))
		})
	}
}

export const signOut = ({ firebase }) => {
	return (dispatch) => {
		firebase.auth().signOut()
			.then(() => {
				dispatch(signOutSuccess())
			}).catch((err) => {
				dispatch(signOutError(err))
			})
	}
}

const loginSuccess = () => {
	return { type: LOGIN_SUCCESS }
}

const loginError = (err) => {
	return { type: LOGIN_ERROR, err }
}

const signOutSuccess = () => {
	return { type: SIGN_OUT_SUCCESS }
}

const signOutError = (err) => {
	return { type: SIGN_OUT_ERROR, err }
}

export const signUp = ({ firebase, firestore }, newUser) => {
	return (dispatch) => {
		if (newUser.firstName === '' || newUser.lastName === '') {
			const err = {
				message: 'The first or last name field cannot be empty'
			}
			dispatch(signUpError(err))
		} else {
			firebase.auth().createUserWithEmailAndPassword(
				newUser.email,
				newUser.password
			).then((resp) => {
				return firestore.collection('users')
					.doc(resp.user.uid)
					.set({
						firstName: newUser.firstName,
						lastName: newUser.lastName,
						initials: newUser.firstName[0] + newUser.lastName[0],
						email: newUser.email
					})
			}).then(() => {
				dispatch(signUpSuccess())
			}).catch((err) => {
				dispatch(signUpError(err))
			})
		}
	}
}

const signUpSuccess = () => {
	return { type: SIGN_UP_SUCCESS }
}

const signUpError = (err) => {
	return { type: SIGN_UP_ERROR, err }
}