window.onload = async () => {
    const logged = await verifyLogged();

    if (logged === true) {
        // Inputs.Update(i_stage);
        console.log('User logged');
    }else{
        console.log('User not logged');
    }
}

// console.log(my_dog_form);

const my_dog_form = document.querySelector('form.my_dog_forms');

my_dog_form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData      = new FormData(my_dog_form); 
    // const searchParams  = new URLSearchParams();

    // for (const pair of formData) {
    //     console.log(pair);
    //     searchParams.append(pair[0], pair[1]);
    // }

    // console.log(formData);
    // console.log(formData);

    // console.log(searchParams.getAll('image-aumigo')[0]);
    postFormData(formData, localStorage.getItem('token'));
});


// let i_stage = 0;
// const Inputs = {

//     Input: [
//         {
//             label:      "Foto do Cachorro", 
//             type:       "file", 
//             name:       "dog_file", 
//             id:         "dog_file",
//             required:   "false",
//             hidden:     "false"
//         },

//         {
//             label:      "*Nome do Cachorro", 
//             type:       "text", 
//             name:       "dog_name", 
//             id:         "dog_name",
//             required:   "true",
//             hidden:     "false"
//         },

//         {
//             label:      "*Idade do Cachorro", 
//             type:       "text", 
//             name:       "dog_age", 
//             id:         "dog_age",
//             required:   "true",
//             hidden:     "false"
//         },

//         {
//             label:      "*Genero do Cachorro", 
//             type:       "text", 
//             name:       "dog_genre", 
//             id:         "dog_genre",
//             required:   "true",
//             hidden:     "false"
//         },

//         {
//             label:      "*Raça do Cachorro", 
//             type:       "text", 
//             name:       "dog_breed", 
//             id:         "dog_breed",
//             required:   "true",
//             hidden:     "false"
//         },

//         {
//             label:      "Finalizar", 
//             type:       "button", 
//             name:       "dog_finish", 
//             id:         "dog_finish",
//             required:   "false",
//             hidden:     "true"
//         },

//     ],

//     Next: () => {
//         i_stage += 1;
//         Inputs.Update(i_stage);
//     },
    
// }

// function createInput(label_text, input_type, input_name, input_id, input_required, input_hidden) {
//     let output_to_html      =           
//     `<form action="" onsubmit="Inputs.Next(event, ${input_id})">` +
//         `<input type="${input_type}" name="${input_name}" id="${input_id}" ${input_required === "true" ? "required" : ""} ${input_hidden === "true" ? "hidden" : ""}> ` +
        
//         `<label for="${input_id}">${label_text}</label>` +
        
//         `<button onclick="submit" class="button_home"> Confirmar </button>` + 
//     `</form>`;
    
//     return output_to_html;
// }


// function createDogForms(i) {
//     const input = createInput(  Inputs.Input[i].label, 
//                                 Inputs.Input[i].type, 
//                                 Inputs.Input[i].name, 
//                                 Inputs.Input[i].id,
//                                 Inputs.Input[i].required,
//                                 Inputs.Input[i].hidden
//     );
    
//     const Element           = document.querySelector(".dog_forms");
//     let output_to_html      = input;
    
//     Element.innerHTML       = output_to_html;

//     // console.log(input);
// }
