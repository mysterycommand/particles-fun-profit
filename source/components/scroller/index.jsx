import React, { Component } from 'react';

import gameLoop from '../../lib/game-loop';
import { update, getActive } from '../../app/infinite-scroll';

const scrollerStyle = {
  width: 800,
  height: 450,
  border: '3px dashed red',
  position: 'relative',
  overflow: 'scroll',
};

const sentinelStyle = {
  background: 'cyan',
  width: 16,
  height: 16,
  fontSize: 16,
  lineHeight: 1,
  textAlign: 'center',
  verticalAlign: 'middle',
  position: 'absolute',
};

const sentinelDistance = 20000;

export default class Scroller extends Component {
  state = {
    scrollTop: 0,
    scrollBottom: sentinelDistance,
    particles: [],
  };

  onScroll = ({ target: { scrollTop } }) => {
    const scrollBottom = scrollTop + sentinelDistance;
    this.setState(() => ({
      scrollTop,
      scrollBottom,
    }));
  };

  componentDidMount() {
    this.refs.scroller.addEventListener('scroll', this.onScroll);

    const loop = gameLoop(() => {
      update(this.state);
      this.setState(() => ({ particles: getActive() }));
    });

    loop.start();
  }

  componentWillUnmount() {
    this.refs.scroller.addEventListener('scroll', this.onScroll);
  }

  render() {
    const { scrollBottom } = this.state;

    return (
      <div style={scrollerStyle} ref="scroller">
        <div
          id="sentinel"
          style={{
            ...sentinelStyle,
            top: scrollBottom,
          }}
        />
      </div>
    );
  }
}
