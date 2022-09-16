import {
	combineReducers,
	configureStore,
	Middleware,
	Slice,
} from '@reduxjs/toolkit'
import { homeSlice, userSlice } from '@slices'
import _ from 'lodash'
import { MMKV } from 'react-native-mmkv'
import thunk from 'redux-thunk'
const memStorage = new MMKV()
const reducers = combineReducers({
	home: homeSlice.reducer,
	user: userSlice.reducer,
})
const middlewares: Middleware[] = []

if (__DEV__) {
	const createDebugger = require('redux-flipper-colorized').default
	middlewares.push(createDebugger())
}

const onLoadPreloadState = () => {
	try {
		const appState = JSON.parse(memStorage.getString('APP_STATE'))
		return appState
	} catch {}

	return undefined
}

export const store = configureStore({
	reducer: reducers,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(middlewares).concat(thunk),
	preloadedState: onLoadPreloadState(),
})

const persistMem = _.debounce(
	function () {
		const currentState = store.getState()
		const stateStr = JSON.stringify(currentState)
		memStorage.set('APP_STATE', stateStr)
	},
	500,
	{ maxWait: 2000 }
)
store.subscribe(() => {
	persistMem()
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
