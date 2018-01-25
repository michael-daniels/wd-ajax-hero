let userInput = "";
let responseData;
let imageID;

document.forms.searchForm.searchButton.addEventListener('click', function() {

  userInput = document.forms.searchForm.searchInput.value;
  //document.forms.searchForm.searchInput.value = null;



  if (userInput !== "") {

    fetch('http://www.omdbapi.com/?apikey=8215cc9d&s=' + userInput) // Call the fetch function passing the url of the API as a parameter
      .then(function(response) {
        // Your code for handling the data you get from the API
        response.json()
        .then(function(data){
          responseData = data["Search"];
          let dataArray = data["Search"];

          for (i = 0; i < dataArray.length; i++) {

            let contentTemplate = `
            <div class="col l4 m6 s12 content-item animated slideInUp"><a href="#main-content"><img id="image${i}" class="content-image-search" src="${dataArray[i].Poster}" onclick="imageClicked(${i})"/></a></div>
            `
            document.getElementById('theContent').innerHTML += contentTemplate;

          }//end for loop

        })//end second .then

      })//end first .then
      .catch(function(err) {
        // This is where you run code if the server returns any errors
        console.log(new Erro(err))

      });

  } else {
    console.log("Shit")
    document.forms.searchForm.searchInput.placeholder = "Input can't be blank";
  }
})

function imageClicked(idx) {
  let infoTemplate = `

    <div id="player"></div>
    <div class="animated fadeIn"><h3>${responseData[idx].Title}</h3></div>
    <div class="animated fadeIn"><h5>Year: ${responseData[idx].Year}</h5></div>
    <div class="animated fadeIn"><h5>Type: ${responseData[idx].Type}</h5></div>
    <div class="animated fadeIn"><h5>IMDB ID: ${responseData[idx].imdbID}</h5></div>
    <iframe width="100%" height="300px" src="https://www.bing.com/videos/search?q=${responseData[idx].Title} trailer"></iframe>

  `
  let imageTemplate = `

    <img class="animated fadeIn content-image-main" src="${responseData[idx].Poster}" />

  `
  document.getElementById('theInfoBox').innerHTML = infoTemplate;
  document.getElementById('theTrailerBox').innerHTML = imageTemplate;

}
