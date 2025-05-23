function changeLanguage(btn){
    let sel = btn.dataset.language;

    if(language === sel) return;

    switch(sel){
        case "es":
        case "en":
            language = sel;
            updateLanguageButton(sel);
            loadWebtoonImage();
            break;
    }

    setCookie(COOKIE_LANGUAGE, language, 365);
}

function updateLanguageButton(lan)
{
    let allFlags = document.getElementsByClassName("menu-flag");console.log("language cookie is "+lan);
    for(let i=0; i<allFlags.length; i++){
        
        console.log("checking "+allFlags[i].dataset.language);
        if(allFlags[i].dataset.language != lan){
            allFlags[i].classList.add("greyed");
        }else
        {
            allFlags[i].classList.remove("greyed");
        }     
    }
}


//Main execution cycle
window.onload = (event) =>
{
    let cookieLanguage = getCookie(COOKIE_LANGUAGE);
    if(cookieLanguage !== "")
    {
        language = cookieLanguage;
        updateLanguageButton(language);
    }
}