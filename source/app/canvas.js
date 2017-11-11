export const target = document.getElementById('canvas');
export const buffer = document.createElement('canvas');

export const { clientWidth: w, clientHeight: h } = target;
target.width = buffer.width = w;
target.height = buffer.height = h;

export const targetContext = target.getContext('2d');
export const bufferContext = buffer.getContext('2d');
