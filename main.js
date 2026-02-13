const myFavoriteUUIDs = [
    "e11c170a-474f-11e9-aa55-52543be04c81", // LYL Radio (France)
    "434e9a4b-018a-4557-8ca1-8c328bb1e09d", // The Lot Radio (New York, USA)
    "6a7508a9-27ab-11e8-91bf-52543be04c81", // KEXP (Seattle, USA)
    "6dc2ec0f-bb83-4308-916c-570b9476cf5d", // Radio Universidad de Chile
    "8edc3ffb-0252-48e2-bd71-6a1c1c42e824", // Radio Andina Tarata (Peru)

    // not on radio browser but i want to include them:
    "9611296c-0601-11e8-ae97-52543be04c81", // Radio Corazón (Chile)
    "96172671-0601-11e8-ae97-52543be04c81", // VPN (Virtual Public Network)
    "587c48f802778749100155b7", // Radio Stylo, Quellon (Chile)
    "8112", //Radio Parinacota (Chile)
];


// const API_BASE = "https://at1.api.radio-browser.info/json/stations/byuuid?uuids=";
// Gemini Suggestion: Change 'at1' to 'de1' or 'all' 
const API_URL = "https://de1.api.radio-browser.info/json/stations/byuuid?uuids=";

const VIZ_URL = "https://www.youtube.com/embed/ntyKbTLrfxE?autoplay=1&mute=1&loop=1&playlist=ntyKbTLrfxE&controls=0&disablekb=1&modestbranding=1";

const stationList = document.getElementById('station-list');
const audioPlayer = document.getElementById('audio-player');
const statusText = document.getElementById('now-playing');

const videoBtn = document.getElementById('video-toggle');
const videoIframe = document.getElementById('viz-player');
const vizContainer = document.getElementById('viz-container');

loadStations = async () => {
    try {
        stationList.innerHTML = "<li>Loading your favorites...</li>";
        
        // fetching data
        const response = await fetch(API_URL + myFavoriteUUIDs.join(','));
        const stations = await response.json();
        
        stationList.innerHTML = ""; 

        stations.forEach(station => {
            const li = document.createElement('li');
            li.className = "station-item";
            
            // Fallback for missing icons
             const icon = station.favicon ? station.favicon : 'https://via.placeholder.com/50?text=📻';
            
            // Clean up tags (some stations have empty tags)
            const tagDisplay = station.tags ? station.tags.split(',')[0] : 'Radio';

            li.innerHTML = `
                <div class="info">
                    <div class="name">${station.name}</div>
                    <div class="tags">${tagDisplay}</div>
                </div>
            `;

            li.onclick = () => {
                document.querySelectorAll('.station-item').forEach(el => el.classList.remove('active'));
                li.classList.add('active');
                
                statusText.innerText = "Tuning into: " + station.name;
                // Use url_resolved to bypass potential redirect issues
                audioPlayer.src = station.url_resolved;
                audioPlayer.play().catch(e => {
                    console.error("Playback failed", e);
                    statusText.innerText = "Error playing: " + station.name;
                });
            };

            stationList.appendChild(li);
        });
    } catch (err) {
        console.error(err);
        stationList.innerHTML = "<li>Error loading stations. Check your connection or UUIDs!</li>";
    }
}

let isVideoOn = true;

if (videoBtn) {
    videoBtn.addEventListener('click', function() {
        if (isVideoOn) {
            // KILL VIDEO AND HIDE CONTAINER
            videoIframe.src = ""; 
            vizContainer.style.display = "none"; 
            
            this.innerText = "visualizer: OFF";
            isVideoOn = false;
        } else {
            // RESTORE VIDEO AND SHOW CONTAINER
            videoIframe.src = VIZ_URL; 
            vizContainer.style.display = "block"; 
            
            this.innerText = "visualizer: ON";
            isVideoOn = true;
        }
    });
}


loadStations();