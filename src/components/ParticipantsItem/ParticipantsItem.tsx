import { useContext } from 'react';
import { ThemeContext } from '../../App';
import styles from './ParticipantsItem.module.css';
import cn from 'classnames';

type Props = {
	email: string,
}

const ParticipantsItem: React.FC<Props> = ({ email }) => {

	const theme = useContext(ThemeContext);

	return <div className={styles.row}>
		<div className={styles.icon}>{email[0]}</div>
		<div className={cn(styles.email, styles[`email-${theme}`])}>{email}</div>
	</div>
};

export default ParticipantsItem;
