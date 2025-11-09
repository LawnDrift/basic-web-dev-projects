const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const toolBtns = document.querySelectorAll(".option");
const fillColor = document.querySelector("#fill-color");
const sizeSlider = document.querySelector("#brush-size-range");
const colorBtns = document.querySelectorAll(".color-option");

let prevMouseX, prevMouseY, snapshot;
let isDrawing = false;
let selectedTool = "brush";
let currentColor = "black";
let brushWidth = sizeSlider.value;

window.addEventListener("load", () => {
  //returns viewable with/height of an element
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
})

const drawRect = (e) => {
  if (!fillColor.checked) {
    return ctx.strokeRect(e.offsetX, e.offsetY,
    prevMouseX - e.offsetX, prevMouseY - e.offsetY);
  }
  ctx.fillRect(e.offsetX, e.offsetY,
    prevMouseX - e.offsetX, prevMouseY - e.offsetY);
  
}

const drawCircle = (e) => {
  ctx.beginPath(); // new path for circle
  //getting radius for circle according to the mouse pointer
  let radius = Math.sqrt(Math.pow((prevMouseX - e.offsetX), 2) + 
  Math.pow((prevMouseY - e.offsetY), 2));
  ctx.arc(prevMouseX, prevMouseY, radius, 0, 2 * Math.PI );
  fillColor.checked ? ctx.fill() : ctx.stroke();
}

const drawTriangle = (e) => {
  ctx.beginPath(); // new path for triangle
  ctx.moveTo(prevMouseX, prevMouseY); //moving triangle to mouse pointer
  ctx.lineTo(e.offsetX, e.offsetY); //creating first line
  ctx.lineTo(prevMouseX * 2 - e.offsetX, e.offsetY); //creating bottom line
  ctx.closePath();//closing path of a triangle so the third line is drawn.
  fillColor.checked ? ctx.fill() : ctx.stroke();
}

const startDraw = (e) => {
  isDrawing = true;
  prevMouseX = e.offsetX;
  prevMouseY = e.offsetY;
  ctx.beginPath(); // create new path to draw
  ctx.lineWidth = brushWidth;
  ctx.strokeStyle = currentColor;
  ctx.fillStyle = currentColor;
  snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
}

const drawing = (e) => {
  if (!isDrawing) return;
  ctx.putImageData(snapshot, 0, 0);
  if (selectedTool === "brush") {
    ctx.lineTo(e.offsetX, e.offsetY);//create line according to mouse pos
    ctx.stroke();//drawing/filling line with color
  } else if (selectedTool === "rectangle") {
    drawRect(e);
  } else if (selectedTool === "circle") {
    drawCircle(e);
  } else {
    drawTriangle(e);
  }
  
  
}

toolBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelector(".tools .active").classList.remove("active");
    btn.classList.add("active");
    selectedTool = btn.id;
    console.log(selectedTool);    
  })
});

sizeSlider.addEventListener("change", () => {
  brushWidth = sizeSlider.value; //pass slider value as brush size.
});

colorBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelector(".color-options .selected").classList.remove("selected");
    btn.classList.add("selected");
    currentColor = window.getComputedStyle(btn).getPropertyValue("background");
  });
});

canvas.addEventListener("mousedown", startDraw);
canvas.addEventListener("mouseup", () => isDrawing = false);
canvas.addEventListener("mousemove", drawing);