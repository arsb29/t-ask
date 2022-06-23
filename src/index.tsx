import './index.css';
import App from './App';
import thunk from 'redux-thunk';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import firebase from './config/fbConfig';
import rootReducer from './store/rootReducer';
import { createStore, applyMiddleware } from 'redux';
import { createFirestoreInstance } from 'redux-firestore';
import { BrowserRouter as Router } from 'react-router-dom';
import { composeWithDevTools } from 'redux-devtools-extension';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import React from 'react';

const composeEnhancers = composeWithDevTools({});

export const store = createStore<any, any, any, any>(
	rootReducer,
	composeEnhancers(applyMiddleware(thunk))
);
// store.subscribe(() => { console.log(store.getState()) });

const rrfProps = {
	firebase,
	config: { useFirestoreForProfile: true, userProfile: 'users', },
	dispatch: store.dispatch,
	createFirestoreInstance
}

ReactDOM.render(
	<Router>
		<Provider store={store}>
			<ReactReduxFirebaseProvider {...rrfProps}>
					<App />
			</ReactReduxFirebaseProvider>
		</Provider>
	</Router>,
	document.getElementById('root'));