import Button from '../Button/Button';
import cn from 'classnames';
import React, { useContext, useState } from 'react';
import { useAppDispatch } from '../../hooks';
import { useFirestore } from 'react-redux-firebase';
import styles from './ProjectPageHeaderTitle.module.css';
import { updateProject } from '../../store/project/projectActions';
import { ThemeContext } from '../../App';

type Props = {
	title: string,
	id: string
}

const ProjectPageHeaderTitle: React.FC<Props> = ({ title, id }) => {

	const theme = useContext(ThemeContext);

	const firestore = useFirestore();
	const dispatch = useAppDispatch();

	const [editing, setEditing] = useState<boolean>(false);
	const [projectTitle, setProjectTitle] = useState<string>(title);

	const handelChange = (e) => { setProjectTitle(e.target.value) }

	const onButtonEditClick = (e) => {
		e.preventDefault();
		setEditing(true);
	}

	const onButtonCheckClick = (e) => {
		e.preventDefault();
		if (projectTitle !== '') {
			setEditing(false);
			dispatch(updateProject({ firestore }, { id, changes: { title: projectTitle } }))
		}
	}

	const renderTitle = () => {
		if (editing) {
			return <input className={cn(styles.project__text_editing)} type="text" value={projectTitle} id="projectTitle" onChange={handelChange} />
		} else {
			return <div className={cn(styles.project__text, styles[`project__text-${theme}`])}>{title}</div>
		}
	}

	const renderCheckEditButton = () => {
		if (editing) {
			return <Button action='check' onClick={onButtonCheckClick} />
		} else {
			return <Button action='edit' onClick={onButtonEditClick} />
		}
	}

	return <div className={styles.project__title}>
		{renderTitle()}
		{renderCheckEditButton()}
	</div>
};

export default ProjectPageHeaderTitle;