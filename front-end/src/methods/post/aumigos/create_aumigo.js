// Create button to make new dogs
function buttonToCreateDogs() {

    const Element = document.querySelector(".dog_button");
    let output    =         `<button class="button_home" onclick="location.href = './cadastro'">` +
                            `Adicionar um novo cachorro` +
                            `</button>` + 
                            `<button class="button_home" onclick="location.href = './minha_lista'">` +
                            `Minha lista de cachorros` +
                            `</button>`;

    Element.innerHTML = output;

}

window.onload = async () => {
    /* Check if user is logged to create and make aumigos*/
    
    const logged = await verifyLogged();
    
    if (logged) {
        buttonToCreateDogs();
        console.log('User logged');
        
    }else{
        console.log('User not logged');
    }

    getDogsFromAPI();
}