
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Card, CardSection, Spinner } from './components/common';
import LoginForm from './components/LoginForm';


class App extends Component {
  state = {loggedIn: null};
  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyD84MwYg-tl-M41ybT16KVj23HnehpI2HQ',
      authDomain: 'authentication-bcf02.firebaseapp.com',
      databaseURL: 'https://authentication-bcf02.firebaseio.com',
      projectId: 'authentication-bcf02',
      storageBucket: 'authentication-bcf02.appspot.com',
      messagingSenderId: '446390467323'
    });

    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        this.setState({ loggedIn: true});
      }else {
        this.setState({ loggedIn: false});
      }

    });
  }

  renderContent() {

    switch(this.state.loggedIn) {
      case true:
        return (
          <Card>
            <CardSection>
              <Button
                buttonText='Logout'
                onPress = {() => firebase.auth().signOut()}
              />
            </CardSection>
          </Card>
        );
      case false:
        return <LoginForm />;
      default:
        return <Spinner size='large' />;
    }
    if(this.state.loggedIn){
      return (
        <Card>
          <CardSection>
            <Button buttonText='Logout' />
          </CardSection>
        </Card>
      );
    }

    return <LoginForm />

  }

  render() {
    return (
      <View>
        <Header headerText="Authentication" />
        {this.renderContent()}
      </View>
    );
  }
}

export default App;
