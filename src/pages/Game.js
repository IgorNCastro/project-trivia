import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../App.css';
import { fetchQuestions } from '../redux/actions/fetchAPI';
import Header from '../redux/components/Header';

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      question: [],
      alternatives: [],
      counter: 0,
      showAnswer: false,
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
  }

  renderAlternatives = (quest) => {
    const {
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers,
    } = quest;
    const wrongAnswers = incorrectAnswers.map((alt, index) => (
      <button
        key={ index }
        type="button"
        className="wrong-answer"
        data-testid={ `wrong-answer-${index}` }
        onClick={ this.clickedAnswer }
      >
        { alt }
      </button>
    ));
    const rightAnswer = (
      <button
        key="right-answer"
        type="button"
        className="right-answer"
        data-testid="correct-answer"
        onClick={ this.clickedAnswer }
      >
        { correctAnswer }
      </button>
    );
    const allAlternatives = [rightAnswer, ...wrongAnswers];
    // Extraido de https://flaviocopes.com/how-to-shuffle-array-javascript/
    const NUMBER_MATH_RANDOM = 0.5;
    const alternatives = allAlternatives.sort(() => Math.random() - NUMBER_MATH_RANDOM);
    this.setState({ alternatives });
  }

  clickedAnswer = () => {
    this.setState({
      showAnswer: true,
    }, () => {
      const { showAnswer } = this.state;
      if (showAnswer) return import('./Special.css');
    });
  }

  render() {
    const { question, alternatives } = this.state;
    return (
      <div>
        <Header />
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
            each
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
};
