import React, { Component } from 'react';

import gameLoop from '../../lib/game-loop';

export default class Scroller extends Component {
  state = {};

  componentDidMound() {
    const loop = gameLoop(() => {
      this.setState(() => ({}));
    });

    loop.start();
  }

  render() {
    return <div>Hello</div>;
  }
}
