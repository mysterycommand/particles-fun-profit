import React, { Component } from 'react';

import gameLoop from '../../lib/game-loop';

import { getState, update, getActive } from '../../app/react-metaballs';
import { canMeta, getMeta } from '../../app/metaballs/util';

const nodeCoverage = 0.5;
const handleLengthRatio = 1.7;
const maxEdgeLength = 200;

export default class Metaballs extends Component {
  state = {
    particles: [],
  };

  componentDidMount() {
    const loop = gameLoop((currentTime, deltaTime) => {
      const state = getState();
      update(state, currentTime, deltaTime);
      this.setState(() => ({ particles: getActive() }));
    });

    loop.start();
  }

  render() {
    const { particles } = this.state;
    const root = particles.find(({ isRoot }) => isRoot);

    const width = 800;
    const height = 450;
    const colors = ['#56bc8a', '#529ecc', '#a77dc2'];
    const size = width < height ? width : height;

    const nodePaths = particles.map(({ px, py, r }) =>
      [
        `M ${px - r} ${py}`,
        `A ${r} ${r} 0 1 0 ${px + r} ${py}`,
        `A ${r} ${r} 0 1 0 ${px - r} ${py}`,
        `Z`,
      ].join(' '),
    );

    const edgePaths = particles
      .filter(({ isRoot }) => !isRoot)
      .filter(p => canMeta(root, p, nodeCoverage, handleLengthRatio, maxEdgeLength))
      .map(p => getMeta(root, p, nodeCoverage, handleLengthRatio))
      .map(
        ({
          pax,
          pay,
          pbx,
          pby,
          pcx,
          pcy,
          pdx,
          pdy,
          habx,
          haby,
          hbax,
          hbay,
          hcdx,
          hcdy,
          hdcx,
          hdcy,
        }) =>
          [
            `M ${pax} ${pay}`,
            `C ${habx} ${haby} ${hbax} ${hbay} ${pbx} ${pby}`,
            `L ${pcx} ${pcy}`,
            `C ${hcdx} ${hcdy} ${hdcx} ${hdcy} ${pdx} ${pdy}`,
            `Z`,
          ].join(' '),
      );

    return (
      <div>
        <svg
          width={`${width}px`}
          height={`${height}px`}
          viewBox={`0 0 ${width} ${height}`}
          version="1.1"
          xmlns="https://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <defs>
            <radialGradient id="gradient">
              {colors.map((color, i) => {
                const percent = i / (colors.length - 1) * 100;
                return <stop key={`${color}-${i}`} offset={`${percent}%`} stopColor={color} />;
              })}
            </radialGradient>

            <g id="gradient-rect">
              <rect
                x={-width / 2}
                y={-height / 2}
                width={width}
                height={height}
                fill={colors[colors.length - 1]}
              />
              <rect x={-size / 2} y={-size / 2} width={size} height={size} fill="url(#gradient)" />
            </g>

            <clipPath id="meta-clip">
              {nodePaths.map(nodePath => <path d={nodePath} fill="black" stroke="none" />)}
              {edgePaths.map(edgePath => <path d={edgePath} fill="black" stroke="none" />)}
            </clipPath>
          </defs>

          <g transform={`translate(${width / 2},${height / 2})`}>
            <rect x={-width / 2} y={-height / 2} width={width} height={height} fill="black" />
            <use xlinkHref="#gradient-rect" clipPath="url(#meta-clip)" />
          </g>
        </svg>
      </div>
    );
  }
}
