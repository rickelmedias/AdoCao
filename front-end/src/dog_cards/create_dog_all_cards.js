function buttonToCreateDogs() {
    const Element           = document.querySelector(".buttons");
    let output_to_html      =           `<div class="dog_button"><div id="button-icons-align">` +
                                        `<img src="../../assets/add_dog_icon.svg" alt="List of dogs">` +
                                        `<button class="button_home" onclick="Redirect.toRoom('cadastro')">` +
                                            `Adicionar um novo cachorro` +
                                        `</button></div>` + 

                                        `<div id="button-icons-align">` +
                                        `<img src="../../assets/my_list_icon.svg" alt="List of dogs">` +
                                        `<button class="button_home" onclick="Redirect.toRoom('minha_lista')">` +
                                            `Minha lista de cachorros` +
                                        `</button></div></div>`;

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
        

        const stringObject = `${Dog.id_aumigos}, ${window.location.host}`;

        output_to_html      +=  `<div class="dog_container">` +
                                    `<img src="${dog_img}" alt="Imagem do cachorro" class="dog_image_container">` +
                                    `<h3 class="dog_name">${dog_infos.name.length > 10 ? dog_infos.name.substring(0,10) + "..." : dog_infos.name}</h3>` + 
                                    `<button class="button_home" value="${Dog.id_aumigos}" onclick="Redirect.toDogInformations('${stringObject}')">Conhecer Aumigo</button>` +
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