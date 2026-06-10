let canvas;
let ctx;
let isDrawing = false;
let currentTool = 'pencil';
let currentColor = '#000000';
let currentSize = 3;
let currentOpacity = 1;
let currentSaturation = 100;
let startX, startY;

function initSketchCanvas() {
    canvas = document.getElementById('sketchCanvas');
    if (!canvas) return;

    ctx = canvas.getContext('2d');
    
    // Set canvas size
    const container = canvas.parentElement;
    if (container) {
        canvas.width = Math.min(1200, container.clientWidth - 20);
        canvas.height = 600;
    }

    // Set background to white
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add event listeners
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);

    // Touch events for mobile
    canvas.addEventListener('touchstart', handleTouch);
    canvas.addEventListener('touchmove', handleTouch);
    canvas.addEventListener('touchend', stopDrawing);
}

function handleTouch(e) {
    e.preventDefault();
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent(e.type === 'touchstart' ? 'mousedown' : 'mousemove', {
        clientX: touch.clientX,
        clientY: touch.clientY
    });
    canvas.dispatchEvent(mouseEvent);
}

function setSketchTool(tool) {
    currentTool = tool;
    document.querySelectorAll('.sketch-tool-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
}

function updateSketchColor() {
    currentColor = document.getElementById('sketchColor').value;
}

function updateSketchSize() {
    currentSize = document.getElementById('sketchSize').value;
    document.getElementById('sketchSizeValue').textContent = currentSize;
}

function updateSketchOpacity() {
    currentOpacity = document.getElementById('sketchOpacity').value;
    document.getElementById('sketchOpacityValue').textContent = Math.round(currentOpacity * 100) + '%';
}

function updateSketchSaturation() {
    currentSaturation = document.getElementById('sketchSaturation').value;
    document.getElementById('sketchSaturationValue').textContent = currentSaturation + '%';
    updateCanvasSaturation();
}

function updateCanvasSaturation() {
    canvas.style.filter = `saturate(${currentSaturation}%)`;
}

function startDrawing(e) {
    isDrawing = true;
    const rect = canvas.getBoundingClientRect();
    startX = e.clientX - rect.left;
    startY = e.clientY - rect.top;
}

function draw(e) {
    if (!isDrawing) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.globalAlpha = currentOpacity;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (currentTool === 'pencil') {
        drawPencil(x, y);
    } else if (currentTool === 'pen') {
        drawPen(x, y);
    } else if (currentTool === 'brush') {
        drawBrush(x, y);
    } else if (currentTool === 'eraser') {
        drawEraser(x, y);
    } else if (currentTool === 'highlighter') {
        drawHighlighter(x, y);
    }
}

function stopDrawing() {
    if (!isDrawing) return;
    isDrawing = false;
}

function drawPencil(x, y) {
    ctx.strokeStyle = currentColor;
    ctx.lineWidth = currentSize;
    ctx.lineTo(x, y);
    ctx.stroke();
}

function drawPen(x, y) {
    ctx.strokeStyle = currentColor;
    ctx.lineWidth = currentSize * 1.5;
    ctx.lineTo(x, y);
    ctx.stroke();
}

function drawBrush(x, y) {
    ctx.strokeStyle = currentColor;
    ctx.lineWidth = currentSize * 2;
    ctx.lineTo(x, y);
    ctx.stroke();
}

function drawEraser(x, y) {
    ctx.clearRect(x - currentSize, y - currentSize, currentSize * 2, currentSize * 2);
}

function drawHighlighter(x, y) {
    const highlightColor = document.getElementById('sketchColor').value;
    ctx.globalAlpha = currentOpacity * 0.4;
    ctx.strokeStyle = highlightColor;
    ctx.lineWidth = currentSize * 3;
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.globalAlpha = currentOpacity;
}

function clearSketch() {
    if (confirm('Are you sure you want to clear the canvas?')) {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

// Auto-initialize sketch canvas when page loads
window.addEventListener('load', function() {
    setTimeout(() => {
        if (document.getElementById('sketchCanvas')) {
            initSketchCanvas();
        }
    }, 500);
});