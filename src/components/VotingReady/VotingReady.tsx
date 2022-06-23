import cn from 'classnames';
import Button from '../Button/Button';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../../App';
import React, { useContext } from 'react';
import styles from './VotingReady.module.css';
import { useFirestore } from 'react-redux-firebase';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { updateProject } from '../../store/project/projectActions';
import VotingAnswerReady from '../VotingAnswerReady/VotingAnswerReady';
import VotingAnswerNotReady from '../VotingAnswerNotReady/VotingAnswerNotReady';
import { VoitingType } from '../../types';

type Props = {
	match: {
		params: {
			id: string
		}
	},
	voting: VoitingType
}

const VotingReady: React.FC<Props> = ({ voting, match }) => {

	const theme = useContext<string>(ThemeContext);

	const firestore = useFirestore();
	const dispatch = useAppDispatch();
	const auth = useAppSelector(state => state.firebase.auth);
	const projects = useAppSelector(state => state.firestore.data);

	const renderNotReadyAnswers = () => {
		return Object.keys(voting.answers).map((element) => {
			return <VotingAnswerNotReady
				voting={voting}
				projectId={match.params.id}
				key={element}
				title={voting.answers[element]}
				id={element} />
		})
	}

	const renderReadyAnswers = () => {
		const counts: string[] = Object.values(voting.votes);
		const countsLength: number = counts.length;
		return Object.keys(voting.answers).map((element) => {
			return <VotingAnswerReady
				key={element}
				title={voting.answers[element]}
				perCent={counts.filter(x => x === element).length / countsLength * 100}
			/>
		})
	}

	const renderAnswers = () => {
		if (voting.votes == null) { return renderNotReadyAnswers(); }
		return Object.keys(voting.votes).includes(auth.email) ? renderReadyAnswers() : renderNotReadyAnswers();
	}

	const renderButtonDelete = () => {
		if (projects.projects[match.params.id].owners[0] === auth.email) {
			return <div className={styles.delete} ><Button action="deleteBlack" onClick={onButtonDeleteClick} /></div>
		} else {
			return null
		}
	}

	const onButtonDeleteClick = () => {
		dispatch(updateProject({ firestore }, { id: match.params.id, changes: { voting: null } }));
	}

	return <div className={styles.wrapper}>
		<div className={styles.container}>
			<div className={styles.header}>
				<Link className={styles.exit} to={`/project/${match.params.id}`} ><Button action="exitBlack"></Button></Link>
				{renderButtonDelete()}
				<div className={styles.title}>
					{voting.question}
				</div>
				<div className={styles.howManyVoted}>Голосов {(voting.votes && Object.keys(voting.votes).length) || 0} / {projects.projects[match.params.id].owners.length}</div>
			</div>
			<div className={cn(styles.content, styles[`content-${theme}`])}>
				<div className={styles.flex}>
					{renderAnswers()}
				</div>
			</div>
		</div>
	</div >
};

export default VotingReady;