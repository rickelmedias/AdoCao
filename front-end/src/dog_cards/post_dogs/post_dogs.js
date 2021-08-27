async function postFormData (body, token) {
    await fetch("http://localhost:3003/aumigos/", {
            method: "post",

            headers: {
                // "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },

            body: body
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