// Get All Dogs

async function getDogsFromAPI() {
    const apiURL = 'http://localhost:3003/aumigos';
    
    return fetch(apiURL, {
        method: 'GET'
    }).then(async function(res) {
        const response = await res.json();
        createDogsCards(response);
        return ;
    }).catch(function(err) { 
        return `${err}`;
    });

};

// Get specific Dog

async function getSpecificDogFromAPI(id) {
    const apiURL = `http://localhost:3003/aumigos/${id}`;
    
    return fetch(apiURL, {
        method: 'GET'
    })
    .then(async function(res) {
        const response = await res.json();
        return response;
    })
    .then(async function(response) {
        return (response);
    })
    .catch(function(err) { 
        return `${err}`
    });

};

// Create cards
async function createDogsCards(promises) {
    const Element = document.querySelector(".dog_list");
    const DogsArray = promises.aumigos;
    let output = "";

    for (Dog of DogsArray) {
        const dog_infos     = await getSpecificDogFromAPI(Dog.id_aumigo);
        const dog_img       =   dog_infos.image_aumigos != null ? 
                                `http://localhost:3003/${dog_infos.image_aumigos}` :
                                '../../assets/dog_none_photo.jpg';

        output  +=          `<div class="dog_container">` +
                            `<img src="${dog_img}" alt="Imagem do cachorro" class="dog_image_container">` +
                            `<button class="button_home">Conhecer Aumigo</button>` +
                            `<p class="dog_name">${dog_infos.name}</p>` + 
                            `</div>`;
    }

    Element.innerHTML = output;

}

window.onload = function () {
    getDogsFromAPI();
};
