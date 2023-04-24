// import { createStore, combineReducers, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';
// import authReducer from './reducers/authReducer';

// const rootReducer = combineReducers({
//   auth: authReducer,
// });

// const store = createStore(rootReducer, applyMiddleware(thunk));

// export default store;
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';
import thunk from 'redux-thunk';

const store = configureStore({
    reducer: {
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
    devTools: process.env.NODE_ENV !== 'production',
});

export default store;
