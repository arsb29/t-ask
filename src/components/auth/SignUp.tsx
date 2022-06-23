import Button from '../Button/Button';
import styles from './auth.module.css';
import { Link } from 'react-router-dom';
import React, { useContext, useEffect, useState } from 'react';
import { signUp } from '../../store/auth/authActions'
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useFirebase, useFirestore } from 'react-redux-firebase';
import { ThemeContext } from '../../App';
import cn from 'classnames';

type Props = {
	accounts: Account[]
}

const SignUp: React.FC<Props> = () => {

	const firebase = useFirebase();
	const firestore = useFirestore();
	const authError = useAppSelector(state => state.auth.authError);
	const dispatch = useAppDispatch();
	const theme = useContext(ThemeContext);

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');

	useEffect(() => {
		document.title = 'Регистрация';
	}, [])


	const handelChange = (e) => {
		switch (e.target.id) {
			case 'email':
				setEmail(e.target.value);
				break;
			case 'password':
				setPassword(e.target.value);
				break;
			case 'firstName':
				setFirstName(e.target.value);
				break;
			case 'lastName':
				setLastName(e.target.value);
				break;
			default:
				break;
		}
	}

	const handelSubmit = (e) => {
		e.preventDefault();
		dispatch(signUp({ firebase, firestore }, { email, password, firstName, lastName }));
	}

	return <div className={styles.container}>
		<form onSubmit={handelSubmit} className={styles.form}>
			<input placeholder='Почта...' type="email" id="email" className={styles.form__input} onChange={handelChange} />
			<input placeholder='Пароль...' type="password" id="password" className={styles.form__input} onChange={handelChange} />
			<input placeholder='Имя...' type="text" id="firstName" className={styles.form__input} onChange={handelChange} />
			<input placeholder='Фамилия...' type="text" id="lastName" className={styles.form__input} onChange={handelChange} />
			{authError ? <div className={cn(styles.form__authError, styles[`form__authError-${theme}`])}>{authError}</div> : null}
			<div className={styles.form__buttons}>
				<Button action='withoutIcon' type={'submit'}>Зарегистрироваться</Button>
				<Link to='/signin' >
					<Button action='withoutIcon'>Вход</Button>
				</Link>
			</div>
		</form>
	</div>
};

export default SignUp;
