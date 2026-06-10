let canvas, ctx, isDrawing = false, currentTool = 'pencil', currentColor = '#000000', currentSize = 3, currentOpacity = 1, currentSaturation = 100;

function initSketchCanvas() {
    canvas = document.getElementById('sketchCanvas');
    if (!canvas) return;
    ctx = canvas.getContext('2d');
    const container = canvas.parentElement;
    if (container) { canvas.width = Math.min(1000, container.clientWidth - 20); canvas.height = 600; }
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);
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

function setSketchTool(tool, e) {
    currentTool = tool;
    document.querySelectorAll('.sketch-tool-btn').forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');
}

function updateSketchColor() { currentColor = document.getElementById('sketchColor').value; }
function updateSketchSize() { currentSize = document.getElementById('sketchSize').value; document.getElementById('sketchSizeValue').textContent = currentSize; }
function updateSketchOpacity() { currentOpacity = document.getElementById('sketchOpacity').value; document.getElementById('sketchOpacityValue').textContent = Math.round(currentOpacity * 100) + '%'; }
function updateSketchSaturation() { currentSaturation = document.getElementById('sketchSaturation').value; document.getElementById('sketchSaturationValue').textContent = currentSaturation + '%'; }

function startDrawing(e) { isDrawing = true; }

function draw(e) {
    if (!isDrawing || !canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    ctx.globalAlpha = currentOpacity;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    if (currentTool === 'pencil') { ctx.strokeStyle = currentColor; ctx.lineWidth = currentSize; ctx.lineTo(x, y); ctx.stroke(); }
    else if (currentTool === 'pen') { ctx.strokeStyle = currentColor; ctx.lineWidth = currentSize * 1.5; ctx.lineTo(x, y); ctx.stroke(); }
    else if (currentTool === 'brush') { ctx.strokeStyle = currentColor; ctx.lineWidth = currentSize * 2; ctx.lineTo(x, y); ctx.stroke(); }
    else if (currentTool === 'eraser') { ctx.clearRect(x - currentSize, y - currentSize, currentSize * 2, currentSize * 2); }
    else if (currentTool === 'highlighter') { ctx.globalAlpha = currentOpacity * 0.4; ctx.strokeStyle = currentColor; ctx.lineWidth = currentSize * 3; ctx.lineTo(x, y); ctx.stroke(); ctx.globalAlpha = currentOpacity; }
}

function stopDrawing() { isDrawing = false; }

function clearSketch() { if (confirm('Clear canvas?')) { ctx.fillStyle = 'white'; ctx.fillRect(0, 0, canvas.width, canvas.height); } }

window.addEventListener('load', () => { setTimeout(() => { if (document.getElementById('sketchCanvas')) initSketchCanvas(); }, 500); });