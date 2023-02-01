var video = document.createElement("video");
video.src = "bg_storm.mp4";
video.autoplay = true;
video.loop = true;
video.muted = true;
video.style.objectFit = "cover";
video.style.position = "fixed";
video.style.top = "0";
video.style.left = "0";
video.style.width = "100%";
video.style.height = "100%";
video.style.zIndex = "-1";
video.style.opacity = "30%"

document.body.appendChild(video);


// document.body.style.backgroundImage = "url('bac.mp4')"
// document.body.style.backgroundRepeat = "no-repeat"
// document.body.style.backgroundSize = "100% 100%"

document.body.style.backgroundColor = "rgb(17, 17, 17)"