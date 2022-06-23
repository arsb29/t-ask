import React, { useContext } from 'react';
import cn from 'classnames'
import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import { signOut } from '../../store/auth/authActions';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useFirebase } from 'react-redux-firebase';
import { ThemeContext } from '../../App';



const Header: React.FC<{}> = () => {

	const theme = useContext(ThemeContext);
	const firebase = useFirebase();
	const dispatch = useAppDispatch();

	const auth = useAppSelector(state => state.firebase.auth);
	const profile = useAppSelector(state => state.firebase.profile);
	// console.log(auth)

	const loginLinks = () => {
		return <>
			<Link to='/' className={cn(styles.header__link, styles[`header__link-${theme}`])}>Все проекты</Link>
			<Link to='/singin' onClick={() => { dispatch(signOut({ firebase })) }} className={cn(styles.header__link, styles[`header__link-${theme}`])}>Выйти</Link>
		</>
	}

	const notLoginLinks = () => {
		return <>
			<Link to='/signin' className={cn(styles.header__link, styles[`header__link-${theme}`])}>Войти</Link>
			<Link to='/signup' className={cn(styles.header__link, styles[`header__link-${theme}`])}>Регистрация</Link>
		</>
	}

	const currentLinks = auth.uid ? loginLinks() : notLoginLinks();

	return <div className={styles.header__container}>
		<div className={styles.header__user}>
			<div className={styles.header__icon}>{profile.initials}</div>
			<div className={cn(styles.header__name, styles[`header__name-${theme}`])}>{profile.firstName} {profile.lastName}</div>
		</div>

		<div className={styles.header__menu}>
			{currentLinks}
		</div>
	</div>
};

export default Header;
