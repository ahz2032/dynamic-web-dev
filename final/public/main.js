window.onload = () => {
    console.log(document.body);

    //ALWAYS call your functions in window onload
    init()
};

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


loadWishes();

async function tossCoin() {
    const wishInput = document.getElementById('wish');
    const nameInput = document.getElementById('name');

    // popup window
    const popup = window.open("", "WishingWell", "width=400,height=400,top=200,left=500");
    
    // <pre> tag to the popup
    popup.document.write(`
        <html>
            <head>
                <link href="https://fonts.googleapis.com/css2?family=Jacquard+24&display=swap" rel="stylesheet">
                <style>
                    body {
                    background: black; 
                    display: flex; 
                    justify-content: center; 
                    align-items: center; 
                    height: 100vh; 
                    margin: 0; 
                    overflow: hidden; 
                    color: white;
                    }

                    pre { 
                    font-family: "Courier New", Courier, monospace; 
                    font-size: 2.5vh; 
                    line-height: 1;
                    letter-spacing: 0;
                    white-space: pre; 
                    margin: 0;
                    padding: 0;
                    display: inline-block;
                    }
                </style>
            </head>
            <body>
                <pre id="display"></pre>
                <audio id="coinSound" src="magic.mp3" autoplay></audio>
            </body>
            <script>
            document.getElementById('coinSound').play().catch(e => console.log("Playback blocked"));
            </script>
        </html>
    `);

    const display = popup.document.getElementById('display');
    const frames = [
`
         ████████████    
      ████░░░░░░░░░░░░████        
    ██░░░░▒▒▒▒▒▒▒▒▒▒▒▒░░░░██         
  ██░░▒▒░░░░      ░░░░░░  ░░██      
  ██░░▒▒░░░░      ░░░░░░  ░░██      
██░░▒▒░░░░░░  ░░░░▒▒░░░░░░  ░░██    
██░░▒▒░░      ░░░░░░  ░░░░  ░░██    
██░░▒▒░░  ░░░░░░░░░░░░▒▒░░  ░░██    
██░░▒▒░░  ░░░░░░░░░░░░▒▒░░  ░░██     
██░░▒▒░░░░▒▒░░░░░░▒▒▒▒▒▒░░  ░░██    
██░░▒▒░░░░░░  ░░░░▒▒░░░░░░  ░░██     
  ██░░▒▒░░░░░░▒▒▒▒▒▒░░░░  ░░██      
  ██░░░░  ░░░░░░░░░░░░  ░░░░██      
    ██░░░░            ░░░░██         
      ████░░░░░░░░░░░░████          
          ████████████                
`,
`
        ████████████                  
      ██░░░░░░░░░░░░██            
    ██░░▒▒▒▒▒▒▒▒▒▒░░░░██         
  ██░░▒▒░░░░░░░░░░  ░░░░██            
  ██░░▒▒░░    ░░░░  ░░░░██        
██░░▒▒░░░░  ░░▒▒░░░░  ░░░░██      
██░░▒▒      ░░░░  ░░  ░░░░██      
██░░▒▒  ░░░░░░░░░░▒▒  ░░▒▒██      
██░░▒▒  ░░░░░░░░░░▒▒  ░░▒▒██     
██░░▒▒░░▒▒░░░░▒▒▒▒▒▒  ░░▒▒██      
██░░▒▒░░░░  ░░▒▒░░░░  ░░▒▒██      
  ██░░▒▒░░░░▒▒▒▒░░  ░░▒▒██        
  ██░░▒▒░░░░░░░░░░  ░░▒▒██        
    ██░░          ░░▒▒██          
      ██░░░░░░░░░░▒▒██            
        ████████████      
                                      
`,
     `
         ████████         
       ██░░░░░░░░██       
       ██░░▒▒░░░░██      	
     ██░░▒▒░░  ░░░░██     
     ██░░▒▒    ░░░░██      
     ██░░▒▒░░  ░░░░██      
     ██░░▒▒    ░░░░██       
     ██░░▒▒░░  ▒▒▒▒██     
     ██░░▒▒░░  ▒▒▒▒██    
     ██░░▒▒▒▒  ▒▒▒▒██       
     ██░░▒▒▒▒  ▒▒▒▒██     
     ██░░▒▒▒▒  ▒▒▒▒██    
     ██░░░░░░  ▒▒▒▒██   
       ██░░  ▒▒▒▒██      
       ██░░░░▒▒▒▒██  
         ████████ 

`,
`
██░░░░██
██░░░░██
██░░░░██
██░░░░██
██░░░░██
██░░░░██
██▒▒▒▒██
██▒▒▒▒██
██▒▒▒▒██
██▒▒▒▒██
██▒▒▒▒██
██▒▒▒▒██
██▒▒▒▒██
██▒▒▒▒██
████████
`,
`⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣷⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⡇⠀⠀⠀⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣾⣿⣿⠀⠀⢸⣧⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣼⣿⣿⣿⣧⡀⢸⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠰⠶⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡶⠄⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠈⠙⢿⣿⣿⣿⡿⠋⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢿⣿⡿⠀⢰⣿⣿⣷⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⠇⠀⣾⣿⢹⣿⡆⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⠀⠈⣿⢀⣼⣿⠃⠀⢻⣿⣄⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⣸⣀⣠⣿⣿⡿⠁⠀⠀⠀⠻⣿⣶⣤⡀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠠⣴⣶⣾⣿⣿⣿⣛⠁⠀⠀⠀⠀⠀⠀⠀⢙⣻⣿⣿⣷⣶⣦⡤
⠀⠀⠀⠀⠀⠀⠀⠈⠉⣿⡟⠿⣿⣷⣦⠀⠀⠀⠀⣀⣶⣿⡿⠟⠋⠉⠉⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⢰⣿⣧⠀⠀⠙⣿⣷⡄⠀⣰⣿⡟⠁⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⣼⣿⣿⡄⠀⠀⠘⣿⣷⢰⣿⡟⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⣠⣿⣿⣿⣧⠀⠀⠀⢹⣿⣿⡿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⢀⣠⣼⣿⣿⣿⣿⣿⣷⣤⡀⠘⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠤⣶⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡧⠄⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠉⠙⠻⢿⣿⣿⣿⣿⣿⣿⠿⠛⠉⢹⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠈⢻⣿⣿⣿⡿⠃⠀⠀⠀⢸⡏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⠃⠀⠀⠀⠀⢸⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⢹⣿⣿⠀⠀⠀⠀⠀⠈⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠘⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠹⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
`

    ];

    // ASCII flicker animation
// initialize count OUTSIDE the interval
    let count = 0;

    const interval = setInterval(() => {
        if (count < frames.length) {
            // update with the current frame
            display.innerText = frames[count].replace(/ /g, '\u00A0');
            
            // move to the next frame
            count++;
        } else {
            // run out of frames, stop and close
            clearInterval(interval);
            setTimeout(() => {
                popup.close();
            }, 800);
        }
    }, 400);

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