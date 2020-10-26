# RNTask
React Native BLE Assessment

### Getting Started

### Requirements

Node 8 or greater is required. Development for iOS requires a Mac and Xcode 11 or up, and will target iOS 12 and up.

You also need to install the dependencies required by React Native:
- [Android development](https://reactnative.dev/docs/getting-started.html#installing-dependencies-3)
- [iOS development](https://reactnative.dev/docs/getting-started.html#installing-dependencies-3)

### Running the project
- Clone or Download the project from Github and unzip the file if downloaded
- Open the project in terminal
- Assuming you have all the requirements installed, you can setup and run the project by running:
- Inside root directory of the project 
```sh
$ npm install or yarn 
```

### iOS


Install pod dependencies
```sh
$ cd ios/
$ pod install
$ cd ..
```
Run iOS the project using below
```sh
$ yarn ios 'or' react-native run-ios
```
### Android

only the first time you run the project, you need to generate a debug key with:
```sh
$ cd android/app
$ keytool -genkey -v -keystore debug.keystore -storepass android -alias androiddebugkey -keypass android -keyalg RSA -keysize 2048 -validity 10000
$ cd ../..
```

Run android the project using below
```sh
$ yarn ios 'or' react-native run-ios
```


### Screenshots:

- Image 1: Home screen 

![alt text]()

- Image 2: Detail Screen

![alt text]()


### Build with

 - [ReactJS](https://reactjs.org/docs/getting-started.html) - The JavaScript Library used
 - [React Native](https://reactnative.dev/) - UI Framework
 - [NPM](https://www.npmjs.com/get-npm) - Package Manager
 - [Visual Studio Code](https://code.visualstudio.com/) - IDE
 

License
----

MIT



