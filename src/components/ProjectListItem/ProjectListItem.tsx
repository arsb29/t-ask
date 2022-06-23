import cn from 'classnames';
import { Project } from '../../types';
import Button from '../Button/Button';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../../App';
import React, { useContext } from 'react';
import styles from './ProjectListItem.module.css';
import { useFirestore } from 'react-redux-firebase';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { deleteProject, updateProject } from '../../store/project/projectActions';

const ProjectListItem: React.FC<Project> = ({ title, id, owners }) => {

	const theme = useContext<string>(ThemeContext);

	const firestore = useFirestore();
	const dispatch = useAppDispatch();
	const authEmail = useAppSelector<string>(state => state.firebase.auth.email);

	const onButtonClick = (e) => {
		e.preventDefault();
		if (owners.length === 1) {
			dispatch(deleteProject({ firestore }, { id }))
		} else {
			const newOwners: string[] = owners.slice();
			const index: number = newOwners.indexOf(authEmail);
			newOwners.splice(index, 1);
			console.log(newOwners)
			dispatch(updateProject({ firestore }, { id, changes: { title, owners: newOwners } }));
		}
	}

	return <Link to={`/project/${id}`} className={styles.card}>
		<div className={styles.card__content}>
			<div className={cn(styles.card__title, styles[`card__title-${theme}`])}>{title}</div>
			<Button action='delete' onClick={onButtonClick} />
		</div>
	</Link>
};

export default ProjectListItem;
