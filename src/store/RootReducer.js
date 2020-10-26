import { combineReducers } from 'redux';
import BLEReducer from '../screens/redux/Reducers';

const RootReducer = combineReducers({
    BLEs: BLEReducer
});

export default RootReducer;

