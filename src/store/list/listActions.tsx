import {
	CREATE_LIST_SUCCESS,
	CREATE_LIST_FAILED,
	DELETE_LIST_SUCCESS,
	DELETE_LIST_FAILED,
	UPDATE_LIST_SUCCESS,
	UPDATE_LIST_FAILED
} from './listActionsTitles';

export const createList = ({ firestore }, newList) => {
	return (dispatch, getState) => {

		const profile = getState().firebase.profile;
		const authorId = getState().firebase.auth.uid;
		const authorEmail = getState().firebase.auth.email;

		firestore
			.collection('lists')
			.add({
				parent: newList.parent,
				title: 'Новый список',
				color: '#ffe871',
				authorFirstName: profile.firstName,
				authorLastName: profile.lastName,
				authorEmail: authorEmail,
				authorId: authorId,
				createdAt: new Date()
			})
			.then(() => {
				dispatch(createListSuccess(newList.title))
			})
			.catch((err) => {
				dispatch(createListError(err))
			})
	}
}

const createListSuccess = (titleItem) => {
	return { type: CREATE_LIST_SUCCESS, titleItem }
}

const createListError = (err) => {
	return { type: CREATE_LIST_FAILED, err }
}

export const updateList = ({ firestore }, updatedList) => {
	return (dispatch, getState) => {

		const profile = getState().firebase.profile;
		const authorId = getState().firebase.auth.uid;
		const authorEmail = getState().firebase.auth.email;

		firestore
			.collection('lists')
			.doc(updatedList.listId)
			.update({
				...updatedList.changes,
				authorUpdateFirstName: profile.firstName,
				authorUpdateLastName: profile.lastName,
				authorUpdateEmail: authorEmail,
				authorUpdateId: authorId,
				updatedAt: new Date()
			})
			.then(() => {
				dispatch(updateListSuccess(updatedList.title))
			})
			.catch((err) => {
				dispatch(updateListError(err))
			})
	}
}

const updateListSuccess = (titleItem) => {
	return { type: UPDATE_LIST_SUCCESS, titleItem }
}

const updateListError = (err) => {
	return { type: UPDATE_LIST_FAILED, err }
}

export const deleteList = ({ firestore }, deletedList) => {
	return (dispatch) => {
		firestore
			.collection('lists')
			.doc(deletedList.listId)
			.delete()
			.then(() => {
				dispatch(deleteListSuccess())
			})
			.catch((err) => {
				dispatch(deleteListError(err))
			})
	}
}

const deleteListSuccess = () => {
	return { type: DELETE_LIST_SUCCESS }
}

const deleteListError = (err) => {
	return { type: DELETE_LIST_FAILED, err }
}
