// this is the code which will be injected into a given page...

(function () {

  var tf = window.tf
  var INITIAL_MODEL = 'https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_0.25_224/model.json'
  var tsParams = {
    units: 100,
    epochs: 20,
    batchSize: 0.4,
    learningRate: 0.0001,
    threshold: 0.95
  };

  var network = null;
  var model = null;

  tf.loadModel(INITIAL_MODEL).then(nDef => {
    var oLayer = nDef.getLayer('conv_pw_13_relu')
    network = tf.model({
      inputs: nDef.inputs,
      outputs: oLayer.output
    });
    loadJsonModel();
  });

  // var jsonData = chrome.extension.getURL('data/my-model-1.json');
  // console.log(jsonData);
  function loadJsonModel() {
    var jsonData = chrome.runtime.getURL('data/my-model-1.json');
    tf.loadModel(jsonData).then(nDef => {
      // var layer = res.getLayer();
      // network = tf.model({
      //   inputs: res.inputs,
      //   outputs: layer.output
      // });
      model = nDef;
      activateCamera();
    }).catch(err => {
      console.log(err);
    });
  }

  function test(image) {
    const predictedClass = tf.tidy(() => {
      const activation = network.predict(image);
      const predictions = model.predict(activation);
      return predictions.as1D();
    });
    predictedClass.data().then(probability => {
      predictedClass.dispose()
      tf.nextFrame().then(res => {
        console.log('bla');
        return probability
      })
    });
  }

  function doGrab(imageCapture) {
    imageCapture.grabFrame()
    .then(function (imageBitmap) {
      console.log('Grabbed frame:', imageBitmap);
      var canvas = document.createElement('canvas')
      canvas.width = imageBitmap.width;
      canvas.height = imageBitmap.height;
      canvas.style.width = `${imageBitmap.width}px`;
      canvas.style.height = `${imageBitmap.height}px`;
      canvas.getContext('2d').drawImage(imageBitmap, 0, 0, 224, 224);
      var image = captureImageFromCanvas(canvas);
      test(image);
      doGrab(imageCapture);
    })
    .catch(function (error) {
      console.log('grabFrame error: ', error);
    });
  }

  function captureImageFromCanvas(canvas) {
    const fromPixels = tf.fromPixels(canvas)
    const size = Math.min(fromPixels.shape[ 0 ], fromPixels.shape[ 1 ]);
    const centerHeight = fromPixels.shape[ 0 ] / 2;
    const beginHeight = centerHeight - (size / 2);
    const centerWidth = fromPixels.shape[ 1 ] / 2;
    const beginWidth = centerWidth - (size / 2);
    const cropped = fromPixels.slice([ beginHeight, beginWidth, 0 ], [ size, size, 3 ]);
    const batched = cropped.expandDims(0)
    const image = batched.toFloat().div(tf.scalar(127)).sub(tf.scalar(1));
    return image
  }

  function activateCamera() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      // Not adding `{ audio: true }` since we only want video now
      navigator.mediaDevices.getUserMedia({ video: true }).then(function (stream) {
        // var video = document.getElementById('video');
        // if (!video) {
        //   video = document.getElementById('video');
        // }
        // video.src = window.URL.createObjectURL(stream);
        // video.play();

        console.log('playing')

        var imageCapture = new ImageCapture(stream.getVideoTracks()[ 0 ])
        console.log(imageCapture);
        doGrab(imageCapture);
      });
    }
  }

})();