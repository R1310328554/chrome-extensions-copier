# chrome-extensions-copier
chrome extensions copier, copy on click from certain website.


这个插件呢，主要用来在chrome浏览器上复制某些网站的某些特定内容，主要是用来复制代码，提高效率！(没办法，某些网站不注重用户体验，连这么简单的功能都不提供)。写这个插件的初衷就是，在阅读某些博客的时候呢，快速的实验。从而 提高开发效率，更快的更爽的编程。


它的作用就是 点击某些代码块， 代码就会复制，而且会发送到远程服务器（远程服务器默认是 http://localhost:7777/chrome_extensions_copier?selection=txt, 请求方式是GET，其中txt 就是复制的内容，一般就是代码），然后远程服务器自动的执行其中的代码。当然， 能不能自动运行还是 得看复制的是什么样的代码，是否完整，是否可以执行，还有就是远程服务器 怎么去处理它。



怎么使用？  下载，打开 chrome，打开chrome://extensions/， 点击 “加载已解压的扩展程序”，选择解压的chrome-extensions-copier 即可！！


特定的选择器即selector范围内，只要鼠标移上去，就会有背景颜色的变化，然后 随便一点击，即完成复制， 会右下角 notification提示。
（目前是 notification提示，感觉提示框太小，体验不是很好，而且提示框需要一点时间才会自动消失； 后面考虑做成悬浮层。）

 

目前支持的网站是：

"https://www.cnblogs.com/*"
, "https://iteye.com/*"
, "https://segmentfault.com/*"
, "https://www.w3school.com.cn/*"
, "https://www.w3cschool.cn/*"
, "https://www.runoob.com/*"
, "https://cn.vuejs.org/*"
, "https://github.com/*"
, "https://stackoverflow.com/*"

等；


 TODO

这个插件目前 其实已经做到了一半，后期 做一个完整的选项页，而且希望加上更多的智能。 最终设想就是，点击一下，代码自动运行，快速的实验试错，快速的学习！！！
