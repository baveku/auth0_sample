import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Credentials, UserInfo } from 'react-native-auth0'
import { loginAuth0Thunk, syncUserInfoThunk } from '@thunks'

type AuthState = 'unauthorized' | 'authorized'

export interface UserState {
	user?: UserInfo
	token?: Credentials
	state: AuthState
}

const initialState: UserState = {
	state: 'unauthorized',
}

const userSlice = createSlice({
	name: 'USER_STATE',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(loginAuth0Thunk.fulfilled, (state, action) => {
				state.token = action.payload
				state.state = 'authorized'
			})
			.addCase(syncUserInfoThunk.fulfilled, (state, action) => {
				state.user = action.payload
			})
	},
})

export { userSlice }
