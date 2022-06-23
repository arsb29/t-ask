import { Project } from '../../types'
import { useAppSelector } from '../../hooks';
import styles from './AllProjectsPage.module.css';
import React, { useEffect, useState } from 'react';
import NewProject from '../../components/NewProject/NewProject';
import { isLoaded, useFirestoreConnect } from 'react-redux-firebase'
import ProjectListItem from '../../components/ProjectListItem/ProjectListItem';
import AllProjectsPageHeader from '../../components/AllProjectsPageHeader/AllProjectsPageHeader';

type Props = {};

const AllProjectsPage: React.FC<Props> = () => {

	const [loaded, setLoaded] = useState<boolean>(false);
	const authEmail = useAppSelector<string>(state => state.firebase.auth.email);

	useFirestoreConnect([{
		collection: "projects",
		where: [['owners', 'array-contains', authEmail]],
		orderBy: ['createdAt', 'asc']
	}]);

	const projects: Project[] = useAppSelector(state => state.firestore.ordered.projects);

	useEffect(() => {
		setTimeout(() => {
			if (isLoaded(projects)) {
				setLoaded(true);
				document.title = 'Проекты';
			}
		}, 500)
	}, [projects])

	return !loaded ? <div className={styles.loading}> </div> : <>
		<AllProjectsPageHeader projects={projects} />
		<div className={styles.projects__cards}>
			{projects && projects.map((element) => {
				return <ProjectListItem key={element.id} {...element} />
			})}
			<NewProject className={styles.card} />
		</div>
	</>
};

export default AllProjectsPage;