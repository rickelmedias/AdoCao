window.onload = async () => {
    const logged = await verifyLogged();
    getBreeds();

    if (logged === true) {
        console.log('User logged');
    }else{
        console.log('User not logged');
    }
}

function sendPostNewDog(e) {
    e.preventDefault();
    const formData      = new FormData(e.target);
    
    console.log(formData.getAll('image-aumigo'))
    postFormData(formData, localStorage.getItem('token'));

    Redirect.toRoom('..');
};


let imagePreview = document.querySelector('img#picture_preview');

function updateImageChange(e) {
    e.preventDefault();
    
    const [File] = e.target.files;

    if (File) {
        imagePreview.src = URL.createObjectURL(File);
    }
}


/*
 *
 *  CUT IMAGE:
 * 
*/
const cutterContaier = document.querySelector('div#cutter_container');
const picture_preview = document.querySelector('img#picture_preview');

let oldPos;
let x = 0; let y = 0;
function mouseMove (e) {

    const { offsetX: off_x, offsetY: off_y, pageX: px, pageY: py } = e;
    const a = picture_preview.getBoundingClientRect();

    if ( oldPosX < e.pageX ){
        x++;
    }else{
        x--;
    }

    if ( oldPosY < e.pageY ){
        // picture_preview.style.left = `${x}px`;
        // console.log('dir')
        y++;
    }else{
        // picture_preview.style.left = `${-x}px`;
        // console.log('esq');
        y--;
    }
    
    defineTransform(x, y);
}

function defineTransform(x, y) {
    picture_preview.style.transform = `translate(${x}px,${y}px)`;
}

function mouseScroll(e){
    console.log(picture_preview.scrollTop);
    console.log(e.scrollTop);
    // picture_preview.style.transform = `scale(${x}px,${y}px)`;
}


cutterContaier.onmouseover = function () {
    // console.log('On mouse hover!');
    cutterContaier.addEventListener('scroll', mouseScroll);
}


cutterContaier.onmousedown = function (e) {
    oldPosX = e.pageX;
    oldPosY = e.pageY;
    cutterContaier.addEventListener('mousemove', mouseMove);
}

cutterContaier.onmouseup = function () {
    cutterContaier.removeEventListener('mousemove', mouseMove);
    // console.log('Mouse Up !');
}

cutterContaier.onmouseleave = function () {
    // picture_preview.style.transform = `translate(${0}px,${0}px)`;
    // console.log(x,y);
    cutterContaier.removeEventListener('mousemove', mouseMove);
        // console.log('Mouse Leave!');
}

/*
 *
 *  SLIDER IMAGE:
 * 
*/


// function imageSlider_X () {
//     const image_infos = cutterContaier.getBoundingClientRect();
//     console.log(image_infos);
//     console.log(document.querySelector("#picture_preview").naturalHeight);
// }

// imageSlider_X();