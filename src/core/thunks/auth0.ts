import { storage } from '@storage'
import { createAsyncThunk } from '@reduxjs/toolkit'
import Auth0, { Credentials, UserInfo } from 'react-native-auth0'
import Config from 'react-native-config'
import { RootState } from '@redux.store'
const auth0 = new Auth0({
	domain: Config.AUTH0_DOMAIN,
	clientId: Config.AUTH0_CLIENTID,
})

const loginAuth0Thunk = createAsyncThunk(
	'/auth/login',
	async ({}, thunkAPI) => {
		console.log('HAHAHAA')
		return auth0.webAuth.authorize({
			scope: 'openid profile email',
		})
	}
)

const syncUserInfoThunk = createAsyncThunk(
	'/users/info',
	async ({}, thunkAPI) => {
		const state = thunkAPI.getState() as RootState
		return auth0.auth.userInfo({ token: state.user.token.accessToken })
	}
)

export { loginAuth0Thunk, syncUserInfoThunk }
