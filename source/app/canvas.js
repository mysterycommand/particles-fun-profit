document.getElementById('root').innerHTML = '<canvas id="canvas"/>';

export const target = document.getElementById('canvas');
export const targetContext = target.getContext('2d');

export const buffer = document.createElement('canvas');
export const bufferContext = buffer.getContext('2d');

export const { clientWidth: w, clientHeight: h } = target;
target.width = buffer.width = w;
target.height = buffer.height = h;
