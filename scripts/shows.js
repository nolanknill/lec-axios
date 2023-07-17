const SHOWS_ENDPOINT = "https://62f1099325d9e8a2e7c47836.mockapi.io/api/v1/shows";

/*
    // Send a request to API to GET the data!

    // .then -> call displayShows, send that function the shows array
    // .catch -> displayFetchError()
    displayShows();
*/
axios
    .get(SHOWS_ENDPOINT)
    .then((response) => {
        clearShows();
        const tvShows = response.data;
        displayShows(tvShows);
    })
    .catch((error) => {
        console.log(error);
        clearShows();
        displayFetchError();
    });

function displayFetchError() {
    const showsEl = document.getElementById("tv-shows");
    
    const errorEl = document.createElement("span");
    errorEl.innerText = "Service unavailable. Please try again later";

    showsEl.appendChild(errorEl);
}

function clearShows() {
     /* Add all TV Shows to the tv-shows element */
     const tvShowsEl = document.getElementById("tv-shows");
     tvShowsEl.innerHTML = "";
}

function displayShows(tvShows) {
    const tvShowsEl = document.getElementById("tv-shows");
    
    for (let i = 0; i <= tvShows.length - 1; i++) {
        const showEl = createTvShowElement(tvShows[i]);

        showEl.addEventListener("click", function(event) {
            const favShow = document.querySelector(".tv-show--favourited");

            if (favShow === null) {
                event.target.classList.add("tv-show--favourited");
            } else {
                favShow.classList.remove("tv-show--favourited");

                if (favShow !== event.target) {
                    event.target.classList.add("tv-show--favourited");
                }
            }
        })

        tvShowsEl.appendChild(showEl);
    }
}

/*
    Input: show will contain { Title, Rating, Image }
    
    Output: Element object that looks like:
    <article class="tv-show">
        <h2 class="tv-show__title">${show.title}</h2>
        <span class="tv-show__rating">Rating: ${show.rating}</span>
        <img class="tv-show__cover" src="${show.imageSrc}" alt="${show.title} Cover" />
    </article>
*/
function createTvShowElement(show) {
    const showEl = document.createElement("article");
    showEl.classList.add("tv-show");

    const titleEl = document.createElement("h2");
    titleEl.classList.add("tv-show__title");
    titleEl.innerText = show.title;

    const ratingEl = document.createElement("span");
    ratingEl.classList.add("tv-show__rating");
    ratingEl.innerText = "Rating: " + show.rating;
    
    const coverEl = document.createElement("img");
    coverEl.classList.add("tv-show__cover");
    coverEl.setAttribute("src", show.image_src);
    coverEl.setAttribute("alt", show.title + " Cover");
    
    showEl.appendChild(titleEl);
    showEl.appendChild(ratingEl);
    showEl.appendChild(coverEl);

    return showEl;
}


/*
GOAL: create new tv show element with the input information
*/
const form = document.getElementById("add-show");
form.addEventListener("submit", function(event) {      
    event.preventDefault();

    const errors = document.querySelectorAll(".add-show-form__error--show");
    errors.forEach(errorEl => {
        errorEl.classList.remove("add-show-form__error--show");
    })

    const title = event.target.title.value;
    const rating = event.target.rating.value;
    const imageUrl = event.target.imageUrl.value;

    let hasErrors = false;
    
    if (title === "") {
        hasErrors = true
        // show error in dom
        const errorEl = document
            .querySelector(".add-show-form__title-error");
        errorEl.classList.add("add-show-form__error--show");
    }

    if (imageUrl === "") {
        hasErrors = true;
        const errorEl = document
            .querySelector(".add-show-form__image-url-error");
        errorEl.classList.add("add-show-form__error--show");
    }
        
    if (hasErrors) {
      // -> stop processing the form
      return ;
    } 

    // form is valid! Process the info now
    const newShow = {
        title: title,
        rating: rating,
        image_src: imageUrl
    }

    axios
        .post(SHOWS_ENDPOINT, newShow)
        .then(() => { // response param not needed since it isn't used
            // return a promise to use the response in a .then chain!
            return axios.get(SHOWS_ENDPOINT);
        })
        .then((response) => {
            clearShows();
            const tvShows = response.data;
            displayShows(tvShows);
        })
        .catch((error) => {
            console.log("Error: ", error);
            alert("Unable to add TV Show. Sorry about it.");
        })

    event.target.reset();
})