const recorderContainer = document.getElementById("jsRecordContainer");
const recordBtn = document.getElementById("jsRecordBtn");
const videoPreview = document.getElementById("jsVideoPreview");

// public
let streamObject;
let videoRecorder;

const handleVideoData = (event) => {
  // console.log(event);
  const { data: videoFile } = event;
  const link = document.createElement("a");
  link.href = URL.createObjectURL(videoFile);
  link.download = "recorded.webm";
  document.body.appendChild(link);
  link.click();
};

const stopRecording = () => {
  videoRecorder.stop();
  recordBtn.removeEventListener("click", stopRecording);
  // recordBtn.addEventListener("click", getVideo);
  recordBtn.innerHTML = "Start recording";
};

const startRecording = () => {
  // console.log(streamObject);
  videoRecorder = new MediaRecorder(streamObject);
  // console.log(videoRecorder);
  videoRecorder.start(); // state: "recording"
  videoRecorder.addEventListener("dataavailable", handleVideoData);
  setTimeout(() => videoRecorder.stop(), 5000);
  recordBtn.addEventListener("click", stopRecording);
};

const getVideo = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: { width: 1280, height: 720 },
    });
    console.log(stream);
    videoPreview.srcObject = stream; // source object 이므로..
    videoPreview.muted = true;
    videoPreview.play();
    recordBtn.innerHTML = "Stop Recording";
    streamObject = stream;
    startRecording();
  } catch (error) {
    // 권한 통과를 하지 못했을 경우.
    console.log(error);
    recordBtn.innerHTML = "😂 Cant record";
  } finally {
    recordBtn.removeEventListener("click", getVideo);
  }
};

function init() {
  recordBtn.addEventListener("click", getVideo);
}

if (recorderContainer) {
  init();
}

// videoRecorder2.js
// const recorderContainer = document.getElementById("jsRecordContainer");
// const recordBtn = document.getElementById("jsRecordBtn");
// const videoPreview = document.getElementById("jsVideoPreview");

// const startRecording = async () => {
//   try {
//     const stream = await navigator.mediaDevices.getUserMedia({
//       audio: true,
//       video: { width: 1280, height: 720 },
//     });
//     console.log(stream);
//     videoPreview.srcObject = stream;
//     videoPreview.muted = true;
//     videoPreview.play();
//   } catch (error) {
//     recordBtn.innerHTML = "☹️ Cant record";
//     recordBtn.removeEventListener("click", startRecording);
//   }
// };

// function init() {
//   recordBtn.addEventListener("click", startRecording);
// }

// if (recorderContainer) {
//   init();
// }
