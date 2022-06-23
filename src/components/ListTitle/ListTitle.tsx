import Button from '../Button/Button';
import React, { useContext, useEffect, useState } from 'react';
import styles from './ListTitle.module.css';
import { useAppDispatch } from '../../hooks';
import ColorPicker from '../ColorPicker/ColorPicker';
import { deleteList, updateList } from '../../store/list/listActions';
import { useFirestore } from 'react-redux-firebase';
import { ThemeContext } from '../../App';
import cn from 'classnames';

type Props = {
	title: string,
	parentId: string,
	color: string
}

const ListTitle: React.FC<Props> = ({ title, parentId, color }) => {

	const theme = useContext(ThemeContext);

	const firestore = useFirestore();
	const dispatch = useAppDispatch();

	const [editing, setEditing] = useState<boolean>(false);
	const [listTitle, setlistTitle] = useState<string>(title);

	useEffect(() => {
		setlistTitle(title);
	}, [title])

	const handelChange = (e) => { setlistTitle(e.target.value) }

	const onButtonDeleteClick = (e) => {
		e.preventDefault();
		dispatch(deleteList({ firestore }, { listId: parentId }))
	}

	const onButtonEditClick = (e) => {
		e.preventDefault();
		setEditing(true);
	}

	const onButtonCheckClick = (e) => {
		e.preventDefault();
		if (listTitle !== '') {
			setEditing(false);
			dispatch(updateList({ firestore }, { listId: parentId, changes: { title: listTitle } }))
		}
	}

	const renderTitle = () => {
		if (editing) {
			return <input className={styles.list__title_editing} type="text" value={listTitle} id="listTitle" onChange={handelChange} />
		} else {
			return <div className={cn(styles.list__title_text, styles[`list__title_text-${theme}`])}>{listTitle}</div>
		}
	}

	const renderCheckEditButtons = () => {
		if (editing) {
			return <Button action='check' onClick={onButtonCheckClick} />
		} else {
			return <Button action='edit' onClick={onButtonEditClick} />
		}
	}

	return <div className={cn(styles.list__title, styles[`list__title-${theme}`])}>
		{renderTitle()}
		<div className={styles.list__title_buttons}>
			{renderCheckEditButtons()}
			<Button action='delete' onClick={onButtonDeleteClick} />
		</div>
		<ColorPicker id={parentId} oldColor={color} />
	</div >
};

export default ListTitle;
