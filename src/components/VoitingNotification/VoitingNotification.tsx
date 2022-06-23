import React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { VoitingType } from '../../types';
import styles from './VoitingNotification.module.css';

type Props = {
	match,
	voting: VoitingType
}

const VoitingNotification: React.FC<Props> = ({ match, voting }) => {

	const auth = useAppSelector(state => state.firebase.auth);

	if (voting == null) { return null }
	if (voting.votes && Object.keys(voting.votes).includes(auth.email)) { return null }

	return <Link to={`/project/${match.params.id}/voting/`}>
		<div className={styles.container}>
			Новое голосование
		</div>
	</Link>
};

export default VoitingNotification;
