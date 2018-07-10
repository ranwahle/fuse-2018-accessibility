// this is the code which will be injected into a given page...

(function() {

  // just place a div at top right
  // var div = document.createElement('div');
  // div.style.position = 'fixed';
  // div.style.top = 0;
  // div.style.right = 0;
  // div.textContent = 'Injected!';
  // document.body.appendChild(div);
  var video = document.getElementById('video');

  // alert('inserted self... giggity');

  if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    // Not adding `{ audio: true }` since we only want video now
    navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
      video.src = window.URL.createObjectURL(stream);
      video.play();
      console.log('playing')
    });
  }

})();