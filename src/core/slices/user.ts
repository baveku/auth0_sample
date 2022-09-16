import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Credentials, UserInfo } from 'react-native-auth0'

type AuthState = 'unauthorized' | 'authorized'

export interface UserState {
	user?: UserInfo
	token?: Credentials
	status: AuthState
}

const initialState: UserState = {
	status: 'unauthorized',
}

const userSlice = createSlice({
	name: 'USER_STATE',
	initialState,
	reducers: {
		updateCredential(state, action: PayloadAction<Credentials>) {
			state.token = action.payload
			state.status = 'authorized'
		},
		deleteCredential(state) {
			state.status = 'unauthorized'
			state.user = undefined
			state.token = undefined
		},
		updateUserInfo(state, action: PayloadAction<UserInfo>) {
			state.user = action.payload
		},
	},
})

export { userSlice }
