// let backgroundOption = true;
// let backgroundInterval;



// Settings Box
document.querySelector(".toggle-settings .fa-gear").onclick = function (){
    this.classList.toggle("fa-spin")

    document.querySelector(".setting-Box").classList.toggle("open");
};

//Local Storage of colors

let mainColors = localStorage.getItem("color_option")
if (mainColors !== null) {
    // console.log("it's not Empty");

    document.documentElement.style.setProperty('--main-color' , mainColors);

    document.querySelectorAll(".colors-list li").forEach(element =>{
        element.classList.remove("active");
 
        if (element.dataset.color === mainColors) {
        element.classList.add("active");
            
        }
    });
    
}
// options colors 

const colorslist= document.querySelectorAll(".colors-list li")

colorslist.forEach(li =>{
    li.addEventListener("click",(e)=>{

        // console.log(e.target.dataset.color);

        document.documentElement.style.setProperty('--main-color',e.target.dataset.color);

        localStorage.setItem("color_option",e.target.dataset.color);

        handleActive(e);

    });
});

//     random-backgrounds options

const randomBackEl= document.querySelectorAll(".random-backgrounds  span")

randomBackEl.forEach(span =>{
    span.addEventListener("click",(e)=>{

        // console.log(e.target.dataset.color);

        handleActive(e);
        
        if (e.target.dataset.background ==='yes') {
            backgroundOption = true;
            randomizeImgs();
            localStorage.setItem("background_option" , true);
        } else {
            backgroundOption = false;
            clearInterval(backgroundInterval);
            localStorage.setItem("background_option" , false);

        }

    });
});


//Local Storage of backgroundImages
let backgroundOption = true;
let backgroundInterval;

let backgroundLocalItem = localStorage.getItem("background_option")

if (backgroundLocalItem !== null) {
    if (backgroundLocalItem === 'true') {
        backgroundOption = true;
    } else {
        backgroundOption = false;

    }
    document.querySelectorAll(".random-backgrounds span").forEach(element => {
        element.classList.remove("active");
    });

    if (backgroundLocalItem === 'true') {
        document.querySelector(".random-backgrounds .yes").classList.add("active")
    } else {
        document.querySelector(".random-backgrounds .no").classList.add("active")

    }
}


// LandingPage
let LandingPage = document.querySelector(".landing-page");

let imagesArray =["bg1.jpeg","bg2.jpeg","bg3.jpeg","bg4.jpeg","bg5.jpeg",];




//     random-backgrounds options



function randomizeImgs() {

    if (backgroundOption ===true) {
        backgroundInterval= setInterval(()=>{
            let randomNumber = Math.floor(Math.random()*imagesArray.length);
        
            LandingPage.style.backgroundImage = 'url("images/' + imagesArray[randomNumber]+'")';
        
        
        },3000)
    }
    
}
randomizeImgs();


// skills selectors

let ourSkills = document.querySelector(".skills");
window.onscroll = function () {

    let skillsOffsetTop = ourSkills.offsetTop;

    let skillsOuterHeight = ourSkills.offsetHeight;

    let windowHeight = this.innerHeight;

    let windowScrollTop = this.pageYOffset;

    if (windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight)) {

        // this.console.log('reached')

        let allSkills = document.querySelectorAll(".skill-box .skill-progress span");
        
        allSkills.forEach(skill => {

            skill.style.width = skill.dataset.progress ; 
        });
    }
    
};

// create popup for images
let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach(img => {
    img.addEventListener('click',(e)=> {

    let overLay = document.createElement("div");

    overLay.className = "popup-overLay";

    document.body.appendChild(overLay);

    let popupBox = document.createElement("div");

    popupBox.className = 'popup-box';

    if (img.alt !== null) {
        let imgHeading = document.createElement("h3");

        let imgText = document.createTextNode(img.alt);

        imgHeading.appendChild(imgText); 
        
        popupBox.appendChild(imgHeading);
        
    }

    let popupImage = document.createElement("img");

    popupImage.src = img.src;

    popupBox.appendChild(popupImage);

    document.body.appendChild(popupBox);

// close popup 


    let closeButton = document.createElement("span");

    let closeButtonText = document.createTextNode("x");

    closeButton.appendChild(closeButtonText);

    closeButton.className = 'close-button';
    
    popupBox.appendChild(closeButton);
   
    });
});


// close popup 
document.addEventListener("click", function (e) {
        // console.log('remove');

    if (e.target.className == 'close-button') {
        
        e.target.parentNode.remove();

        document.querySelector(".popup-overLay").remove();

    }

});


// start part of Bullets and scroll
const allBullet = document.querySelectorAll(".nav-bullets .bullet");
const allLinks = document.querySelectorAll(".links li a");

function scrollSmooth(elements) {

    elements.forEach(ele =>{

        ele.addEventListener("click",(e) =>{
            e.preventDefault();
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior: 'smooth'
            })
        })
    })
    
}
scrollSmooth(allBullet);
scrollSmooth(allLinks);


function handleActive(ev){

    ev.target.parentElement.querySelectorAll(".active").forEach(element =>{
        element.classList.remove("active");
    });
    ev.target.classList.add("active");

};

let bulletSpan = document.querySelectorAll(".bullets-option span");
let bulletContainer = document.querySelector(".nav-bullets");
let bulletLocalItem = localStorage.getItem(".bullets-option")

if (bulletLocalItem !== null) {
    bulletSpan.forEach(span => {
        span.classList.remove("active");
    });

    if (bulletLocalItem === 'block') {
        bulletContainer.style.display = 'block';

        document.querySelector(".bullets-option .yes").classList.add("active");

        
    } else {
        bulletContainer.style.display = 'none';

        document.querySelector(".bullets-option .no").classList.add("active");
        
    }
    
}

bulletSpan.forEach(span =>{

    span.addEventListener("click",(e) => {

        if (span.dataset.display ==='show') {
            bulletContainer.style.display = 'block';

         localStorage.setItem(".bullets-option",'block');

    
        } else {
            bulletContainer.style.display = 'none';

          localStorage.setItem(".bullets-option",'none');

    
        }
        handleActive(e);
    });
});

// reset Button

document.querySelector(".reset-option").onclick = function () {

    // localStorage.clear();    ف الموقع كلو انما اللى تحت هيحذف اللى انا محدده بس localStorageهنا هنحذف كل حاجه ف ال 
    localStorage.removeItem("color_option");
    localStorage.removeItem("background_option");
    localStorage.removeItem("bullets-option");

    // reload window 

    window.location.reload();
    
}

// toggle Menu

let toggleBtn = document.querySelector(".toggle-menu");
let tLinks = document.querySelector(".links");

toggleBtn.onclick = function (e) {
    e.stopPropagation();
    this.classList.toggle("menu-active");

    tLinks.classList.toggle("open")
};

// click anywhere outside menu and close menu

document.addEventListener("click",(e) =>{

    if (e.target !==toggleBtn && e.target !== tLinks) {

        if (tLinks.classList.contains("open")) {

            toggleBtn.classList.toggle("menu-active");

            tLinks.classList.toggle("open");
        }
    }
})

tLinks.onclick = function (e) {
    e.stopPropagation();
    
}