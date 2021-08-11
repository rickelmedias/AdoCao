async function getDogInfos() {
    const id = await window.location.href.split("id=")[1];
    const apiURL = await `http://localhost:3003/aumigos/id/${id}`;

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
                            `<aside class="dog_image">` +
                                `<img src="${dog_img}" alt="Imagem do cachorro" class="dog_image_container">` +
                            `</aside>` +
                            `<section class="dog_infos">` +
                                `<p class="dog_name">Nome: ${Dog.name}</p>` + 
                                `<p class="dog_name">Idade: ${Dog.age}</p>` + 
                                `<p class="dog_name">Genero: ${Dog.gender}</p>` + 
                                `<p class="dog_name">Raça: ${Dog.breed}</p>` + 
                            `</section>` +
                            `</div>`;

    Element.innerHTML = output;

};

window.onload = function () {
    createDogPage();
};

// window.addEventListener('scroll', () => {
//     const { clienteHeight, scrollHeigth, scrollTop } = document.documentElement;
    
//     if (scrollTop + clienteHeight >= scrollHeigth - 10) {
//         console.log("Falta 10");
//     }
//     console.log(scrollTop + clienteHeight);
// })