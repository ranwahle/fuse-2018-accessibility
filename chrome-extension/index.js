console.log('Hello extension')
import webcamUtils from '../lib/webcam.js';
import LearningModel from '../lib/tf.js';

let model
let canvas
let video

const facePos = [
    'up', 'down', 'left', 'right', 'center'
];

(async function () {

    const btn0 = document.getElementById('btn0')
    const btn1 = document.getElementById('btn1')
    const btn2 = document.getElementById('btn2')
    const btn3 = document.getElementById('btn3')
    const btn4 = document.getElementById('btn4')

    const btnTrain = document.getElementById('train')
    const btnStart = document.getElementById('start')

    video = document.getElementById('webcam')
    await webcamUtils.init(document.getElementById('webcam'))
    canvas = webcamUtils.canvas
    model = new LearningModel(5)
    await model.initialize()

    document.body.appendChild(webcamUtils.canvas)
    document.getElementById('status').textContent = 'ready!'

    btn0.onclick = btn1.onclick = btn2.onclick = btn3.onclick = btn4.onclick = function buttonHandler () {
        webcamUtils.capture()
        console.log('Capture', facePos[this.id.slice(3)])
        const label = parseInt(this.id.slice(3))
        const imageData = model.captureImageFromCanvas(canvas)
        model.sample(imageData, label)
    }

    const done = (loss) => {
        console.log(loss)
    }

    btnTrain.onclick = function () {
        model.train(done)
    }

    btnStart.onclick = function () {
        detect()
        this.remove()
    }

})()

let x = 0

async function detect () {
    webcamUtils.capture()
    const imageData = model.captureImageFromCanvas(canvas)
    const predictions = await model.test(imageData)

    // console.log("predictions", predictions, predictions.indexOf(Math.max.apply(this,predictions)))

    // Get the array key with the highest value in predictions array
    const posInPredictionArr = predictions.indexOf(Math.max.apply(this,predictions))

    // Custom event: face position
    //console.log(facePos[posInPredictionArr])

    var fpEvent = new CustomEvent("facePosition", {
        detail: {
            position: facePos[posInPredictionArr]
        }
    });
    window.dispatchEvent(fpEvent);

    x++
    detect()

    async function saveToFile() {
        try {
            await model.saveToFile()
        } catch(err) {
            console.log(err);
        }
    }

    async function loadFromFile() {
        try {
            await model.loadFromFile();
        } catch(err) {
            console.log(err);
        }
    }
}