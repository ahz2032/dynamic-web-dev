const wellContainer = document.getElementById('wellContents');

async function loadWishes() {
    const response = await fetch('/all-messages');
    const data = await response.json();
    
    wellContainer.innerHTML = data.map(wish => `
        <div class="wish-card">
            <p>"${wish.post}" - <strong>${wish.guest}</strong></p>
            <button onclick="takeWish(${wish.id})">Take this coin</button>
        </div>
    `).join('');
}

async function tossCoin() {
    const wishInput = document.getElementById('wish');
    const nameInput = document.getElementById('name');

    const response = await fetch('/sign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            wish: wishInput.value,
            name: nameInput.value
        })
    });

    if (response.ok) {
        wishInput.value = '';
        nameInput.value = '';
        loadWishes(); 
    }
}

async function takeWish(id) {
    await fetch(`/take/${id}`, { method: 'DELETE' });
    loadWishes();
}

loadWishes();
