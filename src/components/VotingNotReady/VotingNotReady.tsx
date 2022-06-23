import React from 'react';
import Button from '../Button/Button';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import styles from './VotingNotReady.module.css';

type Props = {
	match: {
		params: {
			id: string
		}
	}
}

const VotingNotReady: React.FC<Props> = ({ match }) => {

	const auth = useAppSelector(state => state.firebase.auth);
	const projects = useAppSelector(state => state.firestore.data);

	const renderButtonNew = () => {
		if (projects.projects[match.params.id].owners[0] === auth.email) {
			return <Link className={styles.new} to={`/project/${match.params.id}/add_voting/`}><Button action="newBlack"></Button></Link>
		} else {
			return null
		}
	}

	return <div className={styles.wrapper}>
		<div className={styles.container}>
			<div className={styles.header}>
				<Link className={styles.exit} to={`/project/${match.params.id}`} ><Button action="exitBlack"></Button></Link>
				{renderButtonNew()}
				<div className={styles.title}>Нет голосований</div>
			</div>
		</div>
	</div >
};

export default VotingNotReady;