ie8
===

### in a nutshell

 * `addEventListener`, `removeEventListener`, and `dispatchEvent` for IE8 **including custom bubbling events**
 * `timeStamp`, `target`, and `currentTarget` properties per each event
 * `document.createEvent('Event')` standard API  with `e.initEvent(type, bubbles, cancelable)` supported too
 * `preventDefault()`, `stopPropagation()`, `stopImmediatePropagation()` working with both synthetic and real events
 * `document.addEventListener('DOMContentLoaded', callback, false)` supported

that's pretty much it for now ... 

[current tests file](test/ie8.js) and [live test page](http://webreflection.github.io/ie8/test/)


### how to include the project
Here a page example
```html
<!doctype html>
<html>
  <head>
    <title>ie8</title>
    <!--[if IE 8]><script src="ie8.js"></script><![endif]-->
    <script>
    this.addEventListener('load', function(e) {
      alert('Hello Standards');
    });
    </script>
  </head>
</html>
```
The file can be either the [full version](build/ie8.max.js) or [the minified one](build/ie8.js) and could be placed before or after some third parts library accordingly with compatibility.


### about
The very first thought I had about this project was: _how the hack is possible nobody had gone down this road before?_

I am still thinking the same so ... there might be many things this polyfill is not fixing (yet).
If you have any specific request please file a feature request (or a bug) in the proper section.

It's about IE8 so I am expecting 23456789065123456789 tickets about problems each day so probably only most relevant will be considered due the amount of time it might take.

Thanks for your contribution and your understanding.


### troubleshooting
Some library could do weak features detection and decide the browser is IE8 regardless and threat it like that, some other might assume since this stuff is there and working much more should be possible too.

Well, in 4 years of problems and counting, I have no idea about how many libraries still do work arounds for IE8 but if your libraries are ignoring such browser you might want to add this file regardless and probably find IE8 automagically fixed for all your JS needs.