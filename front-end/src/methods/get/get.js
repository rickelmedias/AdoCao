// Get All Dogs

async function getDogsFromAPI() {
    const apiURL = 'http://localhost:3003/aumigos';
    
    const response = await fetch(apiURL, {
        method: 'GET'
    }).then(async function(res) {
        res = await res.json();
        return res
    }).catch(function(err) { 
        return `${err}`;
    });

    await createDogsCards(response.aumigos);
};

// Get specific Dog

async function getSpecificDogFromAPI(id) {

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

// Create cards
async function createDogsCards(aumigos) {

    const Element = document.querySelector(".dog_list");
    const DogsArray = aumigos;
    let output = "";

    for (Dog of DogsArray) {
        const dog_infos     =   await getSpecificDogFromAPI(Dog.id_aumigos);
        const dog_img       =   dog_infos.image_aumigos != null ? 
                                `http://localhost:3003/${dog_infos.image_aumigos}` :
                                '../../assets/dog_none_photo.jpg';

        output  +=          `<div class="dog_container">` +
                            `<img src="${dog_img}" alt="Imagem do cachorro" class="dog_image_container">` +
                            `<button class="button_home" value="${Dog.id_aumigos}" onclick="redirectWithId(${Dog.id_aumigos})">Conhecer Aumigo</button>` +
                            `<p class="dog_name">${dog_infos.name}</p>` + 
                            `</div>`;
    }

    Element.innerHTML = output;

}

// window.onload = function () {
//     getDogsFromAPI();
// };
