import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      picture: '',
    };
  }

  componentDidMount() {
    this.setHeader();
  }

  // Usei o recoverUserInfo[0] pra chegar nas infos, provavelmente depois teria que usar um HOF.
  setHeader = () => {
    const recoverUserInfo = JSON.parse(localStorage.getItem('ranking'));
    const { score } = this.props;
    this.setState({
      name: recoverUserInfo[0].name,
      picture: recoverUserInfo[0].picture,
      score,
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

Header.propTypes = {
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  score: state.player.score,
});

export default connect(mapStateToProps)(Header);
