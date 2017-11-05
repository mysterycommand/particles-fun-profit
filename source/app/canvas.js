export const canvas = document.getElementById('canvas');
export const { clientWidth: w, clientHeight: h } = canvas;
canvas.width = w;
canvas.height = h;

export const context = canvas.getContext('2d');
