//Global variables
var imageList;
var body = document.getElementsByTagName("html")[0];
var touchStartX = 0
var touchEndX = 0

//Functions    
function checkSwipe() {
    //Only check if the mobile gallery overlay is enabled
    let overlay = document.getElementById("gallery-overlay-mobile");
    if(overlay.classList.contains("hidden")) return;

    //Only check if the interface is not scaled
    if(Math.abs(window.visualViewport.scale - 1) > 0.1) return;

    if (touchEndX - touchStartX > 200) navigateImages(-1);
    if (touchStartX - touchEndX > 200) navigateImages(1);
}

function filterGallery(button, type)
{
    //let gallery = document.getElementById("gallery");
    //let images = gallery.getElementsByTagName("img");

    for (let i = 0; i < imageList.length; i++) 
    {
        if(type == null)
        {
            imageList[i].classList.remove("hidden");
        }
        else if( imageList[i].classList.contains(type))
        {
            imageList[i].classList.remove("hidden");
        }else
        {
            imageList[i].classList.add("hidden");
        }
    }

    sortImages();

    if(button == null) return;

    let filterButtons = document.getElementById("gallery-filters");
    let selectedButtons = filterButtons.getElementsByClassName("selected");
    for (let i = 0; i < selectedButtons.length; i++) 
    {
        selectedButtons[i].classList.remove("selected");
    }

    button.classList.add("selected");
}

function onGalleryImageClick(image)
{
    let body = document.getElementsByTagName("html")[0];

    let overlay, imgOverlay, titleOverlay, yearOverlay, commOverlay;

    if(checkViewportSize(MOBILE_WIDTH)){
        overlay = document.getElementById("gallery-overlay-mobile");
        imgOverlay = document.getElementById("overlay-image-mobile");

        titleOverlay = document.getElementById("overlay-text-title-mobile");
        yearOverlay = document.getElementById("overlay-text-year-mobile");
        commOverlay = document.getElementById("overlay-text-extra-mobile");
    }else{
        overlay = document.getElementById("gallery-overlay");
        imgOverlay = document.getElementById("overlay-image");

        titleOverlay = document.getElementById("overlay-text-title");
        yearOverlay = document.getElementById("overlay-text-year");
        commOverlay = document.getElementById("overlay-text-extra");
    }

    imgOverlay.dataset.thumbnail = image.src;
    
    imgOverlay.src = image.src;
    imgOverlay.src = image.src.replace("Thumbnails/", "");


    titleOverlay.innerHTML = image.alt;
    yearOverlay.innerHTML = image.dataset.year;
    commOverlay.innerHTML = image.classList.contains("commission") ? "Commission" : "";

    body.style.overflow = "hidden";

    overlay.classList.remove("hidden");

    document.addEventListener("keydown", checkArrowKeys);
}

function navigateImages(dir){
    let overlay, imgOverlay;
    
    if(checkViewportSize(MOBILE_WIDTH)){
        overlay = document.getElementById("gallery-overlay-mobile");
        imgOverlay = document.getElementById("overlay-image-mobile");

    }else{
        overlay = document.getElementById("gallery-overlay");
        imgOverlay = document.getElementById("overlay-image");
    }


    if(overlay.classList.contains("hidden")) return;

    let currentIndex = [...imageList].findIndex(a => a.src === imgOverlay.dataset.thumbnail);

    do{
        currentIndex += dir;

        if(currentIndex == imageList.length) currentIndex = 0;
        else if(currentIndex < 0) currentIndex = imageList.length - 1;
    }
    while(imageList[currentIndex].classList.contains("hidden"));

    

    onGalleryImageClick(imageList[currentIndex]);
}

function checkArrowKeys(event){
    switch (event.key) {
        case 'ArrowLeft':
            navigateImages(-1);
            break;
        case 'ArrowRight':
            navigateImages(1);
    }
}

function showImageTextOverlay(show){
    let textOverlay =  document.getElementById("overlay-image-text");
    if(show){
        textOverlay.style.bottom = "0";
        textOverlay.style.opacity = 1;
    }else{
        textOverlay.style.bottom = -textOverlay.clientHeight+"px";
        textOverlay.style.opacity = 0;
    }
}

function sortImages(){
    
    let gallery =  document.getElementById("gallery");

    var numColumns = 5;

    if(checkViewportSize(MOBILE_WIDTH))
    {
        numColumns = 1;
    }else if(checkViewportSize(MEDIUM_TABLET_WIDTH))
    {
        numColumns = 3;
    }else if(checkViewportSize(LARGE_TABLET_WIDTH))
    {
        numColumns = 4;
    }

    let columns = [];
    let columnWidth = (gallery.clientWidth - ((numColumns-1) * window.innerWidth * 0.01)) / numColumns;

    for (let i = 0; i < numColumns; i++) 
    {
        //initialize columns (0 height for each)
        columns.push(0);
    }

    let imageList = gallery.children;

    for (let i = 0; i < imageList.length; i++) 
    {
        if(imageList[i].classList.contains("hidden")) continue;

        //console.log("image: "+imageList[i].src)
        let min = Math.min.apply(null, columns);
        let index = columns.indexOf(min);
        let xpos = index * columnWidth + index * window.innerWidth * 0.01;

        imageList[i].style.width =columnWidth +"px";
        imageList[i].style.left = xpos+"px";
        imageList[i].style.top = min+"px";


        columns[index] += imageList[i].getBoundingClientRect().height + window.innerWidth * 0.01;
    }

    gallery.style.height = Math.max.apply(null, columns)+"px";

}

function hideImageOverlay(element)
{
    let overlay = element.parentNode;

    //console.log(overlay)
    document.getElementsByTagName("html")[0].style.overflow = "auto";
    overlay.classList.add("hidden"); 
    document.removeEventListener("keydown", checkArrowKeys);
}


//Main execution cycle
window.onload = (event) =>
{
    window.addEventListener('scroll', () => {updateNavbarOnScroll("navbar")});

    let gallery = document.getElementById("gallery");
    imageList = gallery.getElementsByTagName("img");

    for (let i = 0; i < imageList.length; i++) 
    {
        let img = imageList[i];
        imageList[i].addEventListener('click', function(){onGalleryImageClick(img);});
    }

    let overlay = document.getElementById("gallery-overlay");    

    let overlayImg = overlay.getElementsByClassName("overlay-image-box")[0];
    overlayImg.addEventListener('mouseover', function(){
        showImageTextOverlay(true);
    });

    overlayImg.addEventListener('mouseout', function(){
        showImageTextOverlay(false);
    });

    window.addEventListener('resize', function(event) {
        //this.setTimeout(sortImages, 0.5);
        sortImages();
        this.setTimeout(sortImages, 750);
    }, true);

    document.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    })
    
    document.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        checkSwipe();
    })

    window.addEventListener('scroll', () => {updateMobileNavbarOnScroll("navbar-mobile")});

    filterGallery(null, 'nsfw');
    filterGallery(null, 'sfw');
    
    this.setTimeout(sortImages, 1000);
}