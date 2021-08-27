function sendPostNewDog(e) {
    e.preventDefault();
    const token     = localStorage.getItem('token');
    const body      = new FormData(e.target);

    var dataURL = canvas.toDataURL('image/jpeg', 0.5);
    var blob = dataURItoBlob(dataURL);

    body.append("image-aumigo", blob);
    postFormData(body, token);
    // Redirect.toRoom('..');    
    
};

let ableToCut = true;
let buttonCut = document.querySelector('div#button_crop');

let canvas  = document.getElementById('cutter_container');
canvas.width = 300;
canvas.height = 300;
let canvasWidth = canvas.width;
let canvasHeight = canvas.height;

let ctx     = canvas.getContext('2d');

let SliderElementX = document.getElementById('slider_x');
let SliderElementY = document.getElementById('slider_y');
let SliderElementZ = document.getElementById('slider_zoom');

let imageWidth = 0;
let imageHeight = 0;
let x, y;

let middleX = 0;
let middleY = 0;
let patterZ = 1;
let z = patterZ;

let imagePreview, imagePreview_width, imagePreview_height;

function updateImageChange(e) {
    e.preventDefault();
    const [File] = e.target.files;
    console.log();
    
    if (File) {
        imagePreview        = new Image();
        imagePreview.setAttribute("id", "picture_preview");
        imagePreview.src    = URL.createObjectURL(File);

        imagePreview.onload = function () {
            middleX = (this.naturalWidth/2)-(canvas.width/2);
            middleY = (this.naturalHeight/2)-(canvas.height/2);
            onLoadMove(this.naturalWidth, this.naturalHeight);

            drawCtx(
                middleX, 
                middleY, 
                patterZ);
        };
        

    }
}

function drawCtx (x, y, z) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(imagePreview, x,
                                y,
    300 * z, 300 * z, 0, 0, canvas.width, canvas.height);

}

function onLoadMove(imageWidth, imageHeight) {
    SliderElementX.value = middleX;
    SliderElementY.value = middleY;
    
    SliderElementZ.value    = patterZ;
    SliderElementZ.step     = 0.01;
    SliderElementZ.min      = patterZ - 0.5;
    SliderElementZ.max      = patterZ + 0.5;

    SliderElementX.min = -imageWidth/2;
    SliderElementY.min = -imageHeight/2;
    SliderElementX.max = +imageWidth/2;
    SliderElementY.max = +imageHeight/2;
    
    x = SliderElementX.value; y = SliderElementY.value;
}

SliderElementX.oninput = function() {
    const sliderX = +SliderElementX.value;
    x = middleX + sliderX;
    drawCtx(
        x, 
        y, 
        z);
}

SliderElementY.oninput = function() {
    const sliderY = +SliderElementY.value;
    y = middleY + sliderY;
    drawCtx(
        x, 
        y, 
        z);
}

SliderElementZ.oninput = function() {
    const sliderZ = +SliderElementZ.value;
    z = +sliderZ;
    drawCtx(
        x, 
        y, 
        z);
}

function buttonCropClick() {
    console.log('funcao')
    ableToCut = !ableToCut;
    
    if (ableToCut) {
        SliderElementX.style.display = 'flex';
        SliderElementY.style.display = 'flex';
        SliderElementZ.style.display = 'flex';
    }else{
    // esconder a ferramenta de seleção
    SliderElementX.style.display = 'none';
    SliderElementY.style.display = 'none';
    SliderElementZ.style.display = 'none';

    drawCtx (x, y, z);
    }
}

function dataURItoBlob (dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], {type: mimeString});
}
