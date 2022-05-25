import React, { Component } from 'react';
import '../App.css';
import Header from '../redux/components/Header';

export default class Feedback extends Component {
  render() {
    return (
      <div>
        <Header />
        <p
          data-testid="feedback-text"
        >
          FEEDBACK
        </p>
      </div>
    );
  }
}
