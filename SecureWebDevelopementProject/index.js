let allPets = [];

const fetchData = () => {
    console.log("Begin fetch >");
    fetch("./data.json")
        .then(response => response.json())
        .then((myPets) => {
            console.log(myPets);
            allPets = myPets;
            loadPets(myPets);
        })
        .catch(error => console.log("Error:" + error));
    console.log("End fetch <");
}


function loadPets(data) {
    // Target the existing container in the provinteractioned HTML. Fall back to an element
    // with interaction 'pets' if present to remain compatible with previous versions.
    const mainContainer = document.getElementById('card-container');

    if (!mainContainer) {
        console.warn('No pet container found (#card-container)');
        return;
    }

    // Normalize incoming data into an array of pet objects
    let pets = [];
    if (!data) {
        pets = [];
    } else if (Array.isArray(data)) {
        pets = data;
    } else if (Array.isArray(data.pets)) {
        pets = data.pets;
    } else if (Array.isArray(data.data)) {
        pets = data.data;
    } else if (typeof data === 'object') {
        pets = Object.values(data);
    }

    // Clear existing content
    mainContainer.innerHTML = '';

    if (pets.length === 0) {
        mainContainer.innerHTML = '<div class="col-12"><p class="text-muted">No pets to adopt!.</p></div>';
        return;
    }

    for (let pet of pets) {
        const col = document.createElement('div');
        col.className = 'col-sm-6 col-md-4 col-lg-3';

        const card = document.createElement('div');
        card.className = 'card h-100 shadow-sm';

        const img = pet.img || 'https://via.placeholder.com/300x450?text=No+Image';
        const name = pet.name || 'Unnamed';

        card.innerHTML = `
            <div class="card-body d-flex flex-column">
                <h5 class="card-name">${name}</h5>
                <img src="${img}" class="card-img-top" alt="${name}" style="object-fit:cover;" />            
                <p class="card-text">Care Information: </p>
            </div>
        `;
        console.log(card);

        const pet_info = document.createElement('div');
        pet_info.className = 'p';

        const interactions = pet.interactionModule;

        interactions.forEach((interaction) => {
            const info_text = document.createElement('p');
            info_text.textContent = `${interaction.action}`;
            info_text.className = 'me-2 mb-2';
            pet_info.appendChild(info_text);
        });
    
        const select = document.createElement('button');
        select.textContent = "Care for " + pet.name;
        select.className = 'btn btn-sm btn-success w-100';
        select.onclick = (() => {
            localStorage.setItem("allPets", JSON.stringify(allPets.pets || allPets));
            // window.open(`pet.html?name=${encodeURIComponent(pet.name)}`);
            window.location.href = `pet.html?name=${encodeURIComponent(pet.name)}`;
        });


        pet_info.appendChild(select);
        card.appendChild(pet_info);
        col.appendChild(card);
        mainContainer.appendChild(col);

    }
}

document.getElementById('btnCaring').addEventListener('click', function() {
    window.location.href = 'index.html';
});

document.getElementById('btnAbout').addEventListener('click', function() {
    window.location.href = 'about.html';
});

function getData() {
    const m = document.getElementById("petImg");
    const inputPetName = m.value.trim().toLowerCase();

    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";

    // filter pets that match the input
    const filteredPets = allPets.pets.filter(pet =>
        pet.name.toLowerCase().includes(inputPetName)
    );

    // if no match found, show message
    if (filteredPets.length === 0) {
        cardContainer.innerHTML = "<p>No pet found.</p>";
        return;
    }

    // display filtered pets
    loadPets({ pets: filteredPets });
}

fetchData();