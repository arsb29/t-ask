import { store } from './index'
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export type Project = {
	id: string,
	title: string,
	owners: string[],
	authorId: string,
	authorFirstName: string,
	authorLastName: string,
	createdAt: Date,
	authorUpdateId?: string,
	authorUpdateFirstName?: string,
	authorUpdateLastName?: string,
	updatedAt?: Date,
	voting: VoitingType
}

export type ListType = {
	id: string,
	parent: string,
	title: string,
	color: string,
	authorId: string,
	authorFirstName: string,
	authorLastName: string,
	createdAt: Date,
	authorUpdateId?: string,
	authorUpdateFirstName?: string,
	authorUpdateLastName?: string,
	updateddAt?: Date
}

export type VoitingType = {
	answers: object,
	question: string,
	votes: object
}