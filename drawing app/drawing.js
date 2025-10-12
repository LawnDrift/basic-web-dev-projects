const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
let isDrawing = false;

window.addEventListener("load", () => {
  //returns viewable with/height of an element
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
})

const startDraw = () => {
  isDrawing = true;
  ctx.beginPath(); // create new path to draw
}

const drawing = (e) => {
  if (!isDrawing) return;
    //create line according to mouse pointer
    ctx.lineTo(e.offsetX, e.offsetY);
    //drawing//filling line with color
    ctx.stroke();
  
}
canvas.addEventListener("mousedown", startDraw);
canvas.addEventListener("mouseup", () => isDrawing = false);
canvas.addEventListener("mousemove", drawing);