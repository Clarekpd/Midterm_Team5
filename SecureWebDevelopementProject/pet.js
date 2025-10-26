function loadPetInfo() {    
    // Get the query string (e.g., ?name=Fluffy)
    const params = new URLSearchParams(window.location.search);
    const petName = params.get('name');

    // Get stored pet data
    const storedPets = JSON.parse(localStorage.getItem("allPets")) || [];

    // Find the chosen pet
    const pet = storedPets.find(p => p.name === petName);

    const maincontainer = document.getElementById('pet-info');

    maincontainer.innerHTML = '';

    if (!pet) {
        maincontainer.innerHTML = `<p>Pet not found.</p>`;
    } else {
        const container = document.createElement('div');
        container.className = 'd-flex align-items-start gap-3';
        
        const col = document.createElement('div');
        col.className = 'col-sm-7 col-md-4 col-lg-3';

        col.innerHTML = `
            <div class="card-body d-flex flex-column">
                <h1>${pet.name}</h1>
                <img src="${pet.img}" alt="${pet.name}" width="250" style="object-fit:cover;">
                <p><strong>Species:</strong> ${pet.type || 'Unknown'}</p>
            </div>
        `;

        const interactionDiv = document.createElement("interactions");
        interactionDiv.className = 'd-flex flex-column gap-5';

        const pet_info = document.createElement('div');
        pet_info.className = 'p d-flex flex-column gap-5';
        const interactions = pet.interactionModule;

        interactions.forEach((interaction) => {
            const btn = document.createElement("button");
            btn.textContent = interaction.action;
            interactionDiv.appendChild(btn);

            const info_text = document.createElement('p');
            info_text.textContent = `${interaction.status}: ${interaction.increment}`;
            info_text.className = 'me-2 mb-2';
            pet_info.appendChild(info_text);

            const orginalIncrement = interaction.increment;

            setInterval(() => {
                if (interaction.increment > 0) {
                    if (interaction.status == 'energy'){
                        interaction.increment -= 1;
                        info_text.textContent = `${interaction.status}: ${interaction.increment}`;
                    }
                }
            }, (Math.random() * (1000 - 3000) + 3000));

            setInterval(() => {
                if (interaction.increment > 0) {
                    if (interaction.status == 'happiness'){
                        interaction.increment -= 1;
                        info_text.textContent = `${interaction.status}: ${interaction.increment}`;
                    }
                }
            }, (Math.random() * (1000 - 4500) + 4500));

            setInterval(() => {
                if (interaction.increment > 0) {
                    if (interaction.status == 'behavior'){
                        interaction.increment -= 1;
                        info_text.textContent = `${interaction.status}: ${interaction.increment}`;
                    }
                }
            }, (Math.random() * (1000 - 6000) + 6000));

            setInterval(() => {
                if (interaction.increment > 0) {
                    if (interaction.status == 'hygine'){
                        interaction.increment -= 1;
                        info_text.textContent = `${interaction.status}: ${interaction.increment}`;
                    }
                }
            }, (Math.random() * (1000 - 7000) + 7000));

            btn.onclick = () => {
                // alert(`${pet.name} ${interaction.action.toLowerCase()}!`);
                if (interaction.increment < orginalIncrement) {
                    interaction.increment += 1;
                    info_text.textContent = `${interaction.status}: ${interaction.increment}`;
                }
            }

        });
        
        container.appendChild(col);
        container.appendChild(interactionDiv);
        container.appendChild(pet_info);

        maincontainer.appendChild(container);
    }
}

document.getElementById('btnCaring').addEventListener('click', function() {
    window.location.href = 'index.html';
});

document.getElementById('btnAbout').addEventListener('click', function() {
    window.location.href = 'about.html';
});

loadPetInfo();