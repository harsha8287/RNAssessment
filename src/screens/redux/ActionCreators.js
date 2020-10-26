/*
* Action Creators
* File contain all the action logic.
*
*/

import Base64 from '../../utils/Base64'

//some thunks to control the BLE Device

export const startScan = () => {
    return (dispatch, getState, DeviceManager) => {
        // you can use Device Manager here
        console.log("thunk startScan: ", DeviceManager);
        const subscription = DeviceManager.onStateChange((state) => {
            if (state === 'PoweredOn') {
                dispatch(scan());
                subscription.remove();
            }
        }, true);
      };
}

export const scan = () => {
    return (dispatch, getState, DeviceManager) => {
        //console.log("thunk Scan: ", DeviceManager);
        DeviceManager.startDeviceScan(null, null, (error, device) => {
            //this.setState({"status":"Scanning..."});
           // console.log("scanning...");
           dispatch(changeStatus("Scanning"));
          if (error) {
            console.log(error);
          }
          if(device !== null){
            dispatch(addBLE(device));
        }
        });
    }
}

export const connectDevice = (device) => {
    return (dispatch, getState, DeviceManager) => {
        //console.log('thunk connectDevice',device['BLE']);
        //this.setState({"status":"Connecting..."});
           // console.log("Connecting")
           dispatch(changeStatus("Connecting"));
           DeviceManager.stopDeviceScan()
           // this.device = device['BLE'];
            device.connect()
              .then((device) => {
                //this.setState({"status":"Discovering..."});
                //console.log("Discovering")
                dispatch(changeStatus("Discovering"));
                let characteristics = device.discoverAllServicesAndCharacteristics()
                console.log("characteristics:", characteristics);
                return characteristics;
              })
              .then((device) => {
                dispatch(changeStatus("Setting Notifications"));
                return device;
              })
              .then((device) => {
                dispatch(changeStatus("Listening"));
                dispatch(connectedDevice(device))
                return device;
              }, (error) => {
                console.log(this._logError("SCAN", error));
                //return null;
              })
    }
}

export const sendMessage = (message) => {
    return (dispatch, getState, DeviceManager) => {
        const state = getState();
        console.log("thunk send message: ", state.BLEs.connectedDevice);
        try {
            // this.info("Updating Device")
            let base64 = Base64.btoa(unescape(encodeURIComponent(newcolor)));
            let LEDResponse = state.BLEs.connectedDevice.writeCharacteristicWithResponseForService("00010000-89BD-43C8-9231-40F6E305F96D", "00010001-89BD-43C8-9231-40F6E305F96D", base64 )
            dispatch(changeStatus("Sending Message"));
            dispatch(changedColor(message));
            return true;
          } catch(error){
            console.log("update Error:", error)
            return false;
          }
    }
}

export const addBLE = (device) => ({
    type: "ADD_BLE",
    device
})

export const sentMessage = (msg) => ({
    type: "SENT_MESSAGE",
    message: msg
})

export const connectedDevice = (device) => ({
    type: "CONNECTED_DEVICE",
    connectedDevice: device
});

export const changeStatus = (status) => ({
    type: "CHANGE_STATUS",
    status: status
});