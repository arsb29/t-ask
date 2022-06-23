import {
	CREATE_TASK_SUCCESS,
	CREATE_TASK_FAILED,
	UPDATE_TASK_SUCCESS,
	UPDATE_TASK_FAILED,
	DELETE_TASK_SUCCESS,
	DELETE_TASK_FAILED
} from './taskActionsTitles';

export const createTask = ({ firestore }, newTask) => {
	return (dispatch, getState) => {

		const profile = getState().firebase.profile;
		const authorId = getState().firebase.auth.uid;
		const authorEmail = getState().firebase.auth.email;

		firestore
			.collection('lists')
			.doc(newTask.listId)
			.collection('items')
			.add({
				done: false,
				title: newTask.title,
				authorFirstName: profile.firstName,
				authorLastName: profile.lastName,
				authorEmail: authorEmail,
				authorId: authorId,
				createdAt: new Date()
			})
			.then(() => {
				dispatch(createTaskSuccess(newTask.title))
			})
			.catch((err) => {
				dispatch(createTaskError(err))
			})
	}
}

const createTaskSuccess = (titleItem) => {
	return { type: CREATE_TASK_SUCCESS, titleItem }
}

const createTaskError = (err) => {
	return { type: CREATE_TASK_FAILED, err }
}

export const updateTask = ({ firestore }, updateTask) => {
	return (dispatch, getState) => {

		const profile = getState().firebase.profile;
		const authorId = getState().firebase.auth.uid;
		const authorEmail = getState().firebase.auth.email;
		firestore
			.collection('lists')
			.doc(updateTask.listId)
			.collection('items')
			.doc(updateTask.id)
			.update({
				done: updateTask.done,
				title: updateTask.title,
				authorUpdateFirstName: profile.firstName,
				authorUpdateLastName: profile.lastName,
				authorUpdateEmail: authorEmail,
				authorUpdateId: authorId,
				updateddAt: new Date()
			})
			.then(() => {
				dispatch(updateTaskSuccess(updateTask.title))
			})
			.catch((err) => {
				dispatch(updateTaskError(err))
			})
	}
}

const updateTaskSuccess = (titleItem) => {
	return { type: UPDATE_TASK_SUCCESS, titleItem }
}

const updateTaskError = (err) => {
	return { type: UPDATE_TASK_FAILED, err }
}

export const deleteTask = ({ firestore }, deleteTask) => {
	return (dispatch) => {
		firestore
			.collection('lists')
			.doc(deleteTask.listId)
			.collection('items')
			.doc(deleteTask.id)
			.delete()
			.then(() => {
				dispatch(deleteTaskSuccess())
			})
			.catch((err) => {
				dispatch(deleteTaskError(err))
			})
	}
}

const deleteTaskSuccess = () => {
	return { type: DELETE_TASK_SUCCESS }
}

const deleteTaskError = (err) => {
	return { type: DELETE_TASK_FAILED, err }
}
