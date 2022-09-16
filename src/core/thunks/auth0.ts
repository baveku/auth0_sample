import { storage } from '@storage'
import { createAsyncThunk } from '@reduxjs/toolkit'
import Auth0, { Credentials, UserInfo } from 'react-native-auth0'
import Config from 'react-native-config'
import { RootState } from '@redux.store'
export const auth0 = new Auth0({
	domain: Config.AUTH0_DOMAIN,
	clientId: Config.AUTH0_CLIENTID,
})
