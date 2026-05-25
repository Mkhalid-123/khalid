const firebaseConfig = {
  apiKey: "AIzaSyCZjge0YwVcqxLI2TMDfWvEqwBywMDJo2I",
  authDomain: "project-56e53.firebaseapp.com",
  projectId: "project-56e53",
  storageBucket: "project-56e53.firebasestorage.app",
  messagingSenderId: "188996642263",
  appId: "1:188996642263:web:62976517938a3a16efd792"
};

firebase.initializeApp(firebaseConfig);
let card = document.querySelector(".welcome-card");
let db = firebase.firestore();
let dc = db.collection("quizes");

dc.get().then((s) => {
    s.forEach((snap) => {
        let div = document.createElement("div");

        let p1 = document.createElement("h2");
        let p2 = document.createElement("p");
        let p3 = document.createElement("p");
        let p4 = document.createElement("p");
        let p5 = document.createElement("p");

        p1.innerHTML = snap.data().date || "No date";
        p2.innerHTML = snap.data().description || "No description provided.";
        p3.innerHTML = snap.data().subject || "No subject";
        p4.innerHTML = snap.data().marks || "N/A";
        p5.innerHTML = snap.data().title || "Untitled Quiz";

        div.appendChild(p1);
        div.appendChild(p2);
        div.appendChild(p3);
        div.appendChild(p4);
        div.appendChild(p5);

        card.appendChild(div);

        // CARD CONTAINER STYLE
        card.style.display = "flex";
        card.style.flexWrap = "wrap";
        card.style.justifyContent = "center";
        card.style.gap = "20px";
        card.style.padding = "20px";

        // SINGLE CARD STYLE
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

        // TITLE STYLE
        p1.style.fontSize = "24px";
        p1.style.marginBottom = "10px";
        p1.style.color = "white";

        // PARAGRAPH STYLE
        [p2, p3, p4, p5].forEach((p) => {
            p.style.fontSize = "16px";
            p.style.margin = "6px 0";
            p.style.lineHeight = "1.5";
            p.style.color = "white";
        });

        // DESCRIPTION STYLE
        p5.style.marginTop = "12px";
        p5.style.paddingTop = "10px";
        p5.style.borderTop = "1px solid #ddd";

        // HOVER EFFECT FOR CARD
        div.addEventListener("mouseenter", () => {
            div.style.transform = "translateY(-5px)";
            div.style.boxShadow = "0 8px 25px rgba(0,0,0,0.2)";
        });

        div.addEventListener("mouseleave", () => {
            div.style.transform = "translateY(0)";
            div.style.boxShadow = "0 4px 15px rgba(0,0,0,0.15)";
        });

    });
});
