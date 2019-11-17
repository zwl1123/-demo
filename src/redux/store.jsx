//redux最核心的管理对象
import {createStore,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import reducer from './reducers'

export default createStore(reducer,composeWithDevTools(applyMiddleware(thunk)))

//这个store的核心管理对象需要什么？
//
