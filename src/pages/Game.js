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
      seconds: 30,
      btnDisabled: false,
      nextBtn: false,
      right: '',
      wrong: '',
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
        className: 'wrong',
        id: `wrong-answer-${index}`,
        name: alt,
      }
    ));
    const rightAnswer = {
      key: 'right',
      className: 'right',
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
      nextBtn: true,
      right: 'right-answer',
      wrong: 'wrong-answer',
    });
  }

  updateScore = ({ target }) => {
    this.killTimer();
    const { question } = this.state;
    const { difficulty } = question[0];
    const DIFF_HARD_BONUS = 3;
    const DIFF_MEDIUM_BONUS = 2;
    const selectedAlt = target.innerHTML;
    if (selectedAlt === question[0].correct_answer) {
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
    this.setState({ btnDisabled: true, nextBtn: true });
  }

  clickedNextBtn = () => {
    this.setState((prevState) => ({
      counter: prevState.counter + 1,
      seconds: 30,
      btnDisabled: false,
      nextBtn: false,
      right: '',
      wrong: '',
    }));
    this.nextQuestion();
  }

  nextQuestion = () => {
    const LIMIT_QUESTION = 5;
    const { questions, counter } = this.state;
    let counterNext = counter;
    counterNext += 1;
    if (counterNext >= LIMIT_QUESTION) {
      const { history } = this.props;
      return history.push('/feedback');
    }
    const questionTurn = questions.filter((i, index) => (index === counterNext));
    this.setState({ question: questionTurn });
    this.renderAlternatives(questionTurn[0]);
    this.renderTimer();
  }

  render() {
    const {
      question,
      alternatives,
      seconds,
      nextBtn,
      btnDisabled,
      right,
      wrong,
    } = this.state;
    return (
      <div className="game-card">
        <Header />
        <div className="time-clock">
          <h3>Time</h3>
          <h3>{ seconds }</h3>
        </div>
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
        <div className="cat-quest-answer">
          { question.map((quest, index) => (
            <div key={ index }>
              <h2
                data-testid="question-category"
              >
                { quest.category }
              </h2>
              <h1
                data-testid="question-text"
              >
                { quest.question }
              </h1>
            </div>
          ))}
          <div
            data-testid="answer-options"
          >
            { alternatives.map((each) => (
              <button
                key={ each.key }
                data-testid={ each.id }
                className={ each.className === 'right' ? right : wrong }
                type="button"
                onClick={ this.clickedAnswer }
                disabled={ btnDisabled }
              >
                { each.name }
              </button>
            ))}
          </div>
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
