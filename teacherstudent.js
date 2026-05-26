function openForm() {
    closeAllForms();
    document.getElementById('assignmentForm').classList.add('active');
    document.getElementById('formOverlay').classList.add('active');
}

function openQuizForm() {
    closeAllForms();
    document.getElementById('quizForm').classList.add('active');
    document.getElementById('formOverlay').classList.add('active');
}

function openTaskForm() {
    closeAllForms();
    document.getElementById('taskForm').classList.add('active');
    document.getElementById('formOverlay').classList.add('active');
}

function openStudentForm() {
    closeAllForms();
    document.getElementById('studentForm').classList.add('active');
    document.getElementById('formOverlay').classList.add('active');
}

function closeAllForms() {
    document.getElementById('assignmentForm').classList.remove('active');
    document.getElementById('quizForm').classList.remove('active');
    document.getElementById('taskForm').classList.remove('active');
    document.getElementById('studentForm').classList.remove('active');
    document.getElementById('formOverlay').classList.remove('active');
}

function saveAssignment(e) {
    e.preventDefault();
    alert('Assignment saved!');
    closeAllForms();
}

function saveQuiz(e) {
    e.preventDefault();
    alert('Quiz saved!');
    closeAllForms();
}

function saveTask(e) {
    e.preventDefault();
    alert('Task saved!');
    closeAllForms();
}

function saveStudent(e) {
    e.preventDefault();
    alert('Student saved!');
    closeAllForms();
}


function logout() {
    window.location.href = "signin.html";
}
const firebaseConfig = {
    apiKey: "AIzaSyCZjge0YwVcqxLI2TMDfWvEqwBywMDJo2I",
    authDomain: "project-56e53.firebaseapp.com",
    projectId: "project-56e53",
    storageBucket: "project-56e53.firebasestorage.app",
    messagingSenderId: "188996642263",
    appId: "1:188996642263:web:62976517938a3a16efd792"
};
firebase.initializeApp(firebaseConfig);
let db1 = firebase.firestore();
let ds = db1.collection("student_tasks");
let ds1 = db1.collection("student_assignment");
let card = document.querySelector('.welcome-card');

ds.get().then((snap) => {

    snap.forEach((s) => {
     
        let data = s.data();

        let div = document.createElement("div");

        div.innerHTML = `
            <h2>${data.name}</h2>
            <a style = "color : white" href="${data.url}"  target="_blank">
                Open task
            </a>
        `;

        div.style.border = "1px solid gray";
        div.style.padding = "15px";
        div.style.margin = "10px";
        div.style.borderRadius = "10px";
        div.style.background = "black";

        card.appendChild(div);
    });

}).then(()=> {
    ds1.get().then((snap) => {

    snap.forEach((s) => {
     
        let data = s.data();

        let div = document.createElement("div");

        div.innerHTML = `
            <h2>${data.name}</h2>
            <a style = "color : white" href="${data.url}"  target="_blank">
                Open Assignment
            </a>
        `;

        div.style.border = "1px solid gray";
        div.style.padding = "15px";
        div.style.margin = "10px";
        div.style.borderRadius = "10px";
        div.style.background = "black";

        card.appendChild(div);
    });

});
})
let api = "https://openrouter.ai/api/v1/chat/completions";
let chatbotInput = document.querySelector("#chatbot-input");
let chatbotMessages = document.querySelector("#chatbot-messages");
let chatbotSendBtn = document.querySelector("#chatbot-send-btn");

async function chat() {
    let question = chatbotInput.value.trim();
    if (!question) return;

    addMessage(question, 'user');
    chatbotInput.value = '';

    showThinking();

    try {
        let db1 = firebase.firestore();
        let currentPage = window.location.pathname;
        let dataContext = {};

        if (currentPage.includes('teacher')) {
            let dsa = await db1.collection("student_assignment");
            let dst = await db1.collection("student_tasks");
            
            let [data2, data3] = await Promise.all([dsa.get(), dst.get()]);
            
            let alldata_student_assignments = [];
            let alldata_student_tasks = [];
            
            data2.forEach((e) => alldata_student_assignments.push(e.data()));
            data3.forEach((e) => alldata_student_tasks.push(e.data()));
            
            dataContext = {
                type: "teacher",
                student_assignments: alldata_student_assignments,
                student_tasks: alldata_student_tasks
            };
        }

        let response = await fetch(api, {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${CONFIG.OPENROUTER_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "openai/gpt-oss-120b:free",
                messages: [
                    {
                        role: "user",
                        content: `
You are a helpful and friendly teacher assistant.

RULES:
- Be friendly and natural.
- Give clear answers.
- If user asks for explanation, explain simply.
- If not found, say: "I could not find it in the records."

DATA:
this is student assignments=> ${JSON.stringify(dataContext.student_assignments)}
this is student tasks=> ${JSON.stringify(dataContext.student_tasks)}

QUESTION:
${question}
`
                    }
                ]
            })
        });

        let data = await response.json();
        
        if (!response.ok) {
            removeThinking();
            if (response.status === 429) {
                addMessage("Too many requests. Please wait a moment and try again.", 'bot');
            } else {
                addMessage("API error occurred. Please try again.", 'bot');
            }
            console.error('API Error:', data);
            return;
        }

        if (!data.choices || !data.choices[0] || !data.choices[0].message) {
            removeThinking();
            addMessage("Invalid response from API. Please try again.", 'bot');
            console.error('Invalid API response:', data);
            return;
        }

        let answer = data.choices[0].message.content;

        removeThinking();
        addMessage(answer, 'bot');

    } catch (error) {
        removeThinking();
        addMessage("Sorry, I encountered an error. Please try again.", 'bot');
        console.error(error);
    }
}

function addMessage(text, sender) {
    let messageDiv = document.createElement('div');
    messageDiv.className = `chatbot-msg ${sender}`;

    let avatarDiv = document.createElement('div');
    avatarDiv.className = 'chatbot-msg-avatar';
    avatarDiv.innerHTML = sender === 'user' ? '<i class="fa-solid fa-user"></i>' : '<i class="fa-solid fa-robot"></i>';

    let bubbleDiv = document.createElement('div');
    bubbleDiv.className = 'chatbot-msg-bubble';
    bubbleDiv.innerHTML = `<p>${text}</p>`;

    messageDiv.appendChild(avatarDiv);
    messageDiv.appendChild(bubbleDiv);
    chatbotMessages.appendChild(messageDiv);

    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

function showThinking() {
    let thinkingDiv = document.createElement('div');
    thinkingDiv.className = 'chatbot-msg bot';
    thinkingDiv.id = 'thinking-indicator';

    let avatarDiv = document.createElement('div');
    avatarDiv.className = 'chatbot-msg-avatar';
    avatarDiv.innerHTML = '<i class="fa-solid fa-robot"></i>';

    let bubbleDiv = document.createElement('div');
    bubbleDiv.className = 'chatbot-thinking';
    bubbleDiv.innerHTML = `
        <div class="chatbot-thinking-icon"><i class="fa-solid fa-spinner"></i></div>
        <div class="chatbot-thinking-text">Thinking...</div>
    `;

    thinkingDiv.appendChild(avatarDiv);
    thinkingDiv.appendChild(bubbleDiv);
    chatbotMessages.appendChild(thinkingDiv);

    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

function removeThinking() {
    let thinkingIndicator = document.getElementById('thinking-indicator');
    if (thinkingIndicator) {
        thinkingIndicator.remove();
    }
}

chatbotInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        chat();
    }
});
