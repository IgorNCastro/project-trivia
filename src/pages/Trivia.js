import React, { Component } from 'react';
import '../App.css';

export default class Trivia extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      picture: '',
      score: 0,
    };
  }

  componentDidMount() {
    this.setHeader();
  }

  // Usei o recoverUserInfo[0] pra chegar nas infos, provavelmente depois teria que usar um HOF.
  setHeader = () => {
    const recoverUserInfo = JSON.parse(localStorage.getItem('ranking'));
    this.setState({
      name: recoverUserInfo[0].name,
      picture: recoverUserInfo[0].picture,
      score: recoverUserInfo[0].score,
    });
  }

  render() {
    const { name, picture, score } = this.state;
    return (
      <div>
        <header>
          <img
            src={ picture }
            alt={ name }
            data-testid="header-profile-picture"
          />
          <h3
            data-testid="header-player-name"
          >
            { name }
          </h3>
          <h3
            data-testid="header-score"
          >
            { score }
          </h3>
        </header>
      </div>
    );
  }
}
