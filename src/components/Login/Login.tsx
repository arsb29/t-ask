import React from 'react';
import Header from '../Header/Header';
import { useAppSelector } from '../../hooks';
import { isLoaded } from "react-redux-firebase";
import { Route, Switch } from 'react-router-dom';
import ProjectPage from '../../pages/ProjectPage/ProjectPage';
import AllProjectsPage from '../../pages/AllProjectsPage/AllProjectsPage';

type Props = {};

const Login: React.FC<Props> = () => {

	const auth = useAppSelector(state => state.firebase.auth);
	// if (!auth.uid) return <Redirect to='/signin' />

	return !isLoaded(auth) ? <div>Загрузка</div> : <>
		<Header></Header>
		<Switch>
			<Route path='/project/:id' component={ProjectPage}></Route>
			<Route path='/' component={AllProjectsPage}></Route>
		</Switch>
	</>
};

export default Login;
