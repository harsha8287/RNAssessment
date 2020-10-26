/**
 * Customer screen
 * displays placeholder to enter and send message via bluetooth
 * @format
 * @flow
 */


import React, { Component } from 'react';
import { Text, StyleSheet, View, TextInput, TouchableOpacity, Alert, FlatList, Image } from 'react-native';
import DbService from '../data/DbService';
import QuestionModel from '../data/Model';
import i18n from '_locales/i18n';

export default class CustomerScreen extends Component {

  state = {
    question: '',
    allQuestions: []
  }

  componentDidMount() {
    //GETTING ALL QUESTIONS FROM DB
    DbService.getAll().then((response) => {
      this.setState({ ...this.state, allQuestions: response })
    }).catch((error) => {
      Alert.alert(i18n.t('customer_screen.alert_unable_to_render'))
    })

    {/* Header Button */ }
    let headerButton = <TouchableOpacity onPress={() => {
      if (this.state.question != '') {
        DbService.getRows().then((response) => {
          let pk = response + 1;
          DbService.save(new QuestionModel(pk, this.state.question, false)).then((response) => {
            this.setState({ ...this.state, question: "" })
            this.textInput.clear()
            Alert.alert(i18n.t('customer_screen.alert_question_sent'))
          }).catch((error) => {
            Alert.alert(i18n.t('customer_screen.alert_something_wrong'))
          })
        }).catch((error) => {
          Alert.alert(i18n.t('customer_screen.alert_something_wrong'))
        })
      } else {
        Alert.alert(i18n.t('customer_screen.alert_enter_question'))
      }

    }}>
      <Text style={styles.btn_send}>{i18n.t('customer_screen.btn_send')}</Text>
    </TouchableOpacity>;

    this.props.navigation.setOptions({
      headerRight: () => (
        headerButton
      )
    })

  }

  handleTextInput = (text) => {
    this.setState({ ...this.state, question: text })
  }

  //LIST CHILD ITEM
  renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.question}</Text>
      {item.sent_status ? <Image source={require('_assets/images/circle_green.png')} style={styles.status_circle} /> : <Image source={require('_assets/images/circle_red.png')} style={styles.status_circle} />}
    </View>
  );

  render() {
    return (
      <View style={styles.MainContainer}>
        <TextInput
          ref={input => { this.textInput = input }}
          style={styles.TextInputStyleClass}
          underlineColorAndroid="transparent"
          placeholder={"Ask your question here"}
          placeholderTextColor={"#9E9E9E"}
          numberOfLines={10}
          multiline={true}
          onChangeText={this.handleTextInput}
        />
        <FlatList
          data={this.state.allQuestions}
          renderItem={this.renderItem}
          keyExtractor={item => item.id}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    margin: 20
  },
  TextInputStyleClass: {
    textAlign: 'center',
    height: 50,
    borderWidth: 2,
    borderColor: '#9E9E9E',
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    height: 150

  }, item: {
    backgroundColor: '#ffffff',
    padding: 6,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: 'row'
  },
  title: {
    fontSize: 10,
    color: '#000000',
    flex: 1
  },
  status_circle: {
    width: 15,
    height: 15,
    marginRight: 10
  },
  btn_send: {
    color: '#FFFFFF',
    marginRight: 10,
    fontSize: 18
  }
});
