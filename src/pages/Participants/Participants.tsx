import React, { useContext } from 'react';
import Button from '../../components/Button/Button';
import styles from './Participants.module.css';
import NewParticipant from '../../components/NewParticipant/NewParticipant';
import ParticipantsItem from '../../components/ParticipantsItem/ParticipantsItem';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../../App';
import cn from 'classnames';

type Props = {
	match: {
		params: {
			id: string
		}
	},
	people: string[],
	id: string
}

const Participants: React.FC<Props> = ({ people, id, match }) => {

	const theme = useContext(ThemeContext);

	return <div className={styles.wrapper}>
		<div className={styles.container}>
			<div className={cn(styles.content, styles[`content-${theme}`])}>
				<div className={cn(styles.title, styles[`title-${theme}`])}>Участники: {people.length}</div>
				{people && people.map((human) => {
					return <ParticipantsItem key={human} email={human} />
				})}
				<NewParticipant people={people} id={id} />
				<div className={styles.buttons}>
					<Link to={`/project/${match.params.id}`} ><Button action='withoutIcon'>Отмена</Button></Link>
				</div>
			</div>
		</div>
	</div>
};

export default Participants;