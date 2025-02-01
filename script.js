let currentsong = new Audio();
let song;
let songs;
let curfolder;
async function getsong(folder) {
  curfolder = folder;
  let a = await fetch(`http://127.0.0.1:3000/${folder}/`)
  let responce = await a.text();
  let div = document.createElement("div")
  div.innerHTML = responce
  let as = div.getElementsByTagName("a")
  songs = []
  for (let index = 0; index < as.length; index++) {
    const element = as[index];
    if (element.href.endsWith(".mp3")) {
      songs.push(element.href.split(`/${folder}/`)[1])
    }
  }
  let songul = document.querySelector(".songlist").getElementsByTagName("ul")[0]
  songul.innerHTML=""
  for (let s of songs) {
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
}
const playmusic = (track, pause = false) => {
  //let audio =new Audio("/song/"+track)

  currentsong.src = `/${curfolder}/` + track
  if (!pause) {
    currentsong.play()
    play.src = "pause.svg"
  }


  document.querySelector(".songinfo").innerHTML = track
  document.querySelector(".songtime").innerHTML = "00:00/00:00"
}


async function main() {

  song = await getsong("song/honey")
  playmusic(songs[0], true)
  console.log(song)

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
    let c = document.querySelector(".circle").style.left = (currentsong.currentTime / currentsong.duration) * 100 + "%";
    console.log(c);

  })
  document.querySelector(".seekbar").addEventListener("click", (e) => {
    let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100
    document.querySelector(".circle").style.left = percent + "%"
    currentsong.currentTime = ((currentsong.duration) * percent) / 100
  })
  document.querySelector(".ham").addEventListener("click", () => {
    document.querySelector(".left").style.left = "0"

  })
  document.querySelector(".close").addEventListener("click", () => {
    document.querySelector(".left").style.left = "-120%"
  })
  next.addEventListener("click", () => {
    let index = song.indexOf(currentsong.src.split("/").slice(-1)[0])
    if ((index + 1) < song.length) {
      playmusic(song[index + 1])
    }
    else {
      playmusic(song[0])
    }


  })
  previous.addEventListener("click", () => {
    let index = song.indexOf(currentsong.src.split("/").slice(-1)[0])
    if ((index - 1) >= 0) {
      playmusic(song[index - 1])
    }
    else {
      playmusic(song[0])
    }

  })
  Array.from(document.getElementsByClassName("card")).forEach(e => {
    e.addEventListener("click", async item => {
      console.log(item.currentTarget, item.currentTarget.dataset.folder);

      song = await getsong(`song/${item.currentTarget.dataset.folder}`)
    })
  })
}
main()
function album(thamb,title,para,folder){
let div1=document.createElement("div")
let div2=document.createElement("div")
div1.setAttribute("class","card")
div1.setAttribute("data-folder",folder)
div2.setAttribute("class","play")

let img1=document.createElement("img")
let img2=document.createElement("img")
img2.setAttribute("class","pic")
let h2=document.createElement("h2")
let p=document.createElement("p")
let a=document.querySelector(".cardcontainer")
let b=a.appendChild(div1)
let c=b.appendChild(div2)
c.appendChild(img1)
b.appendChild(img2)
b.appendChild(h2)
b.appendChild(p)
img1.src="green.svg"
img2.src=thamb
h2.innerText=title
p.innerHTML=para
}
album("honey_singh.jpg","Yo Yo Honey Singh","Rock Song","honey")
album("carry.jpg","CarryMinati","Rap Song","carry")
album("arijit.jpeg","Arijit Singh","Love Song","arijit")
album("sonu.webp","Sonu Nigam","Rommantic Song","sonu")
album("shreya.jpeg","Shreya Ghosal","Love Song","shreya")