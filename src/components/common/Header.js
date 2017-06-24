import React from 'react'
import { Text, View } from 'react-native'

const Header = ({ children }) => {

	const { textStyle, viewStyle } = styles

	return (
		<View style={viewStyle}>
			<Text style={textStyle}>{ children }</Text>
		</View>
	)
}

const styles = {
	textStyle: {
		fontSize: 30
	},
	viewStyle: {
		backgroundColor:'#EEE7F9',
		justifyContent: 'center',
		alignItems: 'center',
		height: 60,
		elevation: 5,
		position: 'relative'
	}

}
export { Header }