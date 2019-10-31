import { createStore, combineReducers } from 'redux';

const modules = combineReducers({

});

const createReduxStore = () => createStore(modules);

export default createReduxStore;
