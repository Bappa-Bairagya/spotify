async function getsong(){
let a= await fetch("http://127.0.0.1:3000/song/")
let responce= await a.text();
let div=document.createElement("div")
div.innerHTML=responce
let as=div.getElementsByTagName("a")
let songs=[]
for (let index = 0; index < as.length; index++) {
    const element = as[index];
    if(element.href.endsWith(".mp3")){
        songs.push(element.href)
    }
}
return songs
}
async function main(){
let song= await getsong()
console.log(song)
var audio= new Audio(song[0])
//audio.play()
}
main()