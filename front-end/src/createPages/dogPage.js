async function getDogInfos() {
    const id = await window.location.href.split("id=")[1];
    const apiURL = await `http://localhost:3003/aumigos/${id}`;

    const response = await fetch(apiURL, {
        method: 'GET'
    })
    .then(async (res) => {
        res = await res.json();
        return res;
    })
    .catch((err) => { 
        console.log(err);
    });

    return response;
};

async function createDogPage () {
    const res = await getDogInfos();
    const Dog = {
        name: res.name,
        age: res.age,
        gender: res.gender,
        breed: res.breed,
        image: res.image_aumigos,
        id: res.id_aumigos
    }

    const Element = document.querySelector(".dog_card");
    let output = "";
    const dog_img           =   Dog.image != null ? 
                                `http://localhost:3003/${Dog.image}` :
                                '../../assets/dog_none_photo.jpg';

        output  +=          `<div class="dog_container">` +
                            `<img src="${dog_img}" alt="Imagem do cachorro" class="dog_image_container">` +
                            `<div class="dog_name"></div>` + 
                            `<p class="dog_name">${Dog.name}</p>` + 
                            `<p class="dog_name">${Dog.age}</p>` + 
                            `<p class="dog_name">${Dog.gender}</p>` + 
                            `<p class="dog_name">${Dog.breed}</p>` + 
                            `</div>`;

    Element.innerHTML = output;

};

window.onload = function () {
    createDogPage();
};