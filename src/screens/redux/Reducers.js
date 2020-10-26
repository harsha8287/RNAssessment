/*
* Reducer
* Reducer file returns state.
*
*/
import * as ActionTypes from './ActionTypes';

const initialState = {
    BLEList: [], //An Array of Discovered Devices
    msg: 'BLE sample message', //the sample message 
    connectedDevice: {}, // the current connected BLE device
    status: 'disconnected' // the status of the BLE connection
}

export const BLEReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_BLE':
            if (state.BLEList.some(device => device.id === action.device.id) || !action.device.isConnectable || action.device.name === null) {
                return state;
            } else {
                const newBLE = [
                    ...state.BLEList,
                    action.device
                ]
                return {
                    BLEList: newBLE,
                    color: state.color,
                    connectedDevice: state.connectedDevice,
                    status: action.status
                };
            }
        case 'SENT_MESSAGE':
            return {
                BLEList: state.BLEList,
                msg: action.message,
                connectedDevice: state.connectedDevice,
                status: action.status
            };
        case 'CONNECTED_DEVICE':
            console.log("BLEReducer -> action -> Reducer connected device", action)
            return {
                BLEList: state.BLEList,
                color: state.color,
                connectedDevice: action.connectedDevice,
                status: action.status
            };
        case 'CHANGE_STATUS':
            console.log("BLEReducer -> action -> change status", action)
            return {
                BLEList: state.BLEList,
                color: state.color,
                connectedDevice: action.connectedDevice,
                status: action.status
            }
        default:
            return state;
    }
};