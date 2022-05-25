import React, { Component } from 'react';
import '../App.css';

export default class Ranking extends Component {
  clickedGoHome = () => {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    return (
      <div>
        <h2
          data-testid="ranking-title"
        >
          Ranking
        </h2>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.clickedGoHome }
        >
          Go Home
        </button>
      </div>
    );
  }
}
