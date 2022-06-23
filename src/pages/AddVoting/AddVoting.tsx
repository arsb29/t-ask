import cn from 'classnames';
import { ThemeContext } from '../../App';
import { VoitingType } from '../../types';
import styles from './AddVoting.module.css';
import { Link, Redirect } from 'react-router-dom';
import Button from '../../components/Button/Button';
import { useFirestore } from 'react-redux-firebase';
import React, { useContext, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { updateProject } from '../../store/project/projectActions';

type Props = {
	match: {
		params: {
			id: string
		}
	},
	voting: VoitingType
}

const AddVoting: React.FC<Props> = ({ match, voting }) => {

	const theme = useContext(ThemeContext);

	const firestore = useFirestore();
	const dispatch = useAppDispatch();

	const auth = useAppSelector(state => state.firebase.auth);
	const projects = useAppSelector(state => state.firestore.data);

	const [currentId, setCurrentId] = useState(1);
	const [currentAnswers, setCurrentAnswers] = useState({});
	const [question, setQuestion] = useState('');


	const renderAnswers = () => {
		return Object.keys(currentAnswers).map((answerId) => {
			return <div className={styles.row} key={answerId} id={answerId}>
				<input className={styles.block__input} value={currentAnswers[answerId]} placeholder='Введите ответ' type="text" onChange={handleChange} />
				<Button action='delete' onClick={deleteAnswer} />
			</div>
		})
	}

	const deleteAnswer = (e) => {
		const newObject = { ...currentAnswers };
		delete newObject[e.target.parentNode.id];
		setCurrentAnswers(newObject);
	}

	const addAnswer = (e) => {
		e.preventDefault();
		const newObject = { ...currentAnswers, [currentId]: '' };
		setCurrentAnswers(newObject);
		const newId = currentId + 1;
		setCurrentId(newId);
	}

	const handleChange = (e) => {
		const newObject = { ...currentAnswers, [e.target.parentNode.id]: e.target.value };
		setCurrentAnswers(newObject);
	}

	const handleChangeQuestion = (e) => {
		setQuestion(e.target.value);
	}

	const saveButtonClick = () => {
		const finalAnswers = Object.values(currentAnswers).filter(answer => answer !== '');
		const answers = {};
		finalAnswers.forEach((x, index) => { answers[index] = x });
		if (finalAnswers.length > 0 && question !== '') {
			dispatch(updateProject({ firestore }, { id: match.params.id, changes: { voting: { question, answers: answers } } }));
			setCurrentAnswers({});
			setQuestion('');
		}
	}

	if (voting) { return <Redirect to={`/project/${match.params.id}/voting`} /> }
	if (projects.projects[match.params.id].owners[0] !== auth.email) {
		return <Redirect to={`/project/${match.params.id}/voting`} />
	}

	return <div className={styles.wrapper}>
		<div className={cn(styles.container, styles[`container-${theme}`])}>
			<div className={styles.content}>
				<div className={cn(styles.title, styles[`title-${theme}`])}>
					Конструктор голосования
				</div>
				<div className={styles.block}>
					<div className={styles.block__header}>
						<div className={cn(styles.block__title, styles[`block__title-${theme}`])}>Вопрос</div>
					</div>
					<input value={question} onChange={handleChangeQuestion} className={styles.block__input} placeholder='Введите вопрос' type="text" />
				</div>
				<div className={styles.block}>
					<div className={styles.block__header}>
						<div className={cn(styles.block__title, styles[`block__title-${theme}`])}>Ответы</div>
						<Button action='new' onClick={addAnswer}></Button>
					</div>
					{renderAnswers()}
				</div>
				<div className={styles.buttons}>
					<Button action='without' onClick={saveButtonClick}>Сохранить</Button>
					<Link to={`/project/${match.params.id}`} ><Button action='without'>Отмена</Button></Link>
				</div>
			</div>
		</div>
	</div>
};

export default AddVoting;