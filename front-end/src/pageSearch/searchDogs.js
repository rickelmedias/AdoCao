async function checkValueSearch  (e) {
    
    if (e.trimStart().trimEnd() != ""){
        const letters = await e.trimStart().trimEnd();

        const apiURL = `http://localhost:3003/aumigos/search/${letters}`;
        
        const response = await fetch(apiURL, {
            method: 'GET'
        }).then(async function(res) {
            res = await res.json();
            return res
        }).catch(function(err) { 
            return `${err}`;
        });
        
        console.log(response);
    }

}