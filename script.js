let currentsong= new Audio();
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
const playmusic=(track)=>{
//let audio =new Audio("/song/"+track)
currentsong.src="/song/"+track
currentsong.play()
play.src="pause.svg"
document.querySelector(".songinfo").innerHTML=track
document.querySelector(".songtime").innerHTML="00:00/00:00"
}

async function main() {
 
  let song = await getsong()
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
    e.addEventListener("click",ele=>{
      console.log(e.querySelector(".info").firstElementChild.innerHTML)
      playmusic(e.querySelector(".info").firstElementChild.innerHTML)
    })
  });
  play.addEventListener("click",()=>{
    if (currentsong.paused) {
      currentsong.play()
      play.src="pause.svg"
    }
    else{
      currentsong.pause()
      play.src="olay.svg"
    }
  })
  currentsong.addEventListener("timeupdate",()=>{
console.log(currentsong.currentTime, currentsong.duration);

  })
}
main()