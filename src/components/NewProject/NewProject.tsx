import React, { useContext, useState } from 'react';
import cn from 'classnames';
import styles from './NewProject.module.css';
import Button from '../Button/Button';
import { createProject } from '../../store/project/projectActions';
import { useFirestore } from 'react-redux-firebase'
import { useAppDispatch } from '../../hooks';
import { ThemeContext } from '../../App';

type Props = {
	className: string
};

const NewProject: React.FC<Props> = ({ className }) => {

	const theme = useContext(ThemeContext);

	const firestore = useFirestore();
	const dispatch = useAppDispatch();
	const [newProject, setNewProject] = useState('');

	const handelChange = (e) => {
		switch (e.target.id) {
			case 'newProject':
				setNewProject(e.target.value)
				break;
			default:
				break;
		}
	}

	const handelSubmit = (e) => {
		e.preventDefault();
		if (newProject !== '') {
			dispatch(createProject({ firestore }, { title: newProject }));
			setNewProject('');
		}
	}

	return <div className={className}>
		<form onSubmit={handelSubmit} className={styles.card__content}>
			<input className={cn(styles.card__input, styles[`card__input-${theme}`], styles.card__title)} placeholder='Новый проект...' type="text" value={newProject} id="newProject" onChange={handelChange} />
			<Button action='new' type={'submit'}></Button>
		</form>
	</div>
};

export default NewProject;