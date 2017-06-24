import React, { Component } from 'react';
import { Text } from 'react-native'
import { Button, Card, CardSection, Input, Spinner } from './common'
import firebase from 'firebase'

class LoginForm extends Component {
	state = {
		email: '',
		password: '',
		error:'',
		loading: false
	}

	onButtonPress() {
		const { email, password } = this.state
		this.setState({ error: '', loading:true})
		firebase.auth().signInWithEmailAndPassword(email, password)
			.then(this.onLoginSuccess.bind(this))
			.catch(() => {
				firebase.auth().createUserWithEmailAndPassword(email, password)
					.then(this.onLoginSuccess.bind(this))
					.catch(this.onLoginFailed.bind(this))
			})
	}

	onLoginSuccess() {
		this.setState({ 
			loading:false,
			email: '',
			password: '',
			error: '' 
		})
	}

	onLoginFailed(err) {
		this.setState({
			error:`Authentication Failed: ${err}`,
			loading:false
		})

	}

	renderButton() {
		if (this.state.loading) {
			return <Spinner />
		}
		return (
			<Button onPress={this.onButtonPress.bind(this)}>
				Login
			</Button>
		)
	}
	render() {
		return (
			<Card>
				<CardSection>
					<Input
						label= "Email"
						placeholder= "user@gmail.com"
						value={this.state.email}
						onChangeText={email => this.setState({email})}
					/>
				</CardSection>
				<CardSection>
					<Input
						secureTextEntry={true}
						label= "Password"
						placeholder= "password"
						value={this.state.password}
						onChangeText={password => this.setState({password})}
					/>
				</CardSection>
				<Text style={ styles.errorTextStyle}>
					{this.state.error}
				</Text>
				<CardSection>
					{ this.renderButton() }
				</CardSection>
			</Card>
		)
	}
}

const styles = {
	errorTextStyle: {
		fontSize: 20,
		alignSelf: 'center',
		color: 'red'
	}
}

export default LoginForm