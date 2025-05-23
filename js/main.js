//Global variables
var prevScrollpos = window.scrollY;
var prevMobileScrollpos = window.scrollY;
const MOBILE_WIDTH = 500;
const MEDIUM_TABLET_WIDTH = 900;
const LARGE_TABLET_WIDTH = 1200;

const COOKIE_LANGUAGE = "language";
const COOKIE_HONG_SCROLLPOS = "hong_scrollpos";
const COOKIE_HONG_PAGE = "hong_page";

console.log("prevMobileScrollpos: "+prevMobileScrollpos)

//Functions
function checkViewportSize(size)
{
    return window.innerWidth < size;
}

function updateNavbarOnScroll (id) {
    var currentScrollPos = window.scrollY;
    if (prevScrollpos > currentScrollPos) 
    {
        document.getElementById(id).style.top = "0";
    } else if(currentScrollPos > 300)
    {
        document.getElementById(id).style.top = "-12vh";
    }
    prevScrollpos = currentScrollPos;
}

function updateMobileNavbarOnScroll (id) {
    var currentMobileScrollPos = window.scrollY;
    console.log("currentMobileScrollPos: "+currentMobileScrollPos)
    if (prevMobileScrollpos > currentMobileScrollPos) 
    {
        document.getElementById(id).style.top = "0";
    } else if(prevMobileScrollpos < currentMobileScrollPos && currentMobileScrollPos > 300)
    {
        document.getElementById(id).style.top = "-12vh";
    }
    prevMobileScrollpos = currentMobileScrollPos;
}

function toggleMobileMenu(){
    var menu = document.getElementById("menu-mobile-overlay");
    var menu_bg = document.getElementById("menu-mobile-overlay-bg");

    var hidden = menu.classList.contains("hidden-top");
    if(hidden){
        menu.classList.remove("hidden-top");
        menu_bg.classList.remove("hidden");
        document.getElementsByTagName("html")[0].style.overflow = "hidden";
    }
    else{
        menu.classList.add("hidden-top");
        menu_bg.classList.add("hidden");
        document.getElementsByTagName("html")[0].style.overflow = "auto";
    }
    
}

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();

    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}



//Main execution cycle
window.onload = (event) =>
{
    window.addEventListener('scroll', () => {updateMobileNavbarOnScroll("navbar-mobile")});
}