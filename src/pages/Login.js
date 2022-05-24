import React, { Component } from 'react';
import PropTypes from 'prop-types';
import logo from '../trivia.png';
import '../App.css';
import { fetchToken, fetchGravatar } from '../redux/actions/fetchAPI';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      name: '',
      isDisabled: true,
    };
  }

  verifyDisabled = () => {
    const { email, name } = this.state;
    if (email.length > 0 && name.length > 0) {
      this.setState({
        isDisabled: false,
      });
    }
  }

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    }, () => {
      this.verifyDisabled();
    });
  };

  handleLogin = async () => {
    const { history } = this.props;
    const { name, email } = this.state;
    const tokenAPI = await fetchToken();
    const gravatarAPI = fetchGravatar(email);
    const localSt = [{
      name,
      score: 0,
      picture: gravatarAPI,
    }];
    localStorage.setItem('token', tokenAPI.token);
    localStorage.setItem('ranking', JSON.stringify(localSt));
    history.push('/trivia');
  };

  toSettingsBtn = () => {
    const { history } = this.props;
    history.push('/settings');
  };

  render() {
    const { isDisabled, name, email } = this.state;
    return (
      <div className="App">
        <div className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <p>SUA VEZ</p>
          <form>
            <label htmlFor="name">
              Nome:
              <input
                type="text"
                name="name"
                data-testid="input-player-name"
                value={ name }
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="email">
              Email:
              <input
                type="email"
                name="email"
                data-testid="input-gravatar-email"
                value={ email }
                onChange={ this.handleChange }
              />
            </label>
            <button
              type="button"
              data-testid="btn-play"
              disabled={ isDisabled }
              onClick={ this.handleLogin }
            >
              Play
            </button>
            <button
              type="button"
              data-testid="btn-settings"
              onClick={ this.toSettingsBtn }
            >
              Settings
            </button>
          </form>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
