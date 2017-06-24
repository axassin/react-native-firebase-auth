import React, { Component } from 'react'
import { View } from 'react-native'
import firebase from 'firebase'
import { Header, Button, CardSection, Spinner } from './components/common';
import LoginForm from './components/LoginForm'

class App extends Component {

	state = {
		loggedIn: null
	}

	componentWillMount() {
		firebase.initializeApp({
			apiKey: "AIzaSyBfi2d02a8ttOFhdDO7FnyX_HFtR7K6HtA",
			authDomain: "react-native-auth-64864.firebaseapp.com",
			databaseURL: "https://react-native-auth-64864.firebaseio.com",
			projectId: "react-native-auth-64864",
			storageBucket: "react-native-auth-64864.appspot.com",
			messagingSenderId: "18631425493"
		})

		firebase.auth().onAuthStateChanged((user) => {
			if(user) {
				this.setState({ loggedIn:true })
			} else {
				this.setState({ loggedIn:false })
			}
		})
	}

	renderContent() {
		switch (this.state.loggedIn) {
			case true:
				return (
					<CardSection>
						<Button>
							Logout
						</Button>
					</CardSection>
				)
			case false:
				return <LoginForm />
			default:
				return (
					<View>
						<Spinner />
					</View>
				) 
			
		}
	}
	render() {
		return (
			<View>
				<Header>Authentication</Header>
				{this.renderContent()}
			</View>
		)
	}
}

export default App;