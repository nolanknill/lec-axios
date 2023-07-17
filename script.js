const API_KEY = "OADthnHAjCpcMhaj51dHgQv279hoefqsianLCFKR";
const PICTURE_ENDPOINT = "https://api.nasa.gov/planetary/apod?api_key=" + API_KEY;

// grab the time now...
// send a request to get the data from the endpoint
axios
    .get(PICTURE_ENDPOINT)
    .then((response) => {
        const loadingEl = document.querySelector(".photo-of-the-day__loading");
        loadingEl.innerHTML = "";
        
        displayPicture(response.data.title, response.data.hdurl);
    })


function displayPicture(title, imageUrl) {
    const pictureEl = document.querySelector(".photo-of-the-day");

    const titleEl = document.createElement("h2");
    titleEl.innerText = title;

    const imageEl = document.createElement("img");
    imageEl.src = imageUrl;
    imageEl.alt = title;

    pictureEl.appendChild(titleEl);
    pictureEl.appendChild(imageEl);
}
    