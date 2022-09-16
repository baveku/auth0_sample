import { useAppDispatch, useAppSelector } from '@hooks'
import React from 'react'
import { Pressable, Text, View } from 'react-native'
import { loginAuth0Thunk } from '@thunks'
import { StyleSheet } from 'react-native'
import { useMemo } from 'react'

const HomePage: React.FunctionComponent<{}> = props => {
	const userState = useAppSelector(state => state.user)
	const dispatch = useAppDispatch()
	const _onPress = async () => {
		console.log('HAHAHAA')
		dispatch(loginAuth0Thunk())
	}

	const _userInfo = useMemo(() => {
		const user = userState.user
		return (
			user && (
				<View style={styles.infoContainer}>
					<Text>{user.email}</Text>
					<Text>{user.familyName + user.givenName + user.name}</Text>
					<Text>{user.nickname}</Text>
					<Text>{user.picture}</Text>
					<Text>{user.email}</Text>
				</View>
			)
		)
	}, [userState.user])

	return (
		<View style={styles.container}>
			{_userInfo}
			<Pressable style={styles.button} onPress={_onPress}>
				<Text style={styles.buttonTitle}>
					{userState.state == 'authorized' ? 'Logout' : 'Login'}
				</Text>
			</Pressable>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1,
	},
	infoContainer: {
		flexDirection: 'row',
	},
	infoTitle: {
		color: 'black',
		fontSize: 14,
		textAlign: 'center',
		flexShrink: 1,
	},
	button: {
		backgroundColor: 'blue',
		padding: 4,
		width: 120,
		height: 40,
		alignItems: 'center',
		justifyContent: 'center',
	},
	buttonTitle: {
		color: 'white',
		fontWeight: '600',
	},
})

export { HomePage }
