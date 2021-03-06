import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import logo from '../../trivia.png';

class Header extends Component {
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

  setHeader = () => {
    const recoverUserInfo = JSON.parse(localStorage.getItem('ranking'));
    const { score } = this.props;
    const rankingLength = recoverUserInfo.length - 1;
    this.setState({
      name: recoverUserInfo[rankingLength].name,
      picture: recoverUserInfo[rankingLength].picture,
      score,
    });
  }

  render() {
    const { name, picture, score } = this.state;
    return (
      <div>
        <header>
          <img src={ logo } className="logo-in-game" alt="logo" />
          <div className="info-header">
            <img
              src={ picture }
              alt={ name }
              data-testid="header-profile-picture"
            />
            <div className="name-score-header">
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
            </div>
          </div>
        </header>
      </div>
    );
  }
}

Header.propTypes = {
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  score: state.player.score,
});

export default connect(mapStateToProps)(Header);
