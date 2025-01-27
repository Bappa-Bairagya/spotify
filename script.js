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
async function main() {
  let song = await getsong()
  console.log(song)
  let songul = document.querySelector(".songlist").getElementsByTagName("ul")[0]
  for (let s of song) {
    songul.innerHTML = songul.innerHTML + `
  <li>
                        <img class="invert" src="music.svg" alt="">
                        <div class="info">
                            <div>${s.replaceAll("-128-ytshorts.savetube.me", " ")}</div>
                            <div>Spotify</div>
                        </div>
                        <div class="playnow">
                            <span>Play Now</span>
                            <img class="invert" src="olay.svg" alt="">
                        </div>
                       </li>`
  }

  var audio = new Audio(song[0])
  //audio.play()
}
main()