async function postBreeds (e) {
    e.preventDefault();
    
    const token =  localStorage.getItem('token');
    const breed = e.target.children[1].value;

    fetch('http://localhost:3003/breeds', {
        method: "post",
        
        headers: {
            // 'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },

        body: JSON.stringify({
            "breed": `${breed}`
        })
    })
    .then( (res) => {
        return res.text();
    })
    .then( (res) => {
        console.log(res);
    })
}