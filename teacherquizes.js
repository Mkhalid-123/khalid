
let api = "https://openrouter.ai/api/v1/chat/completions";
let title = document.querySelector("#title");
let subject = document.querySelector("#subject");
let date = document.querySelector("#date");
let marks = document.querySelector("#marks");
let description = document.querySelector("#description");
let save = document.querySelector("#save");
let card = document.querySelector(".welcome-card");
let a = document.querySelector("#quiz button");

// ========================= FORMS =========================

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

function logout() {
    window.location.href = "signin.html";
}

function closeAllForms() {
    document.getElementById('assignmentForm').classList.remove('active');
    document.getElementById('quizForm').classList.remove('active');
    document.getElementById('taskForm').classList.remove('active');
    document.getElementById('studentForm').classList.remove('active');
    document.getElementById('formOverlay').classList.remove('active');
    
    // Restore save button if edit button exists
    let editBtn = document.querySelector("#quiz #edit");
    if (editBtn) {
        editBtn.remove();
        let saveBtn = document.createElement('button');
        saveBtn.innerHTML = "Save Quiz";
        saveBtn.id = "save";
        saveBtn.type = "submit";
        document.querySelector("#quiz").appendChild(saveBtn);
    }
}

// ========================= FIREBASE =========================

const firebaseConfig = {
    apiKey: "AIzaSyCZjge0YwVcqxLI2TMDfWvEqwBywMDJo2I",
    authDomain: "project-56e53.firebaseapp.com",
    projectId: "project-56e53",
    storageBucket: "project-56e53.firebasestorage.app",
    messagingSenderId: "188996642263",
    appId: "1:188996642263:web:62976517938a3a16efd792"
};

firebase.initializeApp(firebaseConfig);

let db = firebase.firestore();
let dc = db.collection("quizes");

let id;

if (localStorage.getItem("quizId") === null) {
    localStorage.setItem("quizId", 0);
    id = 0;
} else {
    id = Number(localStorage.getItem("quizId"));
}

// ========================= SAVE DATA =========================

save.addEventListener("click", (e) => {

    e.preventDefault();
    a.innerHTML = "Submitting....";

    id++;
    localStorage.setItem("quizId", id);

    dc.doc(id.toString()).set({
        title: `Quiz Title ${title.value}`,
        subject: `Subject ${subject.value}`,
        marks: `Marks ${marks.value}`,
        description: `Description ${description.value}`,
        date: date.value,
    })
        .then(() => {
            closeAllForms();
            window.location.reload();
        });

});

// ========================= GET DATA =========================

dc.get().then((s) => {

    s.forEach((snap) => {

        let id2 = snap.id;

        let div = document.createElement("div");

        let p1 = document.createElement("h2");
        let p2 = document.createElement("p");
        let p3 = document.createElement("p");
        let p4 = document.createElement("p");
        let p5 = document.createElement("p");

        let btn1 = document.createElement("button");
        let btn2 = document.createElement("button");

        // ================= BUTTON TEXT =================

        btn1.innerHTML = "Delete";
        btn2.innerHTML = "Edit";

        // ================= DATA =================

        p1.innerHTML = snap.data().title;
        p2.innerHTML = snap.data().description;
        p3.innerHTML = snap.data().subject;
        p4.innerHTML = snap.data().marks;
        p5.innerHTML = snap.data().date;

        // ================= APPEND =================

        div.appendChild(p1);
        div.appendChild(p2);
        div.appendChild(p3);
        div.appendChild(p4);
        div.appendChild(p5);

        div.appendChild(btn1);
        div.appendChild(btn2);

        card.appendChild(div);

        // ================= CARD CONTAINER STYLE =================

        card.style.display = "flex";
        card.style.flexWrap = "wrap";
        card.style.justifyContent = "center";
        card.style.gap = "20px";
        card.style.padding = "20px";

        // ================= SINGLE CARD STYLE =================

        div.style.display = "flex";
        div.style.flexDirection = "column";
        div.style.justifyContent = "space-between";

        div.style.width = "320px";
        div.style.minHeight = "250px";

        div.style.background = "black";
        div.style.padding = "20px";
        div.style.borderRadius = "16px";

        div.style.boxShadow = "0 4px 15px rgba(0,0,0,0.15)";
        div.style.transition = "0.3s";

        div.style.fontFamily = "Arial, sans-serif";
        div.style.overflow = "hidden";
        div.style.wordWrap = "break-word";

        // ================= TITLE STYLE =================

        p1.style.fontSize = "24px";
        p1.style.marginBottom = "10px";
        p1.style.color = "white";

        // ================= PARAGRAPH STYLE =================

        [p2, p3, p4, p5].forEach((p) => {

            p.style.fontSize = "16px";
            p.style.margin = "6px 0";
            p.style.lineHeight = "1.5";
            p.style.color = "white";

        });

        // ================= DESCRIPTION STYLE =================

        p5.style.marginTop = "12px";
        p5.style.paddingTop = "10px";
        p5.style.borderTop = "1px solid #ddd";

        // ================= CARD HOVER EFFECT =================

        div.addEventListener("mouseenter", () => {

            div.style.transform = "translateY(-5px)";
            div.style.boxShadow = "0 8px 25px rgba(0,0,0,0.2)";

        });

        div.addEventListener("mouseleave", () => {

            div.style.transform = "translateY(0)";
            div.style.boxShadow = "0 4px 15px rgba(0,0,0,0.15)";

        });

        // ================= BUTTON COMMON STYLE =================

        [btn1, btn2].forEach((b) => {

            b.style.fontFamily = '"Oswald", sans-serif';
            b.style.padding = "12px";
            b.style.border = "none";
            b.style.borderRadius = "10px";

            b.style.cursor = "pointer";
            b.style.fontSize = "15px";
            b.style.fontWeight = "600";

            b.style.transition = "0.3s";
            b.style.marginTop = "12px";

            b.style.width = "100%";

        });

        // ================= DELETE BUTTON STYLE =================

        btn1.style.background = "#ff4d4d";
        btn1.style.color = "white";
        btn1.style.boxShadow = "0 4px 12px rgba(255,77,77,0.3)";

        btn1.addEventListener("mouseenter", () => {

            btn1.style.transform = "scale(1.03)";
            btn1.style.background = "#e60000";

        });

        btn1.addEventListener("mouseleave", () => {

            btn1.style.transform = "scale(1)";
            btn1.style.background = "#ff4d4d";

        });

        // ================= EDIT BUTTON STYLE =================

        btn2.style.background = "#00b894";
        btn2.style.color = "white";
        btn2.style.boxShadow = "0 4px 12px rgba(0,184,148,0.3)";

        btn2.addEventListener("mouseenter", () => {

            btn2.style.transform = "scale(1.03)";
            btn2.style.background = "#009973";

        });

        btn2.addEventListener("mouseleave", () => {

            btn2.style.transform = "scale(1)";
            btn2.style.background = "#00b894";

        });

        // ================= EDIT FUNCTION =================
        btn2.addEventListener("click", () => {
            openQuizForm();
            // Remove existing edit button if present
            let existingEditBtn = document.querySelector("#quiz #edit");
            if (existingEditBtn) {
                existingEditBtn.remove();
            }
            // Remove existing save button if present
            let existingSaveBtn = document.querySelector("#quiz #save");
            if (existingSaveBtn) {
                existingSaveBtn.remove();
            }
            let btnedit = document.createElement('button');
            btnedit.innerHTML = "Edit";
            btnedit.id = "edit";
            document.querySelector("#quiz").appendChild(btnedit);
            // styling
            btnedit.style.fontFamily = '"Oswald", sans-serif';
            btnedit.style.padding = "12px";
            btnedit.style.border = "none";
            btnedit.style.borderRadius = "10px";

            btnedit.style.background = "linear-gradient(135deg, #667eea, #764ba2)";
            btnedit.style.color = "white";

            btnedit.style.cursor = "pointer";
            btnedit.style.fontSize = "15px";
            btnedit.style.fontWeight = "600";

            btnedit.style.transition = "0.3s";
            btnedit.style.marginTop = "12px";

            btnedit.style.width = "100%";
            btnedit.style.boxShadow = "0 4px 10px rgba(0,0,0,0.2)";
            btnedit.addEventListener("click", (e)=> {
                e.preventDefault();
                btnedit.innerHTML="updating....";
           dc.doc(id2).update({
                title: `Title ${title.value}`,
                subject: `Subject ${subject.value}`,
                marks: `Marks ${marks.value}`,
                description: `Description ${description.value}`,
                date: date.value,
            }
            ).then(() => {
                console.log("data is updated successfully");
                closeAllForms();
                window.location.reload();
            })
            })
        }) 
        // ================= DELETE FUNCTION =================
        btn1.addEventListener("click", () => {

            // SHOW LOADING
            btn1.innerHTML = "Deleting...";
            btn1.disabled = true;

            btn1.style.opacity = "0.7";
            btn1.style.cursor = "not-allowed";

            dc.doc(id2).delete()
                .then(() => {

                    window.location.reload();

                })
                .catch((error) => {

                    console.log(error);

                    btn1.innerHTML = "Delete";
                    btn1.disabled = false;

                    btn1.style.opacity = "1";
                    btn1.style.cursor = "pointer";

                });

        });

    });

});

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
            let dq = await db1.collection("quizes");
            let data3 = await dq.get();
            let alldata_quizes = [];
            data3.forEach((e) => {
                alldata_quizes.push(e.data());
            });
            
            dataContext = {
                type: "teacher",
                quizzes: alldata_quizes
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
all quizes data=> ${JSON.stringify(dataContext.quizzes)}

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