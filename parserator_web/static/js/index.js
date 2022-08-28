/* TODO: Flesh this out to connect the form to the API and render results
   in the #address-results div. */

//onclick submit form, snag the string and then drop it here

function getUserInput(event) {
   event.preventDefault()


   console.log("check")


   const table = document.querySelector("#address-results > table > tbody");
   const addressTypeHTML = document.querySelector("#address-results > p");
   table.innerHTML = ""
   addressTypeHTML.innerHTML = "Address type: "

   let address = document.getElementById("address").value;


   fetch(`http://localhost:8000/api/parse/?csrfmiddlewaretoken=8cvhuDLNK2wPx7zFR9OnGgXD0hw8gTCnCrml2hkYxDLLwWRnqiC0fLKbDLPZxKER&address=${address}`)
      .then(response => response.json())
      .then(data => {
         console.log(data)

         let {
            address_components,
            address_type,
            repeat
         } = data

         if(repeat === false && address_components.length >0) {
            document.getElementById("address-results").classList.remove('hide');
            document.getElementById("repeat").classList.add('hide')


            addressTypeHTML.innerHTML += `${address_type}`

            address_components.forEach(element => {
               console.log(element)
               table.innerHTML += `<tr><td>  ${element[0]}  </td><td> ${element[1]} </td></tr>`

            })
         }
         else{
            console.log(repeat)
            document.getElementById("repeat").classList.remove('hide')
            document.getElementById("address-results").classList.add('hide');

         }


      })
}