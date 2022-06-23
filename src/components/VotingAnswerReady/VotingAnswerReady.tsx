import styles from './VotingAnswerReady.module.css';
import cn from 'classnames';
import React, { useContext } from 'react';
import { ThemeContext } from '../../App';

type Props = {
	title,
	perCent
}

const VotingAnswerReady: React.FC<Props> = ({ title, perCent }) => {

	const theme = useContext(ThemeContext);

	return <div className={styles.answer}>
		<div className={styles.answer__content}>
			<div className={cn(styles.answer__left, styles[`answer__left-${theme}`])}>
				{title}
			</div>
			<div className={cn(styles.answer__right)}>
				{perCent.toFixed(1)}%
			</div>
		</div>
	</div>

};

export default VotingAnswerReady;