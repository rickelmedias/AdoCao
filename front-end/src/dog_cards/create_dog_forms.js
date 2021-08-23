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


function updateImageChange(e) {
    e.preventDefault();
    const image = document.querySelector('img#picture_currently');
    
    const [File] = e.target.files;

    if (File) {
        image.src = URL.createObjectURL(File);
    }
}
