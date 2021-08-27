async function getMyDogList() {
    const token  = `${localStorage.getItem('token')}`
    const apiURL = `http://localhost:3003/aumigos/mylist`;
    
    const response = await fetch(apiURL, {
        method: 'get',

        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    .then( (res) => {
        res = res.json();
        return res;
    })
    .then( (res) => {
        createDogsCards(res.id_aumigos);
    })
    .catch((err) => { 
        console.log(err);
    });
    
    return response;

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