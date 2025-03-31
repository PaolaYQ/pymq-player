class Song {
    constructor(artist, title, album) {
        this.artist = artist
        this.title = title
        this.album = album
    }
}
const listContainer = document.querySelector('.list')
const imageSongs = document.querySelectorAll('.list-img');
const songsElements = document.querySelectorAll('.song')
const imageArray = [...imageSongs]

const backGround = document.querySelector('.bg')
const cover = document.getElementById('cover')
const artistInfo = document.getElementById('artist')
const titleInfo = document.getElementById('title')

const progressBar = document.getElementById('progress-bar')

const volumeBtn = document.getElementById('volume-button')
const volumeContainer = document.querySelector('.volume-bar-container')
const volumeBar = document.getElementById('volme-control')

const prevBtn = document.getElementById('prev-button')
const playBtn = document.getElementById('play-button')
const nextBtn = document.getElementById('next-button')
const listBtn = document.getElementById('list-btn')

const player = document.getElementById('player')
const currentTag = document.getElementById('current')
const remainTag = document.getElementById('remain')

const song1 = new Song('Stray Kids', 'MIROH', 'MIROH')
const song2 = new Song('BTS', 'Stay Gold', 'Stay Gold')
const song3 = new Song('BIGBANG', 'LET\'S NOT FALL IN LOVE', 'MADE')
const songs = [song1, song2, song3]

let isOpen = false
let isListOpened = false
let currentSong = 0

// V O L U M E N  
document.addEventListener("click", (e) => {
    if (!volumeContainer.contains(e.target) && !volumeBtn.contains(e.target)) {
        volumeContainer.style.height = "0px";
        isOpen = false
    }
    if(!listContainer.contains(e.target) && !listBtn.contains(e.target)){
        listContainer.style.height = "0px"
        isListOpened = false
    }
});

volumeBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (isOpen) {
        volumeContainer.style.height = "0px";
        isOpen = false;
    } else {
        volumeContainer.style.height = "110px";
        isOpen = true;
    }
});

volumeBar.addEventListener('input', () => {
    player.volume = volumeBar.value / 100;

})

//A N T E R I O R 

prevBtn.addEventListener('click', () => {
    currentSong = currentSong === 0 ? songs.length - 1 : currentSong - 1
    loadSong(songs[currentSong])
})

// R E P R O D U C I R  /  P A U S A R

playBtn.addEventListener('click', () => {
    if (!player.paused) {
        playBtn.innerHTML = playIcon
        player.pause()
    } else {
        playBtn.innerHTML = pauseIcon
        player.play()
    }
})

//S I G U I E N T E

nextBtn.addEventListener('click', () => {
    progressBar.value = 0;
    currentSong = currentSong === songs.length - 1 ? 0 : currentSong + 1
    loadSong(songs[currentSong])
})

//L I S T A 
listBtn.addEventListener('click', (e)=>{
    e.stopPropagation();
    if (isListOpened) {
        listContainer.style.height = "0px";
        isListOpened = false;
    } else {
        listContainer.style.height = "220px";
        isListOpened = true;
    }
})

imageSongs.forEach(image => {
    image.addEventListener('click', () => {
        currentSong = imageArray.findIndex(img => img === image);
        loadSong(songs[currentSong])
    });
});

//A V A N C E   E N   B A R R A

player.addEventListener('timeupdate', () => {
    progressBar.value = getProgres()
})

progressBar.addEventListener('input', () => {
    player.currentTime = (progressBar.value / 100) * player.duration
})

//U T I L

//I C O N O S

//R E P R O D U C I R

//P A U S A R 

const playIcon =    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#fff" >
                    <path d="M6 4v16a1 1 0 0 0 1.524 .852l13 -8a1 1 0 0 0 0 -1.704l-13 -8a1 1 0 0 0 -1.524 .852z"></path>
                    </svg>`

const pauseIcon =   `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#fff">
                    <path d="M9 4h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h2a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2z"></path>
                    <path d="M17 4h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h2a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2z"></path>
                    </svg>`

//C A L C U L A R   P R O G R E S O

function getProgres() {
    return (player.currentTime / player.duration) * 100
}

//F O R M A T E A R   T I E M P O 

function formatTime(time) {
    let min = Math.floor(time / 60);
    if (min < 10) {
        min = `0${min}`
    }
    let sec = Math.floor(time % 60);
    if (sec < 10) {
        sec = `0${sec}`
    }
    return `${min}:${sec}`
}

//C A R G A R   I N F O R M A C I O N   D E    C A N C I O N 

function loadSong(song) {
    const wasPlaying = !player.paused
    const imageRoute = `/assets/images/${song.album}.jpeg`
    cover.src = imageRoute
    backGround.style.backgroundImage = `url("${imageRoute}")`
    player.src = `/assets/audio/${song.title}.mp3`
    artistInfo.innerHTML = `${song.title} - ${song.album}`
    titleInfo.innerHTML = song.artist
    songsElements.forEach(element => {
        element.style.borderLeft  = "2px solid transparent"
    })
    songsElements[currentSong].style.borderLeft  = "2px solid white"
    if (wasPlaying) player.play()
}


//C A L C U L A R    Y    M O S T R A R    T I E M P O   

setInterval(() => {
    currentTag.innerHTML = formatTime(player.currentTime)
    remainTag.innerHTML = formatTime(player.duration - player.currentTime)
}, 1000)

//C A R G A R   P R I M E R A   C A N C I O N 

loadSong(songs[currentSong])

//V O L U M E N   A L   5 0
//B A R R A   E N   0

window.onload = () => {
    player.volume = 0.5
    progressBar.value = 0;
};
