const audioCtx = new AudioContext();
const container = document.getElementById('container');
const canvas = document.getElementById('canvas');
const file = document.getElementById('audiofile');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const canvasCtx = canvas.getContext('2d');

let audioSource;
let analyser;

container.addEventListener('click', function(){  
    const audio1 = document.getElementById('audio1');
    audio1.src='samples/sound2.mp3';
    audio1.volume = 0.2;  
    audio1.play();
    audioSource = audioCtx.createMediaElementSource(audio1);
    analyser = audioCtx.createAnalyser();
    audioSource.connect(analyser);
    analyser.connect(audioCtx.destination);
    analyser.fftSize = 256;
    const bufferLength = analyser.frequencyBinCount; // Half of fftSize
    const dataArray = new Uint8Array(bufferLength);

    const barWidth = canvas.width/bufferLength;
    let barHeight;
    let x;

    function animate(){
        x = 0;
        canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
        analyser.getByteFrequencyData(dataArray);
        barAnimation(bufferLength, x, barWidth, barHeight, dataArray)
        requestAnimationFrame(animate);

    }
    animate();
});

file.addEventListener('change', function(){
    const files = this.files;
    const audio1 = document.getElementById('audio1');
    audio1.src = URL.createObjectURL(files[0]);
    audio1.volume = 0.2;
    audio1.load();
    audio1.play();
    
    audioSource = audioCtx.createMediaElementSource(audio1);
    analyser = audioCtx.createAnalyser();
    audioSource.connect(analyser);
    analyser.connect(audioCtx.destination);
    analyser.fftSize = 256;
    const bufferLength = analyser.frequencyBinCount; // Half of fftSize
    const dataArray = new Uint8Array(bufferLength);

    const barWidth = canvas.width/bufferLength;
    let barHeight;
    let x;

    function animate(){
        x = 0;
        canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
        analyser.getByteFrequencyData(dataArray);
        barAnimation(bufferLength, x, barWidth, barHeight, dataArray);
        requestAnimationFrame(animate);

    }
    animate();
});

function barAnimation(bufferLength, x, barWidth, barHeight, dataArray){
    for (let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i] * 2.2;
        const hue = i * 3;
        console.log(i);
        canvasCtx.fillStyle = 'hsl(' + hue + ',100%, 50%)';
        canvasCtx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
        x += barWidth;
}
}

    // Best Visualization with small screens
function circleAnimation(bufferLength, x, barWidth, barHeight, dataArray){
    for (let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i] * 1.2;
        canvasCtx.save();
        canvasCtx.translate(canvas.width/2, canvas.height/1.5);
        canvasCtx.rotate(i * Math.PI * 2 / bufferLength);

        const hue = i * 3;
        console.log(i);
        canvasCtx.fillStyle = 'hsl(' + hue + ',100%, 50%)';
        canvasCtx.fillRect(0, 0, barWidth, barHeight);
        x += barWidth;
        canvasCtx.restore();
}
}