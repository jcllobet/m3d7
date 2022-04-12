//import fetch from "node-fetch";

const userArray = [];

const displayName = true;
const displayUsername = true;
const displayEmail = true;

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
        // for each user in array
        // create element
        // add classes
        // add inner html
        // appendChild to parent
        console.log(user);
        const col = document.createElement("div");
        col.className = "my-3 mx-3 col-md-3";
        const card = document.createElement("div");
        card.className = "card";
        if (displayName && displayUsername && displayEmail) {
            card.innerHTML = `
                <div class="card-body">
                    <h5 class="card-title">${user.name}</h5>
                    <p class="card-text">${user.username}</p>
                    <p class="card-text">${user.email}</p>
                    <a href="/detail.html" event= class="btn btn-primary"> Render ${user.id}</a>
                </div>
                `;
        } else {
            card.innerHTML = `
                <div class="card-body">
                    <h5 class="card-title">${user.name}</h5>
                    <a href="/detail.html" event= class="btn btn-primary"> Render ${user.id}</a>
                </div>
                `;
        }

        col.appendChild(card);
        row.appendChild(col);
    });
};

const addDropdown = async (userArray) => {
    const row = document.querySelector(".container .row");
    const dropdown = document.createElement("div");
    dropdown.className = "col-5 my-3 mx-3";
    dropdown.innerHTML = `
    <div class="dropdown show">
        <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink"
            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Filter By
        </a>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
            <a class="dropdown-item" href="#">Name</a>
            <a class="dropdown-item" href="#">Username</a>
            <a class="dropdown-item" href="#">Email</a>
        </div>
    </div>
    `;
    const search = document.createElement("div");
    search.className = "col-5 my-3 mx-3";
    search.innerHTML = `    
        <div class="input-group">
            <div class="form-outline">
            <input type="search" id="form1" class="form-control" />
            <label class="form-label" for="form1">Search</label>
            </div>
            <button type="button" class="btn btn-primary">
            <i class="fas fa-search"></i>
            </button>
        </div>
    `;
    row.prepend(search);
    row.prepend(dropdown);

    // Create a drowpdown element and append it
    // If dropdown == NAME , display only user names
};

const addDropdownListeners = async () => {
    console.log("listeners initated");
    const dropItemArray = document.querySelectorAll("dropdown-item");
    if (dropItemArray.lenght !== 0) {
        dropItemArray.forEach((option) => {
            option.addEventListener("click", handleDropdownFilter);
        });
    } else {
        console.log("item array is empty");
    }
};

const handleDropdownFilter = (event) => {
    console.log("HELLLO");
    if (event.target.innerHTML == "Name") {
        console.log("filter this");
        displayUsername = false;
        displayEmail = false;
        renderUsers(userArray);
    }
};

window.onload = async () => {
    const userArray = await fetchUsers();
    // to be used in UserDetailPage
    //const { id, name, username, email, address, phone, website } = userArray;

    localStorage.setItem("userArray", JSON.stringify(userArray));
    console.log("Logging user array", userArray);
    renderUsers(userArray);
    addDropdown(userArray);
    addDropdownListeners();
};

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
