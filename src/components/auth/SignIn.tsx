import Button from '../Button/Button';
import cn from 'classnames';
import styles from './auth.module.css';
import { Link } from 'react-router-dom';
import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useFirebase } from 'react-redux-firebase';
import { signIn } from '../../store/auth/authActions';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { ThemeContext } from '../../App';

type Props = {
}

const SignIn: React.FC<Props> = () => {

	const firebase = useFirebase();
	const authError = useAppSelector(state => state.auth.authError);
	const dispatch = useAppDispatch();
	const theme = useContext(ThemeContext);

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	useEffect(() => {
		document.title = 'Вход';
	}, [])

	const auth = useAppSelector(state => state.firebase.auth);
	if (auth.uid) return <Redirect to='/' />

	const handelChange = (e) => {
		switch (e.target.id) {
			case 'email':
				setEmail(e.target.value);
				break;
			case 'password':
				setPassword(e.target.value);
				break;
			default:
				break;
		}
	}

	const handelSubmit = (e) => {
		e.preventDefault();
		dispatch(signIn({ firebase }, { email, password }));
	}

	return <div className={styles.container}>
		<form onSubmit={handelSubmit} className={styles.form}>
			<input placeholder='Почта...' type="email" id="email" className={styles.form__input} onChange={handelChange} />
			<input placeholder='Пароль...' type="password" id="password" className={styles.form__input} onChange={handelChange} />
			{authError ? <div className={cn(styles.form__authError, styles[`form__authError-${theme}`])}>{authError}</div> : null}
			<div className={styles.form__buttons}>
				<Button action='withoutIcon' type={'submit'}>Войти</Button>
				<Link to='/signup' >
					<Button action='withoutIcon'>Регистрация</Button>
				</Link>
			</div>
		</form>
	</div>
};

export default SignIn;
