import {applyMiddleware, createStore} from "redux"
import reducers from './index'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension';


export default function configureStore (){
    const store = createStore(reducers,
    composeWithDevTools(applyMiddleware(thunk,logger))

);    

        return store;   
}

