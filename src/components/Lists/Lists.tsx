import React from 'react';
import { ListType } from '../../types';
import styles from './Lists.module.css';
import List from '../../components/List/List';

type Props = {
	lists: ListType[];
}

const Lists: React.FC<Props> = ({ lists }) => {


	return <div className={styles.project__lists}>
		{lists && lists.map((element) => {
			return <List key={element.id} {...element} parentId={element.id} />
		})}
	</div>
};

export default Lists;