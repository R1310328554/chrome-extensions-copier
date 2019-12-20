// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';


var pre_code="pre>code"  // segmentfault vuejs_org 也是这个,cnblogs w3cschool_cn 也可以用这个

// body > div.application-main > div > main > div.container-lg.clearfix.new-discussion-timeline.experiment-repo-nav.p-responsive > div > div.Box.mt-3.position-relative > div.Box-body.p-0.blob-wrapper.data.type-javascript > table
// $(".highlight.tab-size.js-file-line-container").textContent

//var cnblogs="div#cnblogs_post_body>div.cnblogs_code>pre" // div.cnblogs_code
var cnblogs="#cnblogs_post_body>div.cnblogs_code>pre" // div.cnblogs_code

// iteye 比较麻烦
// class="dp-highlighter" ol class="dp-c"
// html body div#page div#content.clearfix div#main div.blog_main div#blog_content.hide-main-content div.dp-highlighter ol.dp-c
// #blog_content > div:nth-child(11) > ol	/// <div id="blog_content" class="hide-main-content" ...>	
// var iteye="div#content > div#main > div#blog_content .iteye-blog-content-contain div.dp-highlighter > ol.dp-j"
var iteye="#blog_content div.dp-highlighter"  // iteye 是通过flash 来复制的，现在已经过时
// #blog_content > div.iteye-blog-content-contain > div:nth-child(5) > ol

//var runoob = "div#content > div.example > div.example_code > div.hl-main"
var runoob = "div.example_code > div.hl-main"

//var w3c = "#wrapper > #maincontent > div > pre"
var w3c = "#maincontent > div > pre"
var w3cschool_cn = "div#content > pre" // x

//.highlight
//selector = "div.cnblogs_code, .syntaxhighlighter > table > tbody > tr > td.code > div,pre, code, .highlight";

var selector= pre_code+','+iteye+','+runoob+','+cnblogs+','+w3c

$(selector).on("click", function(e) {
	var txt = e.target.innerText
	console.log(txt)

	// TODO 如果选择的行以 $、# 开头 会导致不能执行运行（比如在linux中），需要去掉； 结尾空白也需要去掉
	// window.clipboardData.setData("code", e.target.innerText);
	copyFn(e.target)
	
	window.getSelection().removeAllRanges()

	/** 
	 * chrome.extension 内部通信
	 * 	发送信息
	*/
	chrome.extension.sendMessage({code: txt}, function handler(response) {
		console.log("发送信息, 响应 -> " + response.counter);
		if (response) {
		// if (response.counter < 3000) {
			// chrome.tabs.sendMessage(tab.id, {counter: response.counter}, handler);
		} else {
			
		}
	});

	// chrome.extension.getBackgroundPage().show(code);
	
	/**
	chrome.tabs.getSelected(null, function(tab) {
	  chrome.tabs.sendMessage(tab.id, {greeting: "hello"},
	  function(response) {
		console.log(response.farewell);
    });/////////// 
    });/////////// 
	*/
	
	// 可选：发送 远程请求到服务器，然后可以直接运行
	//function fetchTwitterFeed(callback) {
	  var xhr = new XMLHttpRequest();
	  xhr.onreadystatechange = function(data) {
	    if (xhr.readyState == 4) {
			console.log(xhr.status);
	        console.log(xhr.responseText);
	      if (xhr.status == 0) {
	        // var data = JSON.parse(xhr.responseText);
	        console.log(xhr.responseText);
	      } else {
	        console.log(22222222);
	      }
	    }
	  }
	  // Note that any URL fetched here must be matched by a permission in
	  // the manifest.json file!
	  var url = 'http://localhost:7777/aa?selection=' + encodeURIComponent(txt);
	  xhr.open('GET', url, true);
	  //xhr.send(txt);// post方式发送
	  xhr.send();
	//};

	/**
	var copyDiv = document.createElement("div");
	copyDiv.innerText = e.target.innerText;
	copyDiv.style.float = 'left'
	copyDiv.style.position = 'relative'
	copyDiv.style.backgroundColor = '#6ce200'
	copyDiv.style.zIndex = '999'
	*/
	// e.target.appendChild(copyDiv)
})

function copyFn(el, id) {
    if (id) {
        el = document.getElementById('copyMy');
    }
    if (el) {
        window.getSelection().selectAllChildren(el);
        document.execCommand ("Copy");
    } else {
        console.log('复制失败!---找不到元素！')
    }
}

//  $(".syntaxhighlighter > table > tbody > tr > td.code > div")

var bgColor;
$(selector).on("mouseover ", function(e) {
	//debugger
	// e.target.backgroundColor = 'red';
	bgColor = e.target.style.backgroundColor;
	//console.log("bgColor " + bgColor);

	if(bgColor) {
		e.target.style.backgroundColor = bgColor + 102400;
	} else {
		e.target.style.backgroundColor = '#dddddd' // TODO 对于cnblogs, 此处有时候无效
	}
	//console.log("bgColor " + e.target.style.backgroundColor);
})
$(selector).on("mouseout", function(e) {
	if(bgColor) {
		e.target.style.backgroundColor = bgColor;
	} else {
		e.target.style.backgroundColor = '';
	}
})


/**
var imgURL = chrome.extension.getURL("images/myimage.png");

var greeting = "hola, ";
var button = document.getElementById("Header1_HeaderTitle");
button.person_name = "Roberto";
button.addEventListener("click", function() {
  alert(greeting + button.person_name + ".");
}, false);
*/

// document.getElementById("someImage").src = imgURL;

console.log("Chrome extension myscript.js " );

chrome.runtime.onConnect.addListener(function(port) {
  port.onMessage.addListener(function(msg) {
	port.postMessage({counter: msg.counter+1});
  });
});

chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
	
	console.log("request " + request);
	sendResponse({counter: request.counter+1});
});



// $("div.cnblogs_code").on('paste', function(e) {alert(e)});

$(selector).on('paste', function(e) {
	
	alert(e.clipboardData);
	e.clipboardData.setData('text/plain', e.clipboardData.items[0]);
	
});



// 粘贴复制上传等功能
function pasteHandle(ev) {
  let cbd = ev.originalEvent.clipboardData;
  let ua = window.navigator.userAgent;

  ev.stopPropagation();
  ev.preventDefault();

  // 如果是 Safari 直接 return
  if (!cbd || !cbd.items || !cbd.types) return;

  // Mac平台下Chrome49版本以下 复制Finder中的文件的Bug Hack掉
  if (cbd.items.length === 2 && cbd.items[0].kind === 'string' && cbd.items[1].kind === 'file' && cbd.types.length === 2 && cbd.types[0] === 'text/plain' && cbd.types[1] === 'Files' &&
    ua.match(/Macintosh/i) && ~~(ua.match(/Chrome\/(\d{2})/i)[1]) < 49) return;

  for (let i = 0, len = cbd.items.length; i < len; i++) {
    let item = cbd.items[i];
    // 文件类型上传
    if (item.kind === 'file') {
      let blob = item.getAsFile();
      if (blob.size === 0) return;
      let fileName = cbd.getData('text/plain');
      // 上传文件
      return uploader(blob, { name: fileName });
    }
  }

  let text = cbd.getData('text/plain');
  // 复制文字
  if (text) insertTextCMD(text);
}



function insertTextCMD(text) {
  if (document.body.createTextRange) {
    let textRange;
    if (document.selection) {
      textRange = document.selection.createRange();
    } else if (window.getSelection) {
      let sel = window.getSelection();
      let range = sel.getRangeAt(0);

      // 创建临时元素，使得TextRange可以移动到正确的位置
      let tempEl = document.createElement('span');
      tempEl.innerHTML = '&#FEFF;';
      range.deleteContents();
      range.insertNode(tempEl);
      textRange = document.body.createTextRange();
      textRange.moveToElementText(tempEl);
      tempEl.parentNode.removeChild(tempEl);
    }
    textRange.text = text;
    textRange.collapse(false);
    textRange.select();
  } else {
    // Chrome之类浏览器
    document.execCommand('insertText', false, text);
  }
}





