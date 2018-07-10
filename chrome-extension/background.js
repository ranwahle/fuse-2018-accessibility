// this is the background code...

// listen for our browerAction to be clicked
chrome.browserAction.onClicked.addListener(function (tab) {
  // for the current tab, inject the "inject.js" file & execute it
  // chrome.tabs.executeScript(
  //   null,
  //   { file: "https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@0.11.2" }
  // );

  chrome.tabs.executeScript(tab.id, {
    file: 'inject.js',
  });
});