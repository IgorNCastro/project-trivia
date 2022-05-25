import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../App.css';
import { fetchQuestions } from '../redux/actions/fetchAPI';
import Header from '../redux/components/Header';
import { setScore } from '../redux/actions';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      question: [],
      alternatives: [],
      counter: 0,
      showAnswer: false,
      seconds: 30,
      btnDisabled: false,
      nextBtn: false,
    };
  }

  componentDidMount() {
    this.setQuestions();
  }

  setQuestions = async () => {
    const tokenLocalSt = localStorage.getItem('token');
    const questions = await fetchQuestions(tokenLocalSt);
    if (questions.response_code !== 0) return this.invalidToken();
    this.setState({
      questions: questions.results,
    }, () => {
      this.selectQuestion();
    });
  }

  invalidToken = () => {
    const { history } = this.props;
    localStorage.setItem('token', '');
    history.push('/');
  }

  // Filtrando a array de objetos com as 5 perguntas, para uma nova variavel contendo apenas a da vez
  selectQuestion = () => {
    const { questions, counter } = this.state;
    const questionTurn = questions.filter((i, index) => (index === counter));
    this.setState({ question: questionTurn });
    this.renderAlternatives(questionTurn[0]);
    this.renderTimer();
  }

  renderAlternatives = (quest) => {
    const {
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers,
    } = quest;
    const wrongAnswers = incorrectAnswers.map((alt, index) => (
      {
        key: index,
        className: 'wrong-answer',
        id: `wrong-answer-${index}`,
        name: alt,
      }
    ));
    const rightAnswer = {
      key: 'right',
      className: 'right-answer',
      id: 'correct-answer',
      name: correctAnswer,
    };
    const allAlternatives = [rightAnswer, ...wrongAnswers];
    // Extraido de https://flaviocopes.com/how-to-shuffle-array-javascript/
    const NUMBER_MATH_RANDOM = 0.5;
    const alternatives = allAlternatives.sort(() => Math.random() - NUMBER_MATH_RANDOM);
    this.setState({ alternatives });
  }

  clickedAnswer = (e) => {
    this.updateScore(e);
    this.setState({
      showAnswer: true,
      nextBtn: true,
    }, () => {
      const { showAnswer } = this.state;
      if (showAnswer) return import('./Special.css');
    });
  }

  updateScore = (e) => {
    this.killTimer();
    const DIFF_HARD_BONUS = 3;
    const DIFF_MEDIUM_BONUS = 2;
    const { className } = e.target;
    if (className === 'right-answer') {
      const { question } = this.state;
      const { difficulty } = question[0];
      if (difficulty === 'hard') return this.calculateScore(DIFF_HARD_BONUS);
      if (difficulty === 'medium') return this.calculateScore(DIFF_MEDIUM_BONUS);
      return this.calculateScore(1);
    }
  }

  calculateScore = async (number) => {
    const RIGHT_ANSWER_POINTS = 10;
    const { dispScore } = this.props;
    const { seconds } = this.state;
    const score = RIGHT_ANSWER_POINTS + (seconds * number);
    const assertions = 1;
    const store = { score, assertions };
    await dispScore(store);
  }

  renderTimer = () => {
    const ONE_SECOND = 1000;
    const interval = setInterval(this.setTimer, ONE_SECOND);
    this.setState({ interval });
  }

  setTimer = () => {
    const { seconds } = this.state;
    if (seconds === 0) return this.killTimer();
    const second = seconds - 1;
    this.setState({ seconds: second });
  }

  killTimer = () => {
    const { interval } = this.state;
    clearInterval(interval);
    this.setState({ btnDisabled: true });
  }

  clickedNextBtn = async () => {
    this.setState((prevState) => ({
      counter: prevState.counter + 1,
      seconds: 30,
    }));
  }

  render() {
    const { question, alternatives, seconds, nextBtn, btnDisabled } = this.state;
    return (
      <div>
        <Header />
        <h2>{ seconds }</h2>
        <div>
          { nextBtn && (
            <button
              type="button"
              data-testid="btn-next"
              onClick={ this.clickedNextBtn }
            >
              Next
            </button>
          )}
        </div>
        <div>
          { question.map((quest, index) => (
            <div key={ index }>
              <h4
                data-testid="question-category"
              >
                { quest.category }
              </h4>
              <p
                data-testid="question-text"
              >
                { quest.question }
              </p>
            </div>
          ))}
        </div>
        <div
          data-testid="answer-options"
        >
          { alternatives.map((each) => (
            <button
              key={ each.key }
              data-testid={ each.id }
              className={ each.className }
              type="button"
              onClick={ this.clickedAnswer }
              disabled={ btnDisabled }
            >
              { each.name }
            </button>
          ))}
        </div>
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispScore: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  dispScore: (state) => dispatch(setScore(state)),
});

export default connect(null, mapDispatchToProps)(Game);
