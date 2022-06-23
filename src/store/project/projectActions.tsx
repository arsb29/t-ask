import {
	CREATE_PROJECT_SUCCESS,
	CREATE_PROJECT_FAILED,
	UPDATE_PROJECT_SUCCESS,
	UPDATE_PROJECT_FAILED,
	DELETE_PROJECT_SUCCESS,
	DELETE_PROJECT_FAILED
} from './projectActionsTitle';

export const createProject = ({ firestore }, project) => {
	return (dispatch, getState) => {

		const profile = getState().firebase.profile;
		const authorId = getState().firebase.auth.uid;
		const authorEmail = getState().firebase.auth.email;

		firestore
			.collection('projects')
			.add({
				...project,
				voting: null,
				authorFirstName: profile.firstName,
				authorLastName: profile.lastName,
				owners: [authorEmail],
				authorId: authorId,
				createdAt: new Date()
			})
			.then(() => {
				dispatch(createProjectSuccess(project))
			})
			.catch((err) => {
				dispatch(createProjectError(err))
			})
	}
}

const createProjectSuccess = (project) => {
	return { type: CREATE_PROJECT_SUCCESS, project }
}

const createProjectError = (err) => {
	return { type: CREATE_PROJECT_FAILED, err }
}

export const updateProject = ({ firestore }, project) => {
	return (dispatch, getState) => {

		const profile = getState().firebase.profile;
		const authorId = getState().firebase.auth.uid;

		firestore
			.collection('projects')
			.doc(project.id)
			.update({
				...project.changes,
				authorUpdateFirstName: profile.firstName,
				authorUpdateLastName: profile.lastName,
				authorUpdateId: authorId,
				updatedAt: new Date()
			})
			.then(() => {
				dispatch(updateProjectSuccess(project))
			})
			.catch((err) => {
				dispatch(updateProjectError(err))
			})
	}
}

const updateProjectSuccess = (project) => {
	return { type: UPDATE_PROJECT_SUCCESS, project }
}

const updateProjectError = (err) => {
	return { type: UPDATE_PROJECT_FAILED, err }
}

export const deleteProject = ({ firestore }, project) => {
	return async (dispatch) => {
		const resposeLists: any = await firestore.get({
			collection: 'lists',
			where: ['parent', '==', project.id]
		})
		if (!resposeLists.empty) {
			resposeLists.forEach(async list => {
				const resposeItems: any = await firestore.collection('lists').doc(list.id).collection('items').get()
				if (!resposeItems.empty) {
					resposeItems.forEach(item => {
						firestore
							.collection('lists')
							.doc(list.id)
							.collection('items')
							.doc(item.id)
							.delete();
					});
				}


				firestore
					.collection('lists')
					.doc(list.id)
					.delete();
			});
		}

		firestore
			.collection('projects')
			.doc(project.id)
			.delete()
			.then(() => {
				dispatch(deleteProjectSuccess())
			})
			.catch((err) => {
				dispatch(deleteProjectError(err))
			})
	}
}

const deleteProjectSuccess = () => {
	return { type: DELETE_PROJECT_SUCCESS, }
}

const deleteProjectError = (err) => {
	return { type: DELETE_PROJECT_FAILED, err }
}