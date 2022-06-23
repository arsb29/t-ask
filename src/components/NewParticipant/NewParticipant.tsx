import Button from '../Button/Button';
import cn from 'classnames';
import { debounce } from "debounce";
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useAppDispatch } from '../../hooks';
import { useFirestore } from 'react-redux-firebase';
import styles from './NewParticipant.module.css';
import { updateProject } from '../../store/project/projectActions';
import { ThemeContext } from '../../App';

type Props = {
	people: string[],
	id: string
}

const NewParticipant: React.FC<Props> = ({ people, id }) => {

	const theme = useContext(ThemeContext);

	const firestore = useFirestore();
	const dispatch = useAppDispatch();
	const [newParticipantEmail, setNewParticipantEmail] = useState<string>('');
	const [loading, setLoading] = useState(false);
	const [isPossibleToAdd, setIsPossibleToAdd] = useState(false);
	const [response, setResponse] = useState<string>('');

	useEffect(() => {
		setResponse('');
		setIsPossibleToAdd(false);
		if (newParticipantEmail === '') { return }
		if (people.includes(newParticipantEmail)) { setResponse('Пользователь уже в проекте'); return }
		const fetchEmails = debounce(async () => {
			setLoading(true);
			const respose: any = await firestore.get({
				collection: 'users',
				where: ['email', '==', newParticipantEmail],
				limit: 1
			})
			if (respose.empty) {
				setResponse('Пользователь не найден');
			} else {
				setIsPossibleToAdd(true);
				setResponse('Пользователь найден');
			}
			setLoading(false);
		}, 1000)
		fetchEmails();
		return () => {
			fetchEmails.clear();
		}
	}, [firestore, newParticipantEmail, people])

	const handelChange = useCallback((e) => {
		setNewParticipantEmail(e.target.value);
	}, [])

	const onButtonNewClick = () => {
		if (newParticipantEmail !== '' && isPossibleToAdd) {
			dispatch(updateProject({ firestore }, { id, changes: { owners: [...people, newParticipantEmail] } }));
			setNewParticipantEmail('');
		}
	}

	return <div>
		<div className={styles.row}>
			<Button action='new' onClick={onButtonNewClick} />
			<input type='email' className={cn(styles.input, styles[`input-${theme}`])} placeholder='user@mail.ru' value={newParticipantEmail} id="newParticipantEmail" onChange={handelChange} />
		</div>
		<div className={cn(styles.response, styles[`response-${theme}`])}>{loading ? ' Загрузка' : response}</div>
	</div>
};

export default NewParticipant;