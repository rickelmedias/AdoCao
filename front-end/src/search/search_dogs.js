let lastInputValue = "";

async function checkValueSearch (i) {
    inputValue = i.trimStart().trimEnd();

    if (lastInputValue != inputValue) {
        lastInputValue = inputValue;
        
        if (inputValue == "") {
            getDogsFromApiAndCreateCards();
        }
        else {
            try {
                    const letters = inputValue;

                    const apiURL = `http://localhost:3003/aumigos/search/${letters}`;
                    
                    const response = await fetch(apiURL, {
                        method: 'GET'
                    }).then(async function(res) {
                        res = await res.json();
                        return res
                    }).catch(function(err) { 
                        return `${err}`;
                    });

                    await createDogsCards(response.results);
                    }
            catch(err) {
                console.log(e);
            }
        }
    }

}