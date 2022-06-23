import styles from './VotingAnswerNotReady.module.css';
import Button from '../Button/Button';
import cn from 'classnames';
import React, { useContext } from 'react';
import { updateProject } from '../../store/project/projectActions';
import { useFirestore } from 'react-redux-firebase';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { ThemeContext } from '../../App';

type Props = {
	title,
	id,
	projectId,
	voting
}

const VotingAnswerNotReady: React.FC<Props> = ({ title, id, projectId, voting }) => {

	const theme = useContext(ThemeContext);

	const firestore = useFirestore();
	const dispatch = useAppDispatch();
	const auth = useAppSelector(state => state.firebase.auth);

	const onVoteClick = () => {
		const newVotes = voting.votes ? { ...voting.votes, [auth.email]: id } : { [auth.email]: id };
		dispatch(updateProject({ firestore }, { id: projectId, changes: { voting: { ...voting, votes: newVotes } } }));
	}


	return <div className={styles.answer}>
		<div className={styles.answer__content}>
			<div className={cn(styles.answer__left, styles[`answer__left-${theme}`])}>
				{title}
			</div>
			<div className={cn(styles.answer__right)} onClick={onVoteClick}>
				<Button action='check'></Button>
			</div>
		</div>
	</div>

};

export default VotingAnswerNotReady;