ie8
===

### in a nutshell

 * `addEventListener`, `removeEventListener`, and `dispatchEvent` for IE8 **including custom bubbling events**
 * `timeStamp`, `target`, and `currentTarget` properties per each event
 * `document.createEvent('Event')` standard API  with `e.initEvent(type, bubbles, cancelable)` supported too
 * `preventDefault()`, `stopPropagation()`, `stopImmediatePropagation()` working with both synthetic and real events
 * `document.addEventListener('DOMContentLoaded', callback, false)` supported

that's pretty much it for now ... 

[current tests](test/ie8.js)