import { useContext } from 'react';
import { ThemeContext } from '../../App';
import cn from 'classnames';
import { Project } from '../../types'
import styles from './AllProjectsPageHeader.module.css';

type Props = {
	projects: Project[]
};

const AllProjectsPageHeader: React.FC<Props> = ({ projects }) => {

	const theme = useContext(ThemeContext);

	return <div className={styles.projects__header} >
		<div className={cn(styles.projects__title, styles[`projects__title-${theme}`])}>Доступные проекты</div>
		<div className={cn(styles.projects__info, styles[`projects__info-${theme}`])}>Количество: {projects && projects.length}</div>
	</div >
};

export default AllProjectsPageHeader;