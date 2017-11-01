const { round } = Math;
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const { clientWidth: w, clientHeight: h } = canvas;
canvas.width = w;
canvas.height = h;
export default function render(state) {
    const { deltaTime } = state;
    const fps = round(1000 / deltaTime).toLocaleString('en');
    const fontSize = 48;
    context.clearRect(0, 0, w, h);
    context.fillStyle = 'cyan';
    context.font = `${fontSize}px monospace`;
    context.textBaseline = 'bottom';
    context.fillText(fps, 10, 10 + fontSize);
}
//# sourceMappingURL=render.js.map