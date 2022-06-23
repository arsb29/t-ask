import cn from 'classnames';
import styles from './App.module.css';
import React, { useState } from 'react';
import { useAppSelector } from './hooks';
import Login from './components/Login/Login';
import Button from './components/Button/Button';
import { isLoaded } from "react-redux-firebase";
import NotLogin from './components/NotLogin/NotLogin';

const themes = {
	light: 'light',
	dark: 'dark',
};

export const ThemeContext = React.createContext(
	themes.light
);

type Props = {};

const App: React.FC<Props> = () => {

	const [theme, setTheme] = useState<string>(localStorage.taskAppTheme || 'light');

	const auth = useAppSelector(state => state.firebase.auth);
	// if (!auth.uid) return <Redirect to='/signin' />

	const nextPage = () => {
		return !auth.uid ? <NotLogin /> : <Login />;
	}

	const toggleContext = () => {
		theme === 'light' ? localStorage.setItem('taskAppTheme', 'dark') : localStorage.setItem('taskAppTheme', 'light');
		setTheme(localStorage.taskAppTheme);
	}

	return <ThemeContext.Provider value={theme} >
		<div className={cn(styles.wrapper, styles[`wrapper-${theme}`])} >
			<div className={styles.container}>
				{!isLoaded(auth) ? <div className={styles.loading} /> : nextPage()}
			</div>
			<div className={styles.helpers}>
				<Button onClick={toggleContext} action='theme'></Button>
			</div>
		</div>
	</ThemeContext.Provider >
};

export default App;
