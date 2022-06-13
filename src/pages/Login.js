import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import logo from '../trivia.png';
import '../App.css';
import { fetchToken, fetchGravatar } from '../redux/actions/fetchAPI';
import { setPlayer } from '../redux/actions';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      name: '',
      isDisabled: true,
      rankingStorage: JSON.parse(localStorage.getItem('ranking')) || [],
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
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => {
      this.verifyDisabled();
    });
  };

  handleLogin = async () => {
    const { history } = this.props;
    const { name, email, rankingStorage } = this.state;
    await this.sendToStore(name, email);
    const tokenAPI = await fetchToken();
    const gravatarAPI = fetchGravatar(email);
    const localSt = [...rankingStorage, {
      name,
      score: 0,
      picture: gravatarAPI,
    }];
    localStorage.setItem('token', tokenAPI.token);
    localStorage.setItem('ranking', JSON.stringify(localSt));
    history.push('/game');
  };

  sendToStore = async (name, email) => {
    const { dispPlayerInfo } = this.props;
    const store = { name, email };
    await dispPlayerInfo(store);
  }

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
          <form className="form-header">
            <label htmlFor="name">
              Nome
              <br />
              <input
                type="text"
                name="name"
                data-testid="input-player-name"
                value={ name }
                onChange={ this.handleChange }
                autocomplete="off"
              />
            </label>
            <label htmlFor="email">
              Email
              <br />
              <input
                type="email"
                name="email"
                data-testid="input-gravatar-email"
                value={ email }
                onChange={ this.handleChange }
                autocomplete="off"
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
  dispPlayerInfo: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  dispPlayerInfo: (state) => dispatch(setPlayer(state)),
});

export default connect(null, mapDispatchToProps)(Login);
