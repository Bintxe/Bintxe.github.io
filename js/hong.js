//Global variables
var descHong = ["Raven", "Hong", "56", "Unknown","<p>Everyone around Lake Kivu knows who the forest hermit is, but no one really knows her.</p><p>A martial arts master and survival expert, Raven Hong will take on any guerrilla or army single-handedly to defend her people no matter how ruthless and cruel they may be.</p><p>Memories of her past make her realize daily that she was not so different from the people she fights against.</p>"];
var descMagambo = ["Paul", "Magambo", "41", "Rwanda", "<p>Equal parts political leader, businessman and warlord, he heads the Movement for the Defense of the People, a rebel military group based in eastern Democratic Republic of Congo.</p><p>Thanks to the movement, Magambo controls important deposits of rare earths from which he has made his fortune.</p>"];
var descEbba = ["Ebba", "Brouwer", "66", "Netherlands","<p>Director of the Brouwer Foundation (Brofound), an NGO assigned in the Democratic Republic of Congo with the mission of denouncing human rights violations.</p><p>Her altruistic sensitivity leads her to help those most in need, although she can be deluded and overconfident.</p>"];
var descThulani = ["Samuel", "Thulani", "62", "South Africa","<p>As a colonel in the United Nations peacekeeping forces, Thulani acts as Brofound's security advisor and Ebba's right-hand man.</p><p>His long career in the military has given him a great knowledge of warfare, which has made him highly cautious and suspicious.</p>"];
var descAsh = ["Ashleen Murphy", '"Ash"', "27", "Ireland","<p>Ash is a Blue Helmets soldier working with Brofound and her mission is to get its members home in one piece.</p><p>True, she may have only served briefly in her country's military and has no actual combat experience, but she is proactive and a team player according to her resume.</p>"];
var descViktor = ["Viktor", "Sokolov", "25", "Russia","<p>Tired of writing articles about “simple avocado recipes for divorcees” for an online newspaper, Viktor set out to travel to Africa and try his hand at gonzo journalism.</p><p>He accompanies the Brofound team to write a report on the illegal coltan trade.</p><p>His cocky personality and his fondness for tobacco give him away as a journalist.</p>"];

//Preload images


//Functions
function selectCharacter(character){
    let characterBox = document.getElementById("character-box");

    let charContent;
    let charImage = characterBox.querySelector( '.main-image:not(.invisible)');


    //Check if we are in mobile or desktop
    if(checkViewportSize(MOBILE_WIDTH)){
        charContent = document.getElementById("character-box-mobile");
        
    }else{
        charContent = characterBox.getElementsByClassName("inside-paragraph")[0];
    }

    let charName = charContent.getElementsByClassName("char-name")[0];
    let charSurame = charContent.getElementsByClassName("char-surname")[0];
    let charAge = charContent.getElementsByClassName("char-age")[0];
    let charNation = charContent.getElementsByClassName("char-nationality")[0];
    let charDesc = charContent.getElementsByClassName("char-description")[0];


    //Return if the button of the currently displayed character is pressed
    if(characterBox.dataset.character != character)
    {
    
        charContent.classList.add("invisible");
        if(charImage) charImage.classList.add("invisible");

        characterBox.dataset.character = character;

        
    }

    this.setTimeout(function(){
        switch(character){
            case "Hong":
                charName.innerHTML = descHong[0];
                charSurame.innerHTML = descHong[1];
                charAge.innerHTML = descHong[2];
                charNation.innerHTML = descHong[3];
                charDesc.innerHTML = descHong[4];
                
                characterBox.getElementsByClassName("main-image")[0].classList.remove("invisible");
                break;
            case "Magambo":
                charName.innerHTML = descMagambo[0];
                charSurame.innerHTML = descMagambo[1];
                charAge.innerHTML = descMagambo[2];
                charNation.innerHTML = descMagambo[3];
                charDesc.innerHTML = descMagambo[4];
                
                characterBox.getElementsByClassName("main-image")[1].classList.remove("invisible");
                break;
            case "Ebba":
                charName.innerHTML = descEbba[0];
                charSurame.innerHTML = descEbba[1];
                charAge.innerHTML = descEbba[2];
                charNation.innerHTML = descEbba[3];
                charDesc.innerHTML = descEbba[4];
                
                characterBox.getElementsByClassName("main-image")[2].classList.remove("invisible");
                break;
            case "Thulani":
                charName.innerHTML = descThulani[0];
                charSurame.innerHTML = descThulani[1];
                charAge.innerHTML = descThulani[2];
                charNation.innerHTML = descThulani[3];
                charDesc.innerHTML = descThulani[4];
                
                characterBox.getElementsByClassName("main-image")[3].classList.remove("invisible");
                break;
            case "Ash":
                charName.innerHTML = descAsh[0];
                charSurame.innerHTML = descAsh[1];
                charAge.innerHTML = descAsh[2];
                charNation.innerHTML = descAsh[3];
                charDesc.innerHTML = descAsh[4];
                
                characterBox.getElementsByClassName("main-image")[4].classList.remove("invisible");
                break;
            case "Viktor":
                charName.innerHTML = descViktor[0];
                charSurame.innerHTML = descViktor[1];
                charAge.innerHTML = descViktor[2];
                charNation.innerHTML = descViktor[3];
                charDesc.innerHTML = descViktor[4];
                
                characterBox.getElementsByClassName("main-image")[5].classList.remove("invisible");
                break;
        }

        charContent.classList.remove("invisible");
    }, 200);

    let buttons = document.getElementById("char-selection").children;
    for(let i=0; i<buttons.length; i++)
    {
        if(buttons[i].dataset.character != character){
            buttons[i].classList.remove("selected");
        }else if(!buttons[i].classList.contains("selected")){
            buttons[i].classList.add("selected");
        }
    }
    
}


//Main execution cycle
window.onload = (event) =>
{
    document.getElementsByClassName("main-box")[0].classList.remove("invisible");

    window.addEventListener('scroll', () => {updateMobileNavbarOnScroll("navbar-mobile")});

    selectCharacter(document.getElementById("char-selection").children[1].dataset.character);

    window.addEventListener('resize', function(event) {
        selectCharacter(document.getElementById("character-box").dataset.character);
    }, true);
}