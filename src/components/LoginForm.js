import React, {Component} from 'react';
import { Text } from 'react-native';
import firebase from 'firebase';
import { Card, CardSection, Button, Input, Spinner } from './common';

class LoginForm extends Component {

  state = { email: '', password: '', error: '', loading: false};

  onButtonPress() {
    const {email, password} = this.state;
    this.setState({ error: '', loading: true });
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(this.onLoginSuccess.bind(this))
      .catch(() => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(this.onLoginSuccess.bind(this))
          .catch(this.onLoginFail.bind(this));
      });
  }

  onLoginFail() {
    this.setState({ error: 'Authentication Failed', loading: false });
    this.renderButton();
  }

  onLoginSuccess() {
    this.setState({
      email: '',
      password: '',
      error: '',
      loading: false
    });
    this.renderButton();
  }

  renderButton() {
    if (this.state.loading) {
      return <Spinner sizr='small'/>
    }

    return(
      <Button
        buttonText="Login"
        onPress={this.onButtonPress.bind(this)}
      />
    );
  }

  render() {
    return (
      <Card>
        <CardSection>
          <Input
            placeholder = 'user@email.com'
            label = 'Email'
            value = {this.state.text}
            onChangeText = { email => this.setState({ email})}
          />
        </CardSection>

        <CardSection>
          <Input
            secureTextEntry
            placeholder = 'password'
            label = 'Password'
            value = {this.state.text}
            onChangeText = { password => this.setState({ password })}
          />
        </CardSection>

        <Text style={styles.errorTextStyle} >{this.state.error}</Text>

        <CardSection>
          { this.renderButton() }
        </CardSection>
      </Card>
    );
  }
}

const styles= {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
}

export default LoginForm;
