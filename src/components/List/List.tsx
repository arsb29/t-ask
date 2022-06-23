import cn from 'classnames';
import Task from '../Task/Task';
import styles from './List.module.css';
import Button from '../Button/Button';
import ListTitle from '../ListTitle/ListTitle';
import React, { useContext, useState } from 'react';
import { createTask } from '../../store/task/taskActions';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { isLoaded, useFirestore, useFirestoreConnect } from 'react-redux-firebase';
import { ThemeContext } from '../../App';

type Props = {
	title: string,
	color: string
	parentId: string,
}

const List: React.FC<Props> = ({ title, parentId, color }) => {

	const theme = useContext<string>(ThemeContext);

	useFirestoreConnect([{
		collection: "lists",
		doc: parentId,
		subcollections: [{
			collection: 'items',
			orderBy: [['createdAt', 'asc']]
		}],
		storeAs: `items-${parentId}`
	}]);

	const firestore = useFirestore();
	const items = useAppSelector(state => state.firestore.ordered[`items-${parentId}`]);
	const dispatch = useAppDispatch();

	const [newItem, setNewItem] = useState('');

	const handelChange = (e) => { setNewItem(e.target.value) };

	const handelSubmit = (e) => {
		e.preventDefault();
		if (newItem !== '') {
			dispatch(createTask({ firestore }, { listId: parentId, title: newItem }));
			setNewItem('');
		}
	}

	return !isLoaded(items) ? <div className={styles.loading} /> : <div className={styles.list}>
		<ListTitle title={title} parentId={parentId} color={color} />

		{items && items.map((element) => {
			return <Task key={element.id} item={element} listId={parentId} className={styles.task} />
		})}

		<form onSubmit={handelSubmit} className={styles.task}>
			<input className={cn(styles.task__input, styles[`task__input-${theme}`])} placeholder='Новый элемент...' type="text" value={newItem} id={`newItem-${parentId}`} onChange={handelChange} />
			<div>
				<Button action='new' type={'submit'}></Button>
			</div>
		</form>

	</div >
};

export default List;
