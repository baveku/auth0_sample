import {
	CompositeScreenProps,
	StackActions,
	useNavigation,
} from '@react-navigation/core'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { AuthParamList, RootStackParamList } from '@router'
import React, { useState } from 'react'
import { Button, Pressable, StyleSheet, Text, View } from 'react-native'

type Props = CompositeScreenProps<
	NativeStackScreenProps<AuthParamList, 'Login'>,
	NativeStackScreenProps<RootStackParamList>
>

function LoginScreen() {
	const navigation = useNavigation()

	const onPressDismiss = () => {
		navigation.goBack()
	}

	return (
		<View style={styles.container}>
			<Text></Text>
			<Pressable style={styles.logoutBtn} onPress={onPressDismiss}>
				<Text style={styles.logoutTitle}>Logout</Text>
			</Pressable>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	logoutBtn: {},
	logoutTitle: {},
})

export default LoginScreen
