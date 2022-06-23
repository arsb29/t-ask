import React from 'react';
import SignIn from '../auth/SignIn';
import SignUp from '../auth/SignUp';
import { useAppSelector } from '../../hooks';
import { isLoaded } from "react-redux-firebase";
import { Redirect, Route, Switch } from 'react-router-dom';

type Props = {};

const NotLogin: React.FC<Props> = () => {

	const auth = useAppSelector(state => state.firebase.auth);
	if (auth.uid) return <Redirect to='/' />

	return !isLoaded(auth) ? <div>Загрузка</div> : <>
		<Switch>
			<Route path='/signup' component={SignUp}></Route>
			<Route path='/' component={SignIn}></Route>
		</Switch>
	</>
};

export default NotLogin;
