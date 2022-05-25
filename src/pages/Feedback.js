import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../App.css';
import Header from '../redux/components/Header';

class Feedback extends Component {
  clickedPlayAgain = () => {
    const { history } = this.props;
    history.push('/');
  }

  clickedToRanking = () => {
    const { history } = this.props;
    history.push('/ranking');
  }

  render() {
    const { score, assertions } = this.props;
    return (
      <div>
        <Header />
        {assertions < 3 ? (
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
          { score }
        </p>
        <p>Acertos:</p>
        <p
          data-testid="feedback-total-question"
        >
          { assertions }
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
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  score: state.player.score,
  assertions: state.player.assertions,
});

export default connect(mapStateToProps)(Feedback);

