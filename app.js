//import fetch from "node-fetch";

let userArray = [];

const STATE = {
    displayName: true,
    displayUsername: true,
    displayEmail: true,
};

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
    row.innerHTML = "";
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
        console.log(STATE);
        if (STATE.displayName && STATE.displayUsername && STATE.displayEmail) {
            console.log("all is true");
            card.innerHTML += `
                <div class="card-body">
                    <h5 class="card-title">${user.name}</h5>
                    <p class="card-text">${user.username}</p>
                    <p class="card-text">${user.email}</p>
                    <a href="/detail.html" event= class="btn btn-primary"> Render ${user.id}</a>
                </div>
                `;
        } else {
            console.log("only showing name");
            card.innerHTML += `
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
    const row = document.querySelector(".container .row2");
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

const addDropdownListeners = () => {
    const dropItemArray = document.querySelectorAll(".dropdown-item");
    console.log(dropItemArray);
    if (dropItemArray.lenght !== 0) {
        dropItemArray.forEach((option) => {
            option.addEventListener("click", handleDropdownFilter);
        });
        console.log("listeners initated");
    } else {
        console.log("item array is empty");
    }
};

const handleDropdownFilter = (event) => {
    console.log(event.target.innerHTML);
    if (event.target.innerHTML.toLowerCase() == "name") {
        console.log("filtering by name");
        STATE.displayUsername = false;
        STATE.displayEmail = false;
        console.log("STATE", STATE);
        console.log("GLOBAL", userArray);
        renderUsers(userArray);
    } else {
        console.log("something is not working");
    }
};

// Ex3) Create a function that, from the list of users, extracts only the names

const userNames = (userArray) => {
    let userNameArr = [];
    userArray.forEach((user) => {
        userNameArr = [...userNameArr, user.name];
    });
    return userNameArr;
};

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

const userAddress = (userNameArr, userArray) => {
    let userAddressArr = [];
    let addressArr = [];
    userArray.forEach((user) => {
        let obj = {
            name: user.name,
            addressString: "",
        };
        let tempString = "";
        tempString += user.address.street + ", ";
        tempString += user.address.suite + ", ";
        tempString += user.address.city + ", ";
        tempString += `(${user.address.zipcode})`;
        obj.addressString = tempString;
        userAddressArr = [...userAddressArr, obj];
    });
    return userAddressArr;
};

window.onload = async () => {
    const data = await fetchUsers();
    userArray = [...data];
    // to be used in UserDetailPage
    //const { id, name, username, email, address, phone, website } = userArray;

    localStorage.setItem("userArray", JSON.stringify(userArray));
    console.log("Logging user array", userArray);
    renderUsers(userArray);
    addDropdown(userArray);
    addDropdownListeners(userArray);
    userNames(userArray);
    console.log(userNames(userArray));
    userAddress(userNames(userArray), userArray);
    console.log(userAddress(userNames(userArray), userArray));
};

// Add listener to user input text
// Filter input = Glenna

// Ex5) Add a button that sorts the list by name ascending / descending (ONE button)

// Ex6) Add a link on each user, when clicked it must go to a detail page, where to user information are presented (from the API)
// pass the information from the app.js into the userdetail page and render

// Visualize on a Google Map plugin all the users (using lat & lng)
