function show(msg) {
  var time = /(..)(:..)/.exec(new Date());     // The prettyprinted time.
  var hour = time[1] % 12 || 12;               // The prettyprinted hour.
  var period = time[1] < 12 ? 'a.m.' : 'p.m.'; // The period of the day.
  new Notification(hour + time[2] + ' ' + period, {
	icon: '48.png',
	body: 'CODE:' + msg
  });
}

// Conditionally initialize the options.
if (!localStorage.isInitialized) {
  localStorage.isActivated = true;   // The display activation.
  localStorage.frequency = 1;        // The display frequency, in minutes.
  localStorage.isInitialized = true; // The option initialization.
}

// Test for notification support.
if (window.Notification) {
  // While activated, show notifications at the display frequency.
  if (JSON.parse(localStorage.isActivated)) { show(); }

  var interval = 0; // The display interval, in minutes.

  setInterval(function() {
	interval++;

	if (
	  JSON.parse(localStorage.isActivated) &&
		localStorage.frequency <= interval
	) {
	 // show();
	  interval = 0;
	}
  }, 60000);
}


// show();

// $("pre").on("click", function(e,item) {   //////  不能写这个代码， 可能是 $ 无法识别。 否则后面的代码 无法执行， 前面的可能也无法执行。。 而且 background.js 也无法调试， 所以， 很麻烦。。

console.log(333);

chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
	console.log("request " + request);
	sendResponse({counter: 1111});
	show(request.code)
});


console.log(444);

 chrome.tabs.onCreated.addListener(function(tab) {
  appendToLog('tabs.onCreated --'
              + ' window: ' + tab.windowId
              + ' tab: '    + tab.id
              + ' index: '  + tab.index
              + ' url: '    + tab.url);
});
 
	console.log(chrome.extension)
	console.log(chrome.tabs)
	