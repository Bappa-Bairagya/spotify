let currentsong = new Audio();
async function getsong() {
  let a = await fetch("http://127.0.0.1:3000/song/")
  let responce = await a.text();
  let div = document.createElement("div")
  div.innerHTML = responce
  let as = div.getElementsByTagName("a")
  let songs = []
  for (let index = 0; index < as.length; index++) {
    const element = as[index];
    if (element.href.endsWith(".mp3")) {
      songs.push(element.href.split("/song/")[1])
    }
  }
  return songs
}
const playmusic = (track,pause=false) => {
  //let audio =new Audio("/song/"+track)
  
  currentsong.src = "/song/" + track
  if(!pause){
    currentsong.play()
    play.src = "pause.svg"
  }
  
  
  document.querySelector(".songinfo").innerHTML = track
  document.querySelector(".songtime").innerHTML = "00:00/00:00"
}

async function main() {

  let song = await getsong()
  playmusic(song[0],true)
  console.log(song)
  let songul = document.querySelector(".songlist").getElementsByTagName("ul")[0]
  for (let s of song) {
    songul.innerHTML = songul.innerHTML + ` <li>
<img class="invert" src="music.svg" alt="">
 <div class="info">
     <div>${s}</div>
     <div>Spotify</div>
</div>
 <div class="playnow">
    <span>Play Now</span>
    <img class="invert" src="olay.svg" alt="">
</div></li>`
  }

  Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e => {
    e.addEventListener("click", ele => {
      console.log(e.querySelector(".info").firstElementChild.innerHTML)
      playmusic(e.querySelector(".info").firstElementChild.innerHTML)
    })
  });
  play.addEventListener("click", () => {
    if (currentsong.paused) {
      currentsong.play()
      play.src = "pause.svg"
    }
    else {
      currentsong.pause()
      play.src = "olay.svg"
    }
  })
  function convertSecondsToMinutes(seconds) {
    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = Math.floor(seconds % 60);
    
    // Ensure two-digit format
    let formattedMinutes = String(minutes).padStart(2, '0');
    let formattedSeconds = String(remainingSeconds).padStart(2, '0');
    
    return `${formattedMinutes}:${formattedSeconds}`;
  }
  currentsong.addEventListener("timeupdate", () => {
    console.log(currentsong.currentTime, currentsong.duration);
    document.querySelector(".songtime").innerHTML = `${convertSecondsToMinutes(currentsong.currentTime)}/${convertSecondsToMinutes(currentsong.duration)}`
    let c=document.querySelector(".circle").style.left=(currentsong.currentTime / currentsong.duration)* 100 +"%";
    console.log(c);
    
  })
  document.querySelector(".seekbar").addEventListener("click",(e)=>{
    let percent=(e.offsetX/e.target.getBoundingClientRect().width)*100
    document.querySelector(".circle").style.left= percent+"%"
    currentsong.currentTime=((currentsong.duration)*percent)/100
  })
  document.querySelector(".ham").addEventListener("click",()=>{
document.querySelector(".left").style.left="0"

  })
  document.querySelector(".close").addEventListener("click",()=>{
    document.querySelector(".left").style.left="-120%"
  })
}
main()