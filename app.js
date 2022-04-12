//import fetch from "node-fetch";

const userArray = [];
// Async Function to Fetch users using await

const fetchUsers = async () => {
    try {
        const response = await fetch(
            "https://jsonplaceholder.typicode.com/users"
        );
        return response.json();
    } catch (error) {
        console.log(err);
    }
};

// Display users onload

const renderUsers = (userArray) => {
    // target the right div
    const row = document.querySelector(".container .row");
    console.log(row);

    userArray.forEach((user) => {
        console.log(user);
        const col = document.createElement("div");
        col.className = "my-3 mx-3 col-md-3";
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML += `
                <img class="card-img-top" src="..." alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title">name</h5>
                    <p class="card-text">username</p>
                    <p class="card-text">email</p>
                    <a href="#" class="btn btn-primary">Go somewhere</a>
                </div>
        `;
        col.appendChild(card);
        row.appendChild(col);
    });
    // for each user in array
    // create element
    // add classes
    // add inner html
    // appendChild to parent
};

window.onload = async () => {
    const userArray = await fetchUsers();
    console.log("Logging user array", userArray);
    renderUsers(userArray);
};

// Create a drowpdown element and append it

// If dropdown == NAME , display only user names

// Add listener to user input text
// Filter input = Glenna

// Ex3) Create a function that, from the list of users, extracts only the names

// Ex4) Create a function that, from the list of users, creates an array of addresses as string and not as an object. Like:
//         {
//         "street": "Victor Plains",
//         "suite": "Suite 879",
//         "city": "Wisokyburgh",
//         "zipcode": "90566-7771",
//         "geo": {
//           "lat": "-43.9509",
//           "lng": "-34.4618"
//         }
//     Should become Victor Plains, Suite 879, Wisokyburgh (90566-7771)

// Ex5) Add a button that sorts the list by name ascending / descending (ONE button)

// Ex6) Add a link on each user, when clicked it must go to a detail page, where to user information are presented (from the API)
// pass the information from the app.js into the userdetail page and render

// Visualize on a Google Map plugin all the users (using lat & lng)
