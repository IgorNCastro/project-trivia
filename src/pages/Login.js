import React, { Component } from 'react';
import logo from '../trivia.png';
import '../App.css';
import { fetchToken } from '../redux/actions/fetchToken';

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
    const tokenAPI = await fetchToken();
    localStorage.setItem('token', tokenAPI.token);
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
          <button
            type='button'
            data-testid='btn-settings'
            onClick={ this.toSettingsBtn }
          >
            Settings
          </button>
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
          </form>
        </div>
      </div>
    );
  }
}
