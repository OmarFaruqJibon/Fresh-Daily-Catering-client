import { combineReducers, createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from "redux-thunk"
import { rootReducer } from './rootReducer';

const finalReducer = combineReducers({
    rootReducer
});

const initialState = {
    rootReducer: {
        cartItems: localStorage.getItem("cartItems")
            ? JSON.parse(localStorage.getItem("cartItems"))
            : [],

    }
}
const middleware = [thunk]

const store = createStore(
    finalReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)


export default store;






