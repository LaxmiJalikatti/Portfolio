let intro = document.getElementById("introText");
let proj = document.getElementById("Project");
let resume = document.getElementById("Resume");
let resumeMsg = document.getElementById("resumeMsg");
let backToTop = document.getElementById("backToTop");
let themeToggle = document.getElementById("themeToggle");
let navLinks = document.querySelectorAll(".nav-link");
let sections = document.querySelectorAll("div[id]");

 
const introPhrases = [
    "Aspiring Software Developer | Solving Problems with Code",
    "DSA Enthusiast | Web Developer",
    "Turning Ideas into Functional Web Apps"
];
let phraseIndex = 0;
let charIndex = 0;
let deleting = false;

function typeLoop(){
    const current = introPhrases[phraseIndex];

    if(!deleting){
        charIndex++;
        intro.textContent = current.slice(0, charIndex);
        if(charIndex === current.length){
            deleting = true;
            setTimeout(typeLoop, 1500);
            return;
        }
    } else {
        charIndex--;
        intro.textContent = current.slice(0, charIndex);
        if(charIndex === 0){
            deleting = false;
            phraseIndex = (phraseIndex + 1) % introPhrases.length;
        }
    }

    setTimeout(typeLoop, deleting ? 40 : 80);
}
typeLoop();

 
proj.addEventListener("click", function(){
    document.getElementById("projects").scrollIntoView({
        behavior: "smooth"
    });
});

 
resume.addEventListener("click", function(){
    resumeMsg.textContent = "Thanks for checking out my resume!";
    resumeMsg.classList.add("show");
    setTimeout(function(){
        resumeMsg.classList.remove("show");
    }, 2500);
});

 
navLinks.forEach(function(link){
    link.addEventListener("click", function(e){
        e.preventDefault();
        const targetId = link.getAttribute("href").substring(1);
        const targetEl = document.getElementById(targetId);
        if(targetEl){
            targetEl.scrollIntoView({ behavior: "smooth" });
        }
    });
});

 
function setActiveLink(){
    let scrollPos = window.scrollY + window.innerHeight / 3;

    sections.forEach(function(section){
        if(
            scrollPos >= section.offsetTop &&
            scrollPos < section.offsetTop + section.offsetHeight
        ){
            navLinks.forEach(function(link){
                link.classList.remove("active");
                if(link.getAttribute("href") === "#" + section.id){
                    link.classList.add("active");
                }
            });
        }
    });
}

 
function toggleBackToTop(){
    if(window.scrollY > 400){
        backToTop.classList.add("show");
    } else {
        backToTop.classList.remove("show");
    }
}

backToTop.addEventListener("click", function(){
    window.scrollTo({ top: 0, behavior: "smooth" });
});

window.addEventListener("scroll", function(){
    setActiveLink();
    toggleBackToTop();
});

 
setActiveLink();
toggleBackToTop();

 
const themeIcon = themeToggle.querySelector("i");

function applyTheme(theme){
    if(theme === "dark"){
        document.body.classList.add("dark-mode");
        themeIcon.classList.remove("fa-moon");
        themeIcon.classList.add("fa-sun");
    } else {
        document.body.classList.remove("dark-mode");
        themeIcon.classList.remove("fa-sun");
        themeIcon.classList.add("fa-moon");
    }
}

 
const savedTheme = localStorage.getItem("portfolio-theme");
if(savedTheme){
    applyTheme(savedTheme);
} else if(window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches){
    applyTheme("dark");
}

themeToggle.addEventListener("click", function(){
    const isDark = document.body.classList.contains("dark-mode");
    const newTheme = isDark ? "light" : "dark";
    applyTheme(newTheme);
    localStorage.setItem("portfolio-theme", newTheme);
});