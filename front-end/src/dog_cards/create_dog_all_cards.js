window.onload = async () => {
    const logged = await verifyLogged();
    
    if (logged) {
        buttonToCreateDogs();
        console.log('User logged');
    }else{
        console.log('User not logged');
    }

    getDogsFromApiAndCreateCards();
}

function buttonToCreateDogs() {
    const Element           = document.querySelector(".dog_button");
    let output_to_html      =           `<button class="button_home" onclick="location.href = './cadastro'">` +
                                            `Adicionar um novo cachorro` +
                                        `</button>` + 

                                        `<button class="button_home" onclick="location.href = './minha_lista'">` +
                                            `Minha lista de cachorros` +
                                        `</button>`;

    Element.innerHTML       = output_to_html;
}

async function getDogsFromApiAndCreateCards() {
    const api_url = 'http://localhost:3003/aumigos';
    
    const response = await fetch(api_url, {
        method: 'GET'
    }).then(async function(res) {
        res = await res.json();
        return res
    }).catch(function(err) { 
        return `${err}`;
    });

    await createDogsCards(response.aumigos);
};

async function createDogsCards(aumigos) {

    const Element = document.querySelector(".dog_list");
    const DogsArray = aumigos;
    let output_to_html = "";

    for (Dog of DogsArray) {
        const dog_infos     =   await getSpecificDogInfosFromAPI(Dog.id_aumigos);
        const dog_img       =   dog_infos.image_aumigos != null ? 
                                `http://localhost:3003/${dog_infos.image_aumigos}` :
                                '../../assets/dog_none_photo.jpg';
                                                                                        
        output_to_html      +=  `<div class="dog_container">` +
                                    `<img src="${dog_img}" alt="Imagem do cachorro" class="dog_image_container">` +
                                    `<button class="button_home" value="${Dog.id_aumigos}" onclick="Redirect.toDogInformations(${Dog.id_aumigos})">Conhecer Aumigo</button>` +
                                    `<p class="dog_name">${dog_infos.name}</p>` + 
                                `</div>`;
    }

    Element.innerHTML = output_to_html;

}

async function getSpecificDogInfosFromAPI(id) {

    const apiURL = `http://localhost:3003/aumigos/id/${id}`;
    
    const response = await fetch(apiURL, {
        method: 'GET'
    })
    .then( (res) => {
        res = res.json();
        return res;
    })
    .catch((err) => { 
        console.log(err);
    });
    
    return response;

};