import React, { Component } from 'react';
import '../App.css';

export default class Settings extends Component {

  toGameBtn = () => {
    const { history } = this.props;
    history.push('/trivia');
  };

  render() {
    return (
      <div>
        <header>
          <h1
            data-testid='settings-title'
          >
            Settings
          </h1>
          <button
            type='button'
            onClick={ this.toGameBtn }
          >
            Back to Game
          </button>
        </header>
      </div>
    );
  }
}
