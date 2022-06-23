import cn from 'classnames';
import Button from '../Button/Button';
import styles from './Task.module.css';
import React, { useContext, useEffect, useState } from 'react';
import { useAppDispatch } from '../../hooks';
import { useFirestore } from 'react-redux-firebase';
import { deleteTask, updateTask } from '../../store/task/taskActions';
import { ThemeContext } from '../../App';

type TaskType = {
	id: number,
	title: string,
	done: boolean
}

type Props = {
	item: TaskType,
	className: string,
	listId: string
}


const Task: React.FC<Props> = ({ item, className, listId }) => {

	const theme = useContext(ThemeContext);

	const firestore = useFirestore();
	const dispatch = useAppDispatch();
	const [editing, setEditing] = useState<boolean>(false);
	const [itemTitle, setItemTitle] = useState(item.title);

	useEffect(() => {
		setItemTitle(item.title)
	}, [item])

	const handelChange = (e) => {
		switch (e.target.id) {
			case 'item':
				setItemTitle(e.target.value)
				break;
			default:
				break;
		}
	}

	const onButtonDeleteClick = (e) => {
		e.preventDefault();
		dispatch(deleteTask({ firestore }, { listId: listId, id: item.id }));
	}

	const onButtonEditClick = (e) => {
		e.preventDefault();
		setEditing(true);
	}

	const onButtonCheckClick = (e) => {
		e.preventDefault();
		if (itemTitle === item.title) {
			setEditing(false);
		}
		if (itemTitle !== '') {
			setEditing(false);
			dispatch(updateTask({ firestore }, { listId: listId, title: itemTitle, id: item.id, done: item.done }))
		}
	}

	const onTitleClick = () => {
		dispatch(updateTask({ firestore }, { listId: listId, title: itemTitle, id: item.id, done: !item.done }))
	}

	const renderTitle = () => {
		if (editing) {
			return <input className={styles.task__editing} type="text" value={itemTitle} id="item" onChange={handelChange} />
		} else {
			return <div onClick={onTitleClick} className={cn(styles.task__title, styles[`task__title-${theme}`], styles[`task__done-${item.done}`])}>{itemTitle}</div>
		}
	}

	const renderCheckEditButton = () => {
		if (editing) {
			return <Button action='check' onClick={onButtonCheckClick} />
		} else {
			return <Button action='edit' onClick={onButtonEditClick} />
		}
	}

	return <div className={className}>
		{renderTitle()}
		<div className={styles.buttons}>
			{renderCheckEditButton()}
			<Button action='delete' onClick={onButtonDeleteClick} />
		</div>
	</div>
};

export default Task;
