async function getBreeds() {
    fetch('http://localhost:3003/breeds', {
        method: 'get',
    })
    .then( (res) => {
        return res.json();
    })
    .then( (breeds) => {
        generateOptionsBreeds(breeds);
    }).catch( (e) => console.error(e) );   
}

function generateOptionsBreeds(breeds) {
    const select = document.querySelector('select#breed_id_breed');
    let output_to_html = "";

    for (const breed of breeds.breed) {
        output_to_html += `<option value="${breed.id_breed}">` +
                          `${breed.breed}` +
                          `</option>` 
    }

    select.innerHTML = output_to_html;
}