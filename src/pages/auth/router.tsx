import LoginScreen from './login'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AuthParamList } from '@router'
import React from 'react'
const Stack = createNativeStackNavigator<AuthParamList>()
export default function AuthStack() {
	return (
		<Stack.Navigator>
			<Stack.Screen name="Login" component={LoginScreen} />
		</Stack.Navigator>
	)
}
