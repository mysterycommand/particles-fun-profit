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
    clientHeight: 0,
    scrollBottom: sentinelDistance,
    particles: [],
  };

  componentDidMount() {
    const { clientHeight } = this.refs.scroller;

    const loop = gameLoop(() => {
      const { scrollTop } = this.refs.scroller;
      const scrollBottom = scrollTop + sentinelDistance;

      const newState = { clientHeight, scrollTop, scrollBottom };
      update(newState);

      this.setState(() => ({ ...newState, particles: getActive() }));
    });

    // loop.start();
    loop.goto(1);
  }

  render() {
    const { scrollBottom, particles } = this.state;

    return (
      <div style={scrollerStyle} ref="scroller">
        <div
          id="sentinel"
          style={{
            ...sentinelStyle,
            top: scrollBottom,
          }}
        />
        {particles.map(({ background, top, height }) => (
          <div
            key={`${top}-${height}`}
            style={{ background, top, height, position: 'absolute', left: 10, right: 10 }}
          />
        ))}
      </div>
    );
  }
}
