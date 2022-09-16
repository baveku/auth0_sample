import { useAppDispatch, useAppSelector } from '@hooks'
import React from 'react'
import { Pressable, Text, View } from 'react-native'
import { auth0 } from '@thunks'
import { StyleSheet } from 'react-native'
import { useMemo } from 'react'
import { Alert } from 'react-native'
import { userSlice } from '@slices'

const HomePage: React.FunctionComponent<{}> = props => {
	const userState = useAppSelector(state => state.user)
	const dispatch = useAppDispatch()
	const _onLogin = async () => {
		try {
			const result = await auth0.webAuth.authorize({})
			dispatch(userSlice.actions.updateCredential(result))
			const userInfo = await auth0.auth.userInfo({
				token: result.accessToken,
			})
			dispatch(userSlice.actions.updateUserInfo(userInfo))
		} catch (err) {
			console.log(err)
		}
	}

	const _onLogout = async () => {
		try {
			await auth0.webAuth.clearSession({})
			dispatch(userSlice.actions.deleteCredential())
		} catch (err) {
			console.log(err)
		}
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
			<Pressable
				style={styles.button}
				onPress={() =>
					userState.status === 'unauthorized'
						? _onLogin()
						: _onLogout()
				}
			>
				<Text style={styles.buttonTitle}>
					{userState.status == 'authorized' ? 'Logout' : 'Login'}
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
		flexDirection: 'column',
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
