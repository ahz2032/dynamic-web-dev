 window.onload = () => {
            // falling animation for 2 seconds
            setTimeout(() => {
                const overlay = document.getElementById('loading-overlay');
                const container = document.getElementById('wishes-container');
                
                overlay.style.opacity = '0';
                setTimeout(() => {
                    overlay.style.display = 'none';
                    container.style.display = 'flex';
                    loadAllWishes();
                }, 1000);
            }, 2000);
        };

    async function loadAllWishes() {
    const response = await fetch('/all-messages'); 
    const wishes = await response.json();
    const list = document.getElementById('wishes-list');
    
    list.innerHTML = wishes.map(w => `
        <div class="wish-item">
            <p>"${w.post}"</p> <small>— ${w.guest}</small> </div>
    `).join('');
}