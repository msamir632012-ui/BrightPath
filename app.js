document.addEventListener('DOMContentLoaded', function() { 
    initializeApp(); 
});

function initializeApp() {
    const appContainer = document.getElementById('app');
    appContainer.innerHTML = `
        <div class="app-header">
            <h1>🌟 BrightPath</h1>
            <p>Your Personal Guidance to Success</p>
        </div>
        <div class="section">
            <h2>Welcome to BrightPath</h2>
            <p>BrightPath is your personal guidance application designed to help you navigate your journey toward success.</p>
        </div>
        <div class="section">
            <h2>Features</h2>
            <ul style="list-style-position: inside;">
                <li>✓ Works on all devices</li>
                <li>✓ Offline support</li>
                <li>✓ Secure and private</li>
                <li>✓ Goal tracking</li>
            </ul>
        </div>
        <div class="section">
            <h2>Get Started</h2>
            <div class="button-group">
                <button onclick="showSection('goals')">Set Goals</button>
                <button onclick="showSection('track')">Track Progress</button>
            </div>
        </div>
        <div id="goals" class="section hidden">
            <h2>Set Your Goals</h2>
            <input type="text" id="goalInput" placeholder="Enter your goal">
            <button onclick="saveGoal()">Save Goal</button>
            <div id="goalsList"></div>
        </div>
        <div id="track" class="section hidden">
            <h2>Track Progress</h2>
            <input type="text" id="progressInput" placeholder="What progress did you make?">
            <button onclick="addProgress()">Log Progress</button>
            <div id="progressList"></div>
        </div>
    `;
    loadGoals();
    loadProgress();
}

function saveGoal() {
    const goal = document.getElementById('goalInput').value;
    if (!goal.trim()) { 
        alert('Please enter a goal'); 
        return; 
    }
    let goals = JSON.parse(localStorage.getItem('bp_goals') || '[]');
    goals.push({ 
        id: Date.now(), 
        goal: goal, 
        created: new Date().toLocaleString() 
    });
    localStorage.setItem('bp_goals', JSON.stringify(goals));
    document.getElementById('goalInput').value = '';
    loadGoals();
}

function loadGoals() {
    let goals = JSON.parse(localStorage.getItem('bp_goals') || '[]');
    let html = goals.length === 0 ? '<p>No goals yet</p>' : '<ul style="list-style:none;">';
    goals.forEach(g => { 
        html += `<li style="padding:10px; margin:5px 0; background:#f0f0f0; border-radius:6px;"><strong>${g.goal}</strong><br><small>${g.created}</small></li>`; 
    });
    html += '</ul>';
    document.getElementById('goalsList').innerHTML = html;
}

function addProgress() {
    const progress = document.getElementById('progressInput').value;
    if (!progress.trim()) { 
        alert('Please enter progress'); 
        return; 
    }
    let list = JSON.parse(localStorage.getItem('bp_progress') || '[]');
    list.push({ 
        id: Date.now(), 
        progress: progress, 
        date: new Date().toLocaleString() 
    });
    localStorage.setItem('bp_progress', JSON.stringify(list));
    document.getElementById('progressInput').value = '';
    loadProgress();
}

function loadProgress() {
    let list = JSON.parse(localStorage.getItem('bp_progress') || '[]');
    let html = list.length === 0 ? '<p>No progress logged</p>' : '<ul style="list-style:none;">';
    list.reverse().forEach(p => { 
        html += `<li style="padding:10px; margin:5px 0; background:#f0f0f0; border-radius:6px;"><strong>${p.progress}</strong><br><small>${p.date}</small></li>`; 
    });
    html += '</ul>';
    document.getElementById('progressList').innerHTML = html;
}

function showSection(id) {
    document.querySelectorAll('.section').forEach(s => s.classList.add('hidden'));
    const section = document.getElementById(id);
    if (section) {
        section.classList.remove('hidden');
        section.scrollIntoView({ behavior: 'smooth' });
    }
}