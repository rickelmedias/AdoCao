async function postFormData (formData, token) {
    await fetch("http://localhost:3003/aumigos/", {
            method: "post",

            headers: {
                "Authorization": "Bearer " + token,
            },

            body: formData
        })
        .then( (res) => {
            return res.text();
        })
        .then( (text) => {
            console.log(text);
        })
        .catch( (e) => {
            console.error('Error (post): ', e);
        });
}