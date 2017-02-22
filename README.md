ie8
===

### in a nutshell

 * `addEventListener`, `removeEventListener`, and `dispatchEvent` for IE8 **including custom bubbling events**
 * `timeStamp`, `cancelable`, `bubbles`, `target`, and `currentTarget` properties per each event
 * `document.createEvent('Event')` standard API  with `e.initEvent(type, bubbles, cancelable)` supported too
 * `preventDefault()`, `stopPropagation()`, `stopImmediatePropagation()` working with both synthetic and real events
 * `document.addEventListener('DOMContentLoaded', callback, false)` supported
 * `textContent`, `firstElementChild`, `lastElementChild`, `previousElementSibling`, `nextElementSibling`, `childElementCount`
 * `document.defaultView`, `window.getComputedStyle`

[current tests file](test/ie8.js) and [live test page](http://webreflection.github.io/ie8/test/)


### how to include the project
Here a page example
```html
<!DOCTYPE html>
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

### ie8 in CDN
It is now possible to include this file through [cdnjs](http://www.cdnjs.com)
```html
<!--[if IE 8]><script
  src="//cdnjs.cloudflare.com/ajax/libs/ie8/0.6.0/ie8.js"
></script><![endif]-->
```

### W3C DOM Level 2
This polyfill normalize the [EventTarget interface](http://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-Registration-interfaces) for every node.

This shim normalizes the DOM Level 2 [Event interface](http://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-interface) too, adding an **extra** DOM Level 3 [.stopImmediatePropagation()](http://www.w3.org/TR/DOM-Level-3-Events/#events-event-type-stopImmediatePropagation) as bonus.


#### W3C DOM Level.next
If you'd like to upgrade even more IE8 capabilities, consider adding [dom4](https://github.com/WebReflection/dom4#dom4) polyfills **after** `ie8.js` file.

That would provide enough horse-powers to hazard [CustomElement](https://github.com/WebReflection/document-register-element#document-register-element) polyfill on top.


### known gotchas
Here a humble list of things what won't probably ever be fixed in IE8

  * a standard capturing phase. The logic involved to pause a synthetic or DOM event, capture up, and re-dispatch top-down is probably not worth it the time and the size of the code. Right now if the `useCapture` flag is used, the event is prepended instead of appended simulating somehow the 99% of the time *reason* we might opt for the `capture` phase, being this usually slower too so it's a good practice, in any case, to `.stopPropagation()` on capture.
  * not supported modern events, `DOMContentLoaded` a part, such `transitionend` or similar. As events might exist and might not exist in any browser out there, it does not make sense to fix them here. However, this polyfill provides all needed tools to fix special events through a powerful, custom events compatible, W3C standard API


### possible troubleshooting
Some library could do weak features detection and decide the browser is IE8 regardless and threat it like that, some other might assume since this stuff is there and working much more should be possible too.

Well, in 4 years of problems and counting, I have no idea about how many libraries still do work arounds for IE8 but if your libraries are ignoring such browser you might want to add this file regardless and probably find IE8 automagically fixed for all your JS needs.


### about
The very first thought I had about this project was: _how the hack is possible nobody had gone down this road before?_

I am still thinking the same so ... there might be many things this polyfill is not fixing (yet).
If you have any specific request please file a feature request (or a bug) in the proper section.

It's about IE8 so I am expecting 23456789065123456789 tickets about problems each day so probably only most relevant will be considered due the amount of time it might take.

Thanks for your contribution and your understanding.


## author

| [![twitter/WebReflection](http://www.3site.eu/graphic/blogspot_profile.gif)](http://twitter.com/WebReflection "Follow @WebReflection on Twitter") |
|---|
| [Andrea Giammarchi](http://webreflection.blogspot.com/) |