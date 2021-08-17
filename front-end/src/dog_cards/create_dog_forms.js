window.onload = async () => {
    const logged = await verifyLogged();
    
    if (logged) {
        createDogForms();
        console.log('User logged');
    }else{
        console.log('User not logged');
    }
}

function createDogForms() {
    const Element           = document.querySelector(".dog_forms");
    let output_to_html      =           `<button class="button_home" onclick="Redirect.toRoom('cadastro')">` +
                                            `Adicionar um novo cachorro` +
                                        `</button>` + 

                                        `<button class="button_home" onclick="Redirect.toRoom('minha_lista')">` +
                                            `Minha lista de cachorros` +
                                        `</button>`;

    Element.innerHTML       = output_to_html;
}
