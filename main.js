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
        visualAnimation(bufferLength, x, barWidth, barHeight, dataArray)
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
        visualAnimation(bufferLength, x, barWidth, barHeight, dataArray);
        requestAnimationFrame(animate);

    }
    animate();
});

function visualAnimation(bufferLength, x, barWidth, barHeight, dataArray){
    for (let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i] * 2.2;
        const red = i* barHeight / 20;
        const green = i * 2;
        const blue = barHeight/2;

        canvasCtx.fillStyle = 'rgb(' + red + ',' + green + ',' + blue + ')';
        canvasCtx.fillRect(canvas.width - x, canvas.height - barHeight, barWidth, barHeight);
        canvasCtx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
        x += barWidth;
}
}