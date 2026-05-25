const firebaseConfig = {
  apiKey: "AIzaSyCZjge0YwVcqxLI2TMDfWvEqwBywMDJo2I",
  authDomain: "project-56e53.firebaseapp.com",
  projectId: "project-56e53",
  storageBucket: "project-56e53.firebasestorage.app",
  messagingSenderId: "188996642263",
  appId: "1:188996642263:web:62976517938a3a16efd792"
};

firebase.initializeApp(firebaseConfig);
let f = document.querySelector(".submit-form ");
let card = document.querySelector(".welcome-card");
let db = firebase.firestore();
let dc = db.collection("assignment");

dc.get().then((s) => {
    s.forEach((snap) => {

        let div = document.createElement("div");

        let p1 = document.createElement("h2");
        let p2 = document.createElement("p");
        let p3 = document.createElement("p");
        let p4 = document.createElement("p");
        let p5 = document.createElement("p");

        // NEW BUTTON
        let btn = document.createElement("button");

        p1.innerHTML = snap.data().date;
        p2.innerHTML = snap.data().description;
        p3.innerHTML = snap.data().subject;
        p4.innerHTML = snap.data().marks;
        p5.innerHTML = snap.data().title;

        btn.innerHTML = "Submit Assignment";

        div.appendChild(p1);
        div.appendChild(p2);
        div.appendChild(p3);
        div.appendChild(p4);
        div.appendChild(p5);
        div.appendChild(btn);

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

        // BUTTON STYLE
        btn.style.marginTop = "15px";
        btn.style.padding = "10px";
        btn.style.background = "#00bcd4";
        btn.style.color = "white";
        btn.style.border = "none";
        btn.style.borderRadius = "8px";
        btn.style.cursor = "pointer";
        btn.style.fontSize = "14px";

        // HOVER EFFECT FOR CARD
        div.addEventListener("mouseenter", () => {
            div.style.transform = "translateY(-5px)";
            div.style.boxShadow = "0 8px 25px rgba(0,0,0,0.2)";
        });

        div.addEventListener("mouseleave", () => {
            div.style.transform = "translateY(0)";
            div.style.boxShadow = "0 4px 15px rgba(0,0,0,0.15)";
        });

        // BUTTON CLICK EVENT
        btn.addEventListener("click", () => {
        f.style.display="block";
        });

    });
});
document.querySelector(".submit-form").style.cursor="pointer";
function closeForm(){
document.querySelector(".submit-form").style.display = 'none';
}
let id3;
if(localStorage.getItem("id3")===null){
 localStorage.setItem("id3",0);
 id3 = 0;  
}else {
    id3= Number(localStorage.getItem("id3"));
}
let ds = db.collection("student_assignment");
let student_name = document.querySelector("#studentName");
let cloud_name="dxcmdbhlk";
async function cloud() {
    id3++;
    localStorage.setItem("id3",id3);
   document.querySelector("#s").innerHTML="submitting...";
    let s_n = student_name.value;
let file = document.querySelector("#fileUpload").files[0];
if(!file){
    return ;
}
let formdata = new FormData();
formdata.append("file",file);
formdata.append("upload_preset","student_system");
let preset ="student_system";
let url = `https://api.cloudinary.com/v1_1/${cloud_name}/auto/upload`;
let response = await fetch(url, {
 method : "POST" ,
 body : formdata,
})
let data = await response.json();
let img_url = data.secure_url;
 ds.doc(id3.toString()).set({
     name : s_n,
     url :  img_url,
    }).then(()=> {
        window.location.reload();
    })
}



