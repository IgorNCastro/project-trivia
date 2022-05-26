import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../App.css';
import Header from '../redux/components/Header';
import { resetScore } from '../redux/actions';

class Feedback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // score: 0,
      assertions: 0,
      minRights: 3,
      zero: 0,
    };
  }

  async componentDidMount() {
    const { score, assertions, dispResetScore } = this.props;
    this.setState({ assertions });
    const recoverUserInfo = JSON.parse(localStorage.getItem('ranking'));
    const rankingLength = recoverUserInfo.length - 1;
    recoverUserInfo[rankingLength].score = score;
    localStorage.setItem('ranking', JSON.stringify(recoverUserInfo));
    const store = { score: 0, assertions: 0 };
    await dispResetScore(store);
  }

  clickedPlayAgain = () => {
    const { history } = this.props;
    history.push('/');
  }

  clickedToRanking = () => {
    const { history } = this.props;
    history.push('/ranking');
  }

  render() {
    const { assertions, minRights, zero } = this.state;
    return (
      <div>
        <Header />
        { assertions < minRights ? (
          <h3
            data-testid="feedback-text"
          >
            Could be better...
          </h3>
        ) : (
          <h3
            data-testid="feedback-text"
          >
            Well Done!
          </h3>
        )}
        <p>Placar Final:</p>
        <p
          data-testid="feedback-total-score"
        >
          { zero }
        </p>
        <p>Acertos:</p>
        <p
          data-testid="feedback-total-question"
        >
          { zero }
        </p>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ this.clickedPlayAgain }
        >
          Play Again
        </button>
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ this.clickedToRanking }
        >
          Ranking
        </button>
      </div>
    );
  }
}

Feedback.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
  dispResetScore: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  score: state.player.score,
  assertions: state.player.assertions,
});

const mapDispatchToProps = (dispatch) => ({
  dispResetScore: (state) => dispatch(resetScore(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
