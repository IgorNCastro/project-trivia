import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../App.css';
import { resetScore } from '../redux/actions';

class Ranking extends Component {
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

  clickedGoHome = async () => {
    const { history, dispResetScore } = this.props;
    const store = { score: 0, assertions: 0 };
    await dispResetScore(store);
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
  dispResetScore: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  dispResetScore: (state) => dispatch(resetScore(state)),
});

export default connect(null, mapDispatchToProps)(Ranking);
