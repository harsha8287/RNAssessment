import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import RootReducer from './RootReducer';
import { BleManager, BleError } from 'react-native-ble-plx';
import thunk from 'redux-thunk';

const logger = createLogger({ collapsed: true })

const DeviceManager = new BleManager();

export const ConfigureStore = () => {
    const store = createStore(RootReducer, applyMiddleware(thunk.withExtraArgument(DeviceManager)));
    return store;
}
