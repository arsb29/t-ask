import Button from '../Button/Button';
import { useAppDispatch } from '../../hooks';
import React, { useContext, useEffect } from 'react';
import styles from './ProjectPageHeader.module.css';
import { createList } from '../../store/list/listActions';
import { useFirestore } from 'react-redux-firebase';
import ProjectPageHeaderTitle from '../ProjectPageHeaderTitle/ProjectPageHeaderTitle';
import { ThemeContext } from '../../App';
import cn from 'classnames'

type Props = {
	lists,
	project
}

const ProjectPageHeader: React.FC<Props> = ({ lists, project }) => {

	const theme = useContext(ThemeContext);

	const firestore = useFirestore();
	const dispatch = useAppDispatch();

	useEffect(() => {
		document.title = 'Проект - ' + project.title;
	}, [project])

	const onButtonAddListClick = (e) => {
		e.preventDefault();
		dispatch(createList({ firestore }, { parent: project.id }))
	}

	return <div className={styles.project__header}>
		<ProjectPageHeaderTitle title={project.title} id={project.id} />
		<div className={styles.project__info}>
			<div className={cn(styles.project__count, styles[`project__count-${theme}`])}>Количество списков: {lists && lists.length}</div>
			<Button action='new' onClick={onButtonAddListClick}></Button>
		</div>
	</div>
};

export default ProjectPageHeader;