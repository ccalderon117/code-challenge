/* TODO: Flesh this out to connect the form to the API and render results in the #address-results div. */

//Stores the user's input and passes it to the server that then renders data in which the function can utilize to populate page with said data or message of an error.
function getUserInput(event) {
   //Prevents refreshing of the page
   event.preventDefault()
   //Stores DOM elements in variables to be later modified
   const table = document.querySelector("#address-results > table > tbody");
   const addressTypeHTML = document.querySelector("#address-results > p");
   //Clears previously rendered data
   table.innerHTML = ""
   addressTypeHTML.innerHTML = "Address type: "
   //Stores the user's input.
   let address = document.getElementById("address").value;

   //Runs get request. Sends address input to server to render a response.
   fetch(`http://localhost:8000/api/parse/?csrfmiddlewaretoken=8cvhuDLNK2wPx7zFR9OnGgXD0hw8gTCnCrml2hkYxDLLwWRnqiC0fLKbDLPZxKER&address=${address}`)
      .then(response => response.json())
      .then(data => {
         //Destructring API response components and storing into variables
         let {
            address_components,
            address_type,
            repeat
         } = data
         // Checks to see if user sent valid, non-empty input
         if(repeat === false && address_components.length >0) {
            //Displays address results element, hides error element.
            document.getElementById("address-results").classList.remove('hide');
            document.getElementById("repeat").classList.add('hide')

            //Renders address type to address type element
            addressTypeHTML.innerHTML += `${address_type}`
            //Renders address components to table
            address_components.forEach(element => {
               table.innerHTML += `<tr><td>  ${element[0]}  </td><td> ${element[1]} </td></tr>`

            })
         }
         //If function receives a repeat == true, then error will be displayed.
         else{

            document.getElementById("repeat").classList.remove('hide')
            document.getElementById("address-results").classList.add('hide');

         }


      })
}