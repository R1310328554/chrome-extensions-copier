// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

let changeColor = document.getElementById('changeColor');

chrome.storage.sync.get('color', function(data) {
  changeColor.style.backgroundColor = data.color;
  changeColor.setAttribute('value', data.color);
});

changeColor.onclick = function(element) {
  let color = element.target.value;
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(
        tabs[0].id,
        {code: 'document.body.style.backgroundColor = "' + color + '";'});
  });
};

////////////////////////

if (!chrome.benchmarking) {
  // alert("Warning:  Looks like you forgot to run chrome with " + " --enable-benchmarking set.");
  // return;
}

function setChildTextNode(elementId, text) {
  document.getElementById(elementId).innerText = text;
}

console.log(chrome.extension)
console.log(chrome.tabs)
	
// Tests the roundtrip time of sendMessage().
function testRequest() {
  setChildTextNode("resultsRequest", "running...");

  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	var timer = new Date().getTime()// new chrome.Interval();
	// timer.start();
	var tab = tabs[0];
	chrome.tabs.sendMessage(tab.id, {counter: 1}, function handler(response) {
	  if (response.counter < 3000) {
		chrome.tabs.sendMessage(tab.id, {counter: response.counter}, handler);
	  } else {
		// timer.stop();
		var end = new Date().getTime()
		
		var usec = Math.round(( end - timer));
		setChildTextNode("resultsRequest",  response.counter +  " response.counter " + usec + "usec");
	  }
	});
  });
}

// Tests the roundtrip time of Port.postMessage() after opening a channel.
function testConnect() {
  setChildTextNode("resultsConnect", "running...");

  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	var timer = new chrome.Interval();
	timer.start();

	var port = chrome.tabs.connect(tabs[0].id);
	port.postMessage({counter: 1});
	port.onMessage.addListener(function getResp(response) {
	  if (response.counter < 10) {
		port.postMessage({counter: response.counter});
	  } else {
		timer.stop();
		var usec = Math.round(timer.microseconds() / response.counter);
		setChildTextNode("resultsConnect", usec + "usec");
	  }
	});
  });
}

chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
	console.log("request " + request );
	console.log("request " + request.code );
	sendResponse({counter: "got it ! "});
});

document.addEventListener('DOMContentLoaded', function() {
  document.querySelector('#testRequest').addEventListener(
	  'click', testRequest);
  document.querySelector('#testConnect').addEventListener(
	  'click', testConnect);
});


console.log("  popup  ")





