import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../App.css';

export default class Ranking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rankingUsers: [],
    };
  }

  componentDidMount() {
    const recoverUserInfo = JSON.parse(localStorage.getItem('ranking'));
    // https://stackoverflow.com/questions/54623130/javascript-sort-an-array-of-objects-by-a-numeric-property-in-each-object
    const rankedList = recoverUserInfo.sort(({ score: a }, { score: b }) => b - a);
    this.setState({ rankingUsers: rankedList });
  }

  clickedGoHome = () => {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    const { rankingUsers } = this.state;
    return (
      <div>
        <h2
          data-testid="ranking-title"
        >
          Ranking
        </h2>
        { rankingUsers.map((user, index) => (
          <div key={ index }>
            <img src={ user.picture } alt={ user.name } />
            <h4
              data-testid={ `player-name-${index}` }
            >
              { user.name }
            </h4>
            <h4
              data-testid={ `player-score-${index}` }
            >
              { user.score }
            </h4>
          </div>
        ))}
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

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
