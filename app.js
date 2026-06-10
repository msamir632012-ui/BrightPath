document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    registerServiceWorker();
});

function initializeApp() {
    const appContainer = document.getElementById('app');
    appContainer.innerHTML = `
        <div class="app-header">
            <h1>🌟 BrightPath</h1>
            <p>Your Personal Guidance to Success</p>
        </div>
        <div class="navigation-buttons">
            <button class="nav-btn active" onclick="switchSection('diary')">📔 Diary</button>
            <button class="nav-btn" onclick="switchSection('notes')">📝 Notes</button>
            <button class="nav-btn" onclick="switchSection('sketches')">🎨 Sketches</button>
            <button class="nav-btn" onclick="switchSection('motivation')">💪 Motivation</button>
            <button class="nav-btn" onclick="switchSection('planner')">✅ Planner</button>
        </div>

        <!-- DIARY SECTION -->
        <div id="diary" class="section active">
            <h2>📔 My Diary</h2>
            <div class="editor-toolbar">
                <div class="toolbar-group">
                    <button class="toolbar-btn" onclick="applyFormat('bold')" title="Bold"><b>B</b></button>
                    <button class="toolbar-btn" onclick="applyFormat('italic')" title="Italic"><i>I</i></button>
                    <button class="toolbar-btn" onclick="applyFormat('underline')" title="Underline"><u>U</u></button>
                </div>
                <div class="toolbar-group">
                    <label>Font:</label>
                    <select class="font-select" onchange="changeFontFamily(this.value)">
                        <option value="Arial">Arial</option>
                        <option value="Georgia">Georgia</option>
                        <option value="Times New Roman">Times New Roman</option>
                        <option value="Courier New">Courier New</option>
                        <option value="Verdana">Verdana</option>
                        <option value="Comic Sans MS">Comic Sans MS</option>
                    </select>
                </div>
                <div class="toolbar-group">
                    <label>Size:</label>
                    <select class="size-select" onchange="changeFontSize(this.value)">
                        <option value="12px">12px</option>
                        <option value="14px" selected>14px</option>
                        <option value="16px">16px</option>
                        <option value="18px">18px</option>
                        <option value="20px">20px</option>
                        <option value="24px">24px</option>
                    </select>
                </div>
                <div class="toolbar-group">
                    <label>Color:</label>
                    <input type="color" class="color-picker" value="#000000" onchange="changeFontColor(this.value)">
                </div>
                <div class="toolbar-group">
                    <button class="toolbar-btn" onclick="applyFormat('highlight')" title="Highlight">🔆 Highlight</button>
                    <input type="color" class="color-picker" id="highlightColor" value="#FFFF00">
                </div>
                <div class="toolbar-group">
                    <button class="toolbar-btn" onclick="applyFormat('undo')" title="Undo">↶ Undo</button>
                    <button class="toolbar-btn" onclick="applyFormat('redo')" title="Redo">↷ Redo</button>
                    <button class="toolbar-btn" onclick="clearDiary()" title="Clear">🗑️ Clear</button>
                </div>
            </div>
            <div id="diaryEditor" class="editor-area" contenteditable="true" data-placeholder="Write your diary entry here..."></div>
            <button onclick="saveDiary()" class="save-btn">💾 Save Diary Entry</button>
        </div>

        <!-- NOTES SECTION -->
        <div id="notes" class="section">
            <h2>📝 Notes</h2>
            <div class="editor-toolbar">
                <div class="toolbar-group">
                    <button class="toolbar-btn" onclick="applyFormat('bold', 'notesEditor')" title="Bold"><b>B</b></button>
                    <button class="toolbar-btn" onclick="applyFormat('italic', 'notesEditor')" title="Italic"><i>I</i></button>
                    <button class="toolbar-btn" onclick="applyFormat('underline', 'notesEditor')" title="Underline"><u>U</u></button>
                </div>
                <div class="toolbar-group">
                    <label>Font:</label>
                    <select class="font-select" onchange="changeFontFamily(this.value, 'notesEditor')">
                        <option value="Arial">Arial</option>
                        <option value="Georgia">Georgia</option>
                        <option value="Times New Roman">Times New Roman</option>
                        <option value="Courier New">Courier New</option>
                        <option value="Verdana">Verdana</option>
                        <option value="Comic Sans MS">Comic Sans MS</option>
                    </select>
                </div>
                <div class="toolbar-group">
                    <label>Size:</label>
                    <select class="size-select" onchange="changeFontSize(this.value, 'notesEditor')">
                        <option value="12px">12px</option>
                        <option value="14px" selected>14px</option>
                        <option value="16px">16px</option>
                        <option value="18px">18px</option>
                        <option value="20px">20px</option>
                        <option value="24px">24px</option>
                    </select>
                </div>
                <div class="toolbar-group">
                    <label>Color:</label>
                    <input type="color" class="color-picker" value="#000000" onchange="changeFontColor(this.value, 'notesEditor')">
                </div>
                <div class="toolbar-group">
                    <button class="toolbar-btn" onclick="applyFormat('highlight', 'notesEditor')" title="Highlight">🔆 Highlight</button>
                    <input type="color" class="color-picker" id="notesHighlightColor" value="#FFFF00">
                </div>
                <div class="toolbar-group">
                    <button class="toolbar-btn" onclick="applyFormat('undo', 'notesEditor')" title="Undo">↶ Undo</button>
                    <button class="toolbar-btn" onclick="applyFormat('redo', 'notesEditor')" title="Redo">↷ Redo</button>
                    <button class="toolbar-btn" onclick="clearNotes()" title="Clear">🗑️ Clear</button>
                </div>
            </div>
            <div id="notesEditor" class="editor-area" contenteditable="true" data-placeholder="Write your notes here..."></div>
            <button onclick="saveNotes()" class="save-btn">💾 Save Notes</button>
        </div>

        <!-- SKETCHES SECTION -->
        <div id="sketches" class="section">
            <h2>🎨 Sketches</h2>
            <div class="sketch-container">
                <div class="sketch-toolbar">
                    <div class="sketch-tool-group">
                        <button class="sketch-tool-btn active" onclick="setSketchTool('pencil')" title="Pencil">✏️ Pencil</button>
                        <button class="sketch-tool-btn" onclick="setSketchTool('pen')" title="Pen">🖊️ Pen</button>
                        <button class="sketch-tool-btn" onclick="setSketchTool('brush')" title="Brush">🖌️ Brush</button>
                        <button class="sketch-tool-btn" onclick="setSketchTool('eraser')" title="Eraser">🧹 Eraser</button>
                        <button class="sketch-tool-btn" onclick="setSketchTool('highlighter')" title="Highlighter">🔆 Highlighter</button>
                    </div>
                    <div class="sketch-tool-group">
                        <button class="sketch-tool-btn" onclick="setSketchTool('line')" title="Line">📏 Line</button>
                        <button class="sketch-tool-btn" onclick="setSketchTool('circle')" title="Circle">⭕ Circle</button>
                        <button class="sketch-tool-btn" onclick="setSketchTool('rectangle')" title="Rectangle">▭ Rectangle</button>
                    </div>
                    <div class="sketch-tool-group">
                        <label>Color:</label>
                        <input type="color" id="sketchColor" value="#000000" onchange="updateSketchColor()">
                    </div>
                    <div class="slider-group">
                        <label>Size:</label>
                        <input type="range" id="sketchSize" min="1" max="50" value="3" onchange="updateSketchSize()">
                        <span class="slider-value" id="sketchSizeValue">3</span>
                    </div>
                    <div class="slider-group">
                        <label>Opacity:</label>
                        <input type="range" id="sketchOpacity" min="0.1" max="1" step="0.1" value="1" onchange="updateSketchOpacity()">
                        <span class="slider-value" id="sketchOpacityValue">100%</span>
                    </div>
                    <div class="slider-group">
                        <label>Saturation:</label>
                        <input type="range" id="sketchSaturation" min="0" max="200" value="100" onchange="updateSketchSaturation()">
                        <span class="slider-value" id="sketchSaturationValue">100%</span>
                    </div>
                    <button class="sketch-tool-btn" onclick="clearSketch()" style="background: #f44336; color: white; border-color: #f44336;">🗑️ Clear</button>
                </div>
                <canvas id="sketchCanvas" width="1200" height="600"></canvas>
            </div>
        </div>

        <!-- MOTIVATION SECTION -->
        <div id="motivation" class="section">
            <h2>💪 Motivation & Inspiration</h2>
            <div class="motivation-container">
                <div class="motivation-input-group">
                    <textarea id="motivationInput" placeholder="Add your own motivational speech or quote..."></textarea>
                    <button onclick="addMotivation()">➕ Add</button>
                </div>
                <div id="motivationList" class="motivation-list"></div>
            </div>
        </div>

        <!-- PLANNER SECTION -->
        <div id="planner" class="section">
            <h2>✅ My Planner</h2>
            <div class="planner-container">
                <div class="planner-input-group">
                    <input type="text" id="taskInput" placeholder="Add a new task...">
                    <button onclick="addTask()">➕ Add Task</button>
                </div>
                <ul id="tasksList" class="planner-list"></ul>
            </div>
        </div>
    `;

    loadAllData();
}

function switchSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });

    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    document.getElementById(sectionId).classList.add('active');
    event.target.classList.add('active');

    if (sectionId === 'sketches') {
        setTimeout(() => {
            initSketchCanvas();
        }, 100);
    }
}

function applyFormat(format, editorId = 'diaryEditor') {
    const editor = document.getElementById(editorId);
    
    if (format === 'bold') {
        document.execCommand('bold', false, null);
    } else if (format === 'italic') {
        document.execCommand('italic', false, null);
    } else if (format === 'underline') {
        document.execCommand('underline', false, null);
    } else if (format === 'highlight') {
        const highlightColorId = editorId === 'diaryEditor' ? 'highlightColor' : 'notesHighlightColor';
        const highlightColor = document.getElementById(highlightColorId).value;
        document.execCommand('backColor', false, highlightColor);
    } else if (format === 'undo') {
        document.execCommand('undo', false, null);
    } else if (format === 'redo') {
        document.execCommand('redo', false, null);
    }
    
    editor.focus();
}

function changeFontFamily(fontFamily, editorId = 'diaryEditor') {
    document.execCommand('fontName', false, fontFamily);
    document.getElementById(editorId).focus();
}

function changeFontSize(fontSize, editorId = 'diaryEditor') {
    document.getElementById(editorId).style.fontSize = fontSize;
    document.getElementById(editorId).focus();
}

function changeFontColor(color, editorId = 'diaryEditor') {
    document.execCommand('foreColor', false, color);
    document.getElementById(editorId).focus();
}

function saveDiary() {
    const content = document.getElementById('diaryEditor').innerHTML;
    if (!content.trim()) {
        alert('Please write something first!');
        return;
    }
    const timestamp = new Date().toLocaleString();
    let diaries = JSON.parse(localStorage.getItem('bp_diaries') || '[]');
    diaries.push({
        id: Date.now(),
        content: content,
        timestamp: timestamp
    });
    localStorage.setItem('bp_diaries', JSON.stringify(diaries));
    alert('✅ Diary entry saved successfully!');
    document.getElementById('diaryEditor').innerHTML = '';
}

function clearDiary() {
    if (confirm('Are you sure you want to clear this entry?')) {
        document.getElementById('diaryEditor').innerHTML = '';
    }
}

function saveNotes() {
    const content = document.getElementById('notesEditor').innerHTML;
    if (!content.trim()) {
        alert('Please write something first!');
        return;
    }
    const timestamp = new Date().toLocaleString();
    let notes = JSON.parse(localStorage.getItem('bp_notes') || '[]');
    notes.push({
        id: Date.now(),
        content: content,
        timestamp: timestamp
    });
    localStorage.setItem('bp_notes', JSON.stringify(notes));
    alert('✅ Note saved successfully!');
    document.getElementById('notesEditor').innerHTML = '';
}

function clearNotes() {
    if (confirm('Are you sure you want to clear this note?')) {
        document.getElementById('notesEditor').innerHTML = '';
    }
}

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (!taskText) {
        alert('Please enter a task');
        return;
    }

    let tasks = JSON.parse(localStorage.getItem('bp_tasks') || '[]');
    tasks.push({
        id: Date.now(),
        text: taskText,
        completed: false
    });

    localStorage.setItem('bp_tasks', JSON.stringify(tasks));
    taskInput.value = '';
    renderTasks();
}

function renderTasks() {
    let tasks = JSON.parse(localStorage.getItem('bp_tasks') || '[]');
    const tasksList = document.getElementById('tasksList');
    
    if (tasks.length === 0) {
        tasksList.innerHTML = '<li style="padding: 20px; text-align: center; color: #999;">No tasks yet. Add one to get started!</li>';
        return;
    }

    tasksList.innerHTML = tasks.map(task => `
        <li class="planner-item ${task.completed ? 'completed' : ''}">
            <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTask(${task.id})">
            <span class="task-text">${task.text}</span>
            <div class="task-actions">
                <button onclick="editTask(${task.id})">✏️ Edit</button>
                <button class="delete" onclick="deleteTask(${task.id})">🗑️ Delete</button>
            </div>
        </li>
    `).join('');
}

function toggleTask(taskId) {
    let tasks = JSON.parse(localStorage.getItem('bp_tasks') || '[]');
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        task.completed = !task.completed;
        localStorage.setItem('bp_tasks', JSON.stringify(tasks));
        renderTasks();
    }
}

function editTask(taskId) {
    let tasks = JSON.parse(localStorage.getItem('bp_tasks') || '[]');
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        const newText = prompt('Edit task:', task.text);
        if (newText !== null && newText.trim()) {
            task.text = newText.trim();
            localStorage.setItem('bp_tasks', JSON.stringify(tasks));
            renderTasks();
        }
    }
}

function deleteTask(taskId) {
    if (confirm('Are you sure you want to delete this task?')) {
        let tasks = JSON.parse(localStorage.getItem('bp_tasks') || '[]');
        tasks = tasks.filter(t => t.id !== taskId);
        localStorage.setItem('bp_tasks', JSON.stringify(tasks));
        renderTasks();
    }
}

function addMotivation() {
    const input = document.getElementById('motivationInput');
    const text = input.value.trim();

    if (!text) {
        alert('Please enter a motivational speech or quote');
        return;
    }

    let motivations = JSON.parse(localStorage.getItem('bp_motivations') || '[]');
    motivations.push({
        id: Date.now(),
        text: text,
        custom: true
    });

    localStorage.setItem('bp_motivations', JSON.stringify(motivations));
    input.value = '';
    renderMotivations();
}

function deleteMotivation(motivationId) {
    if (confirm('Are you sure you want to delete this?')) {
        let motivations = JSON.parse(localStorage.getItem('bp_motivations') || '[]');
        motivations = motivations.filter(m => m.id !== motivationId);
        localStorage.setItem('bp_motivations', JSON.stringify(motivations));
        renderMotivations();
    }
}

function renderMotivations() {
    let motivations = JSON.parse(localStorage.getItem('bp_motivations') || '[]');
    
    if (motivations.length === 0) {
        motivations = [
            { id: 1, text: "Believe in yourself. You are braver than you believe, stronger than you seem, and smarter than you think.", custom: false },
            { id: 2, text: "Every accomplishment starts with the decision to try. Don't wait for the perfect moment, create it.", custom: false },
            { id: 3, text: "Your potential is endless. Your only limit is your mind. Dream big and work harder.", custom: false },
            { id: 4, text: "Success is not final, failure is not fatal. It is the courage to continue that counts.", custom: false },
            { id: 5, text: "You are capable of amazing things. Take a deep breath and believe in your journey.", custom: false }
        ];
    }

    const motivationList = document.getElementById('motivationList');
    motivationList.innerHTML = motivations.map(motivation => `
        <div class="motivation-card">
            <p class="motivation-text">"${motivation.text}"</p>
            <div class="motivation-card-actions">
                <button onclick="deleteMotivation(${motivation.id})" ${!motivation.custom ? 'style="display:none;"' : ''}>🗑️ Delete</button>
                <button onclick="shareMotivation('${motivation.text.replace(/'/g, "\\'")}')">📤 Share</button>
            </div>
        </div>
    `).join('');
}

function shareMotivation(text) {
    const shareText = `Check out this motivational quote from BrightPath: "${text}"`;
    if (navigator.share) {
        navigator.share({
            title: 'BrightPath Motivation',
            text: shareText
        });
    } else {
        alert(shareText);
    }
}

function loadAllData() {
    renderTasks();
    renderMotivations();
}

function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js').catch(err => console.log('SW registration failed:', err));
    }
}