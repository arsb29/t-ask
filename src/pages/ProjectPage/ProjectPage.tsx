import Voting from '../Voting/Voting';
import { useAppSelector } from '../../hooks';
import styles from './ProjectPage.module.css';
import AddVoting from '../AddVoting/AddVoting';
import Lists from '../../components/Lists/Lists';
import React, { useEffect, useState } from 'react';
import Button from '../../components/Button/Button';
import Participants from '../Participants/Participants';
import { Link, Redirect, Route } from 'react-router-dom';
import { isLoaded, useFirestoreConnect } from 'react-redux-firebase'
import ProjectPageHeader from '../../components/ProjectPageHeader/ProjectPageHeader';
import VoitingNotification from '../../components/VoitingNotification/VoitingNotification';
import { ListType, Project } from '../../types';

type Props = {
	match: {
		params: {
			id: string,
		},
		path
	},
}

const ProjectPage: React.FC<Props> = ({ match }) => {

	useFirestoreConnect([
		{
			collection: "projects",
			doc: match.params.id
		}, {
			collection: "lists",
			where: [['parent', '==', match.params.id]],
			orderBy: [['createdAt', 'asc']]
		}
	]);

	const lists = useAppSelector<ListType[]>(state => state.firestore.ordered.lists);
	const project = useAppSelector<Project[]>(state => state.firestore.ordered.projects);
	const authEmail = useAppSelector<string>(state => state.firebase.auth.email);
	const [loaded, setLoaded] = useState<boolean>(false);

	useEffect(() => {
		setTimeout(() => {
			if (isLoaded(lists) && isLoaded(project)) {
				setLoaded(true);
			}
		}, 500)
	}, [lists, project])

	const renderBodyProjectPage = () => {
		if (project.length === 0) {
			return < Redirect to='/' />
		} else if (!project[0].owners.includes(authEmail)) {
			return < Redirect to='/' />
		}
		else {
			return <div className={styles.project__container}>
				<ProjectPageHeader lists={lists} project={project[0]} />
				<VoitingNotification match={match} voting={project[0].voting} ></VoitingNotification>
				<Lists lists={lists} />
				<div className={styles.helpers}>
					<Link to={`/project/${match.params.id}/voting/`}><Button action='voting' /></Link>
					<Link to={`/project/${match.params.id}/participants/`}><Button action='people' /></Link>
				</div>
				<Route path={`${match.path}/add_voting/`} render={() => { return <AddVoting match={match} voting={project[0].voting} /> }} />
				<Route path={`${match.path}/voting/`} render={() => { return <Voting match={match} voting={project[0].voting} /> }} />
				<Route path={`${match.path}/participants/`} render={() => { return <Participants match={match} people={project[0].owners} id={project[0].id} /> }} ></Route>

			</div >
		}
	}

	return !loaded ? <div className={styles.loading}> </div> : renderBodyProjectPage();
};


export default ProjectPage;