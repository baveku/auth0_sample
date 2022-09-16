/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useEffect, useState } from 'react'
import {
	NavigationContainer,
	useNavigationContainerRef,
} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AuthStack } from '@pages/auth'
import { useFlipper } from '@react-navigation/devtools'
import { StatusBar } from 'react-native'
import { I18nextProvider, useTranslation } from 'react-i18next'
import i18n from './tools/i18n'
import { StorageKey, UserWorkflowState } from '@storage'
import { RootStackParamList } from '@router'
import { useAppDispatch, useAppSelector } from '@hooks'
import { Provider, useDispatch } from 'react-redux'
import { store } from '@redux.store'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { LiveAnimationProvider } from '@components/live-dot-animation'
import { HomePage } from '@pages/home'
import { loginAuth0Thunk } from 'src/core/thunks'

const MainStack = createNativeStackNavigator<ReactNavigation.RootParamList>()

const App = () => {
	const routeNameRef = React.useRef<string>()
	const navigationRef = useNavigationContainerRef()
	const { t, i18n } = useTranslation()
	const dispatch = useAppDispatch()
	const userState = useAppSelector(state => state.user)

	const [isDark, setDark] = useState(false)

	useFlipper(navigationRef)
	const onReady = async () => {}

	const getInitialRoute = () => {
		let currentRouteName: keyof RootStackParamList = 'Home'
		return currentRouteName
	}

	return (
		<SafeAreaProvider>
			<NavigationContainer ref={navigationRef} onReady={onReady}>
				<StatusBar
					barStyle={isDark ? 'dark-content' : 'light-content'}
				/>
				<MainStack.Navigator
					screenOptions={{ headerShown: false }}
					initialRouteName={getInitialRoute()}
				>
					<MainStack.Screen name="Home" component={HomePage} />
					<MainStack.Group
						screenOptions={{ presentation: 'fullScreenModal' }}
					>
						<MainStack.Screen name="Auth" component={AuthStack} />
					</MainStack.Group>
				</MainStack.Navigator>
			</NavigationContainer>
		</SafeAreaProvider>
	)
}

function MainApp() {
	return (
		<Provider store={store}>
			{/**@ts-ignore */}
			<I18nextProvider i18n={i18n}>
				<LiveAnimationProvider>
					<App />
				</LiveAnimationProvider>
			</I18nextProvider>
		</Provider>
	)
}

export default MainApp
