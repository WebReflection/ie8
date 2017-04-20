try {
  process.exit(0);
} catch(node) {
  
}


wru.createEvent = function(type, bubbles, cancelable) {
  var e = document.createEvent('Event');
  e.initEvent(
    type,
    bubbles == null ? true : bubbles,
    cancelable == null ? true : cancelable
  );
  return e;
};

wru.test([{
    name: 'getComputedStyle and style.opacity',
    test: function () {
      var div = document.createElement('div');
      div.style.marginTop = '50%';
      div.style.opacity = '0.75';
      document.body.insertBefore(
        div,
        document.body.firstChild
      );
      wru.assert('the amount is in pixels', /^\d+px$/.test(
        getComputedStyle(div, null).getPropertyValue('margin-top')
      ));
      wru.assert('the opacity is correct',
        getComputedStyle(div, null).getPropertyValue('opacity') === '0.75'
      );
      document.body.removeChild(div);
    }
  }, {
    name: 'DOMContentLoaded',
    test: function () {
      var waitforit = wru.async(function () {
        wru.assert('OK');
      });
      (function isItFiredYet(){
        if (window.DOMCONTENTLOADEDWASFIRED) {
          waitforit();
        } else {
          setTimeout(isItFiredYet, 100);
        }
      }());
    }
  }, {
    name: 'firstElementChild',
    test: function () {
      var div = document.createElement('div');
      div.innerHTML = 'a<i>b</i>c<i>d</i>e';
      wru.assert(
        div.firstElementChild.nodeName === 'I' &&
        div.firstElementChild.textContent === 'b'
      );
    }
  }, {
    name: 'lastElementChild',
    test: function () {
      var div = document.createElement('div');
      div.innerHTML = 'a<i>b</i>c<i>d</i>e';
      wru.assert(
        div.lastElementChild.nodeName === 'I' &&
        div.lastElementChild.textContent === 'd'
      );
    }
  }, {
    name: 'previousElementSibling',
    test: function () {
      var div = document.createElement('div'),
          i;
      div.innerHTML = 'a<i>b</i>c<i>d</i>e<i>f</i>';
      i = div.getElementsByTagName('i')[1];
      
      wru.assert(
        i.previousElementSibling.nodeName === 'I' &&
        i.previousElementSibling.textContent === 'b'
      );
    }
  }, {
    name: 'nextElementSibling',
    test: function () {
      var div = document.createElement('div'),
          i;
      div.innerHTML = 'a<i>b</i>c<i>d</i>e<i>f</i>';
      i = div.getElementsByTagName('i')[1];
      
      wru.assert(
        i.nextElementSibling.nodeName === 'I' &&
        i.nextElementSibling.textContent === 'f'
      );
    }
  }, {
    name: 'childElementCount',
    test: function () {
      var div = document.createElement('div');
      div.innerHTML = 'a<i>b</i>c<i>d</i>e<i>f</i>';
      
      wru.assert(
        div.childElementCount ===
        div.getElementsByTagName('i').length
      );
    }
  }, {
    name: 'off line synthetic events',
    test: function () {
      var div = document.createElement('div');
      div.addEventListener('click', wru.async(function(e){
        wru.assert('OK');
      }));
      div.dispatchEvent(wru.createEvent('click'));
    }
  }, {
    name: 'offlinse synthetic event MUST bubble',
    test: function () {
      var
        clicked = false,
        checkIfClicked = wru.async(function () {
          wru.assert('should have been clicked', clicked);
        }),
        parentNode = document.createElement('div'),
        childNode = parentNode.appendChild(document.createElement('div')),
        subNode = childNode.appendChild(document.createElement('div'))
      ;
      parentNode.addEventListener('click', function(e){
        clicked = true;
      });
      subNode.addEventListener('click', function() {
        setTimeout(checkIfClicked, 100);
      });
      subNode.dispatchEvent(wru.createEvent('click'));
    }
  }, {
    name: 'online synthetic event bubbling',
    test: function () {
      var
        clicked = false,
        checkIfClicked = wru.async(function () {
          wru.assert('should have be clicked', clicked);
        }),
        parentNode = document.createElement('div'),
        childNode = parentNode.appendChild(document.createElement('div')),
        subNode = childNode.appendChild(document.createElement('div'))
      ;
      parentNode.addEventListener('click', function(e){
        clicked = true;
        parentNode.parentNode.removeChild(parentNode);
      });
      subNode.addEventListener('click', function() {
        setTimeout(checkIfClicked, 100);
      });
      document.body.appendChild(parentNode);
      subNode.dispatchEvent(wru.createEvent('click'));
    }
  }, {
    name: 'offlinse custom event MUST bubble',
    test: function () {
      var
        clicked = false,
        checkIfClicked = wru.async(function () {
          wru.assert('should have been clicked', clicked);
        }),
        parentNode = document.createElement('div'),
        childNode = parentNode.appendChild(document.createElement('div')),
        subNode = childNode.appendChild(document.createElement('div'))
      ;
      parentNode.addEventListener('x:click', function(e){
        clicked = true;
      });
      subNode.addEventListener('x:click', function() {
        setTimeout(checkIfClicked, 100);
      });
      subNode.dispatchEvent(wru.createEvent('x:click'));
    }
  }, {
    name: 'online custom event bubbling',
    test: function () {
      var
        clicked = false,
        checkIfClicked = wru.async(function () {
          wru.assert('should have be clicked', clicked);
        }),
        parentNode = document.createElement('div'),
        childNode = parentNode.appendChild(document.createElement('div')),
        subNode = childNode.appendChild(document.createElement('div'))
      ;
      parentNode.addEventListener('x:click', function(e){
        clicked = true;
        parentNode.parentNode.removeChild(parentNode);
      });
      subNode.addEventListener('x:click', function() {
        setTimeout(checkIfClicked, 100);
      });
      document.body.appendChild(parentNode);
      subNode.dispatchEvent(wru.createEvent('x:click'));
    }
  }, {
    name: 'pageX, pageY and button propertyValues',
    test: function () {
      var a = document.createElement('a');
      a.className = 'target';
      a.addEventListener('mousedown', wru.async(function (e) {
        e.preventDefault();
        wru.assert('pageX is not NaN', !isNaN(e.pageX));
        wru.assert('pageX is not NaN', !isNaN(e.pageY));
        wru.assert('e.buttons is 1', e.buttons == 1);
        wru.assert('e.button is 0', e.button == 0);
        wru.assert('e.which is 1', e.which == 1);
        a.parentNode.removeChild(a);
      }));
      a.href = '#';
      a.innerHTML = 'please left click here to go on with the test';
      document.body.appendChild(a);
    }
  }, {
    name: 'charCode and which propertyValues',
    test: function () {
      var input = document.createElement('input');
      input.className = 'target';
      input.value = 'Please enter a lower "a" to continue: ';
      input.addEventListener('keypress', wru.async(function (e) {
        wru.assert('e.which === 97', e.which === 97);
        wru.assert('e.charCode === 97', e.charCode === 97);
        wru.assert(typeof e.button == 'undefined');
        wru.assert(e.buttons === 0);
        setTimeout(wru.async(function(){
          wru.assert(true);
          input.parentNode.removeChild(input);
        }), 100);
      }));
      document.body.appendChild(input);
    }
  }, {
    name: 'window propertyValues',
    test: function () {
      var html = document.documentElement;
      wru.assert('pageXOffset == scrollLeft', window.pageXOffset === (window.scrollLeft || 0));
      wru.assert('pageYOffset == scrollTop', window.pageYOffset === (window.scrollTop || 0));
      wru.assert('scrollX == scrollLeft', window.scrollX === (window.scrollLeft || 0));
      wru.assert('scrollY == scrollTop', window.scrollY === (window.scrollTop || 0));
      wru.assert('innerWidth == clientWidth', window.innerWidth === html.clientWidth);
      wru.assert('innerHeight == clientHeight', window.innerHeight === html.clientHeight);
    }
  }, {
    name: 'native click & preventDefault',
    test: function () {
      var span = document.createElement('span');
      var a = document.createElement('a');
      window.Clicked = false;
      a.className = 'target';
      a.href = 'javascript:(function(){window.Clicked=true}());';
      a.innerHTML = 'please click here to go on with the test';
      span.appendChild(a);
      span.addEventListener('click', wru.async(function(e){
        wru.assert('default prevented (propagated event)', e.defaultPrevented);
      }));
      a.addEventListener('click', wru.async(function(e){
        e.preventDefault();
        wru.assert('default prevented (source event)', e.defaultPrevented);
        setTimeout(wru.async(function(){
          wru.assert('no click', !window.Clicked);
          window.Clicked = undefined;
          span.parentNode.removeChild(span);
        }), 100);
      }));
      document.body.appendChild(span);
    }
  }, {
    name: 'input event',
    test: function () {
      var firedAlready = false;
      var input = document.createElement('input');
      input.value = 'please write something in here';
      input.addEventListener('input', wru.async(function(e){
        e.preventDefault();
        this.parentNode.removeChild(this);
        wru.assert(e.type === 'input');
      }));
      document.body.appendChild(input);
    }
  }, {
    name: 'native focus',
    test: function () {
      var input = document.createElement('input');
      input.value = 'please focus this element';
      input.addEventListener('focus', wru.async(function (e) {
        this.removeEventListener(e.type, arguments.callee);
        this.parentNode.removeChild(this);
        wru.assert(true);
      }));
      document.body.appendChild(input);
    }
  }, {
    name: 'native blur',
    test: function () {
      var input = document.createElement('input');
      input.value = 'please blur this element';
      input.addEventListener('blur', wru.async(function (e) {
        this.removeEventListener(e.type, arguments.callee);
        this.parentNode.removeChild(this);
        wru.assert(true);
      }));
      document.body.appendChild(input).focus();
    }
  }, {
    name: 'manual native focus',
    test: function () {
      var input = document.createElement('input');
      input.value = 'waiting for focus';
      input.addEventListener('focus', wru.async(function (e) {
        this.removeEventListener(e.type, arguments.callee);
        this.parentNode.removeChild(this);
        wru.assert(true);
      }));
      document.body.appendChild(input);
      setTimeout(function () {
        input.focus();
      }, 500);
    }
  }, {
    name: 'manual native blur',
    test: function () {
      var input = document.createElement('input');
      input.value = 'waiting for blur';
      input.addEventListener('blur', wru.async(function (e) {
        this.removeEventListener(e.type, arguments.callee);
        this.parentNode.removeChild(this);
        wru.assert(true);
      }));
      document.body.appendChild(input).focus();
      setTimeout(function () {
        input.blur();
      }, 500);
    }
  }, {
    name: 'stopPropagation',
    test: function () {
      var
        clicked = false,
        checkIfClicked = wru.async(function () {
          wru.assert('should have NOT be clicked', !clicked);
        }),
        parentNode = document.createElement('div'),
        childNode = parentNode.appendChild(document.createElement('div')),
        subNode = childNode.appendChild(document.createElement('div'))
      ;
      parentNode.addEventListener('click', function(e){
        clicked = true;
        parentNode.parentNode.removeChild(parentNode);
      });
      subNode.addEventListener('click', function(e) {
        e.stopPropagation();
        setTimeout(checkIfClicked, 100);
      });
      document.body.appendChild(parentNode);
      subNode.dispatchEvent(wru.createEvent('click'));
    }
  }, {
    name: 'native & stopImmediatePropagation',
    test: function () {
      // TODO: verify why "click" here might cause problems ...
      var div = document.createElement('div'),
          counter = 0;
      div.addEventListener('test', function(e) {
        counter++;
        e.stopImmediatePropagation();
      });
      div.addEventListener('test', function(e) {
        counter++;
        e.stopImmediatePropagation();
      });
      div.dispatchEvent(wru.createEvent('test'));
      wru.assert('only once', counter === 1);
    }
  },{
    name: 'custom & stopImmediatePropagation',
    test: function () {
      var div = document.createElement('div'),
          counter = 0;
      div.addEventListener('what:ever', function(e) {
        counter++;
        e.stopImmediatePropagation();
      });
      div.addEventListener('what:ever', function(e) {
        counter++;
        e.stopImmediatePropagation();
      });
      div.dispatchEvent(wru.createEvent('what:ever'));
      wru.assert('only once', counter === 1);
    }
  }, {
    name: 'custom & preventDefault',
    test: function () {
      var div = document.createElement('div'),
          subdiv = document.createElement('div'),
          e;
      div.appendChild(subdiv);
      // Important to test propagated event default preventing
      div.addEventListener('x:prevent', function(evt) {
        e = evt;
      });
      subdiv.addEventListener('x:prevent', function(evt) {
        evt.preventDefault();
      });
      subdiv.dispatchEvent(wru.createEvent('x:prevent', true));
      wru.assert('default prevented', e.defaultPrevented);
    }
  }, {
    name: 'manual native click',
    test: function () {
      var a = document.createElement('a');
      window.Clicked = false;
      a.className = 'target';
      a.href = 'javascript:(function(){window.Clicked=true}());';
      a.innerHTML = 'do not click here';
      a.addEventListener('click', wru.async(function(e){
        wru.assert('clicked');
        setTimeout(wru.async(function(){
          wru.assert('click', window.Clicked);
          window.Clicked = undefined;
          a.parentNode.removeChild(a);
        }), 100);
      }));
      document.body.appendChild(a);
      setTimeout(function(){
        a.click();
      }, 500);
    }
  }, {
    name: 'manual dispatched focus',
    test: function () {
      var input = document.createElement('input');
      input.value = 'waiting for focus';
      input.addEventListener('focus', wru.async(function (e) {
        this.removeEventListener(e.type, arguments.callee);
        this.parentNode.removeChild(this);
        wru.assert(true);
      }));
      document.body.appendChild(input);
      setTimeout(function () {
        input.dispatchEvent(wru.createEvent('focus'));
      }, 500);
    }
  }, {
    name: 'manual dispatched blur',
    test: function () {
      var alreadyBlurred = false,
          input = document.createElement('input');
      input.value = 'waiting for blur';
      input.addEventListener('blur', wru.async(function (e) {
        // double event with troubles in Chrome and Safari
        // guarded for them, not for IE8
        if (!alreadyBlurred) {
          alreadyBlurred = true;
          this.removeEventListener(e.type, arguments.callee);
          this.parentNode.removeChild(this);
          wru.assert(true);
        }
      }));
      document.body.appendChild(input).focus();
      setTimeout(function () {
        input.dispatchEvent(wru.createEvent('blur'));
      }, 500);
    }
  }, {
    name: 'textContent - ElementPrototype',
    test: function () {
      var div = document.createElement('div');
      div.textContent = 'abc';
      wru.assert('it has a text node', div.childNodes.length);
      wru.assert('the content is right', div.innerHTML === 'abc');
      wru.assert('the content is returned', div.textContent === 'abc');
    }
  }, {
    name: 'textContent - HTMLCommentElement',
    test: function () {
      var div = document.createElement('div');
      div.innerHTML = 'a <!-- b --> c';
      wru.assert('get', div.childNodes[1].textContent === ' b ');
      div.childNodes[1].textContent = 'c';
      wru.assert('set', div.childNodes[1].textContent === 'c');
    }
  }, {
    name: 'textContent - HTMLScriptElement',
    test: function () {
      var div = document.createElement('div');
      div.innerHTML = 'a <script> b </script> c';
      wru.assert('get', div.childNodes[1].textContent === ' b ');
      div.childNodes[1].textContent = 'c';
      wru.assert('get', div.childNodes[1].textContent === 'c');
    }
  }, {
    name: 'textContent - HTMLStyleElement',
    test: function () {
      var div = document.createElement('div');
      div.innerHTML = 'a <style>html{}</style> c';
      wru.assert('get', /^\s*html\s*\{\s*\}\s*$/i.test(div.childNodes[1].textContent));
      div.childNodes[1].textContent = 'body{}';
      wru.assert('set', /^\s*body\s*\{\s*\}\s*$/i.test(div.childNodes[1].textContent));
    }
  }, {
    name: 'textContent - HTMLTitleElement',
    test: function () {
      var title = document.createElement('title');
      title.innerHTML = '&amp;';
      wru.assert('get', title.textContent === '&');
      title.textContent = '&amp;';
      wru.assert('set', title.textContent === '&amp;');
    }
  }, {
    name: 'textContent - Document fragment',
    test: function () {
      var df = document.createDocumentFragment();
      df.appendChild(document.createTextNode('a'));
      wru.assert('get', df.textContent === 'a');
      df.textContent = 'b';
      wru.assert('set', df.textContent === 'b');
    }
  }, {
    name: 'XMLHttpRequest',
    test: function () {
      var xhr = new XMLHttpRequest,
          OK = wru.async(function () {
            wru.assert('OK');
          });
      xhr.open('get', '?' + Math.random(), true);
      xhr.addEventListener('readystatechange', function () {
        if (this.readyState == 4) {
          OK();
        }
      });
      xhr.send(null);
    }
  }, {
    name: 'select#value',
    test: function () {
      var div = document.createElement('div');
      div.innerHTML = '<select><option selected value="abc">abc</option></select>';
      wru.assert(div.firstChild.value === 'abc');
    }
  }, {
    name: 'HTML5 elements',
    test: function () {
      var section = document.body.appendChild(document.createElement('section'));
      wru.assert(getComputedStyle(section, null).getPropertyValue('display') === 'block');
      section.parentNode.removeChild(section);
    }
  }, {
    name: 'relatedTarget',
    test: function () {
      var box1 = document.createElement('div');
      var box2 = document.createElement('div');
      box1.style.padding = box2.style.padding = '30px 10px';
      box1.style.textAlign = box2.style.textAlign = 'center';
      box1.style.color = box2.style.color = 'white';
      box1.style.background = '#007eff';
      box2.style.background = '#bf00ff';
      box1.innerHTML = 'Move the cursor here';
      box2.innerHTML = 'Move the cursor here. Don\'t touch any other area!';
      box2.style.display = 'none';

      box1.addEventListener('mouseover', function() {
        box1.innerHTML = 'Move the cursor to the bottom area';
        box2.style.display = '';
      });
      box1.addEventListener('mouseout', wru.async(function(event) {
        wru.assert('mouseout', event.relatedTarget === box2);
      }));
      box2.addEventListener('mouseover', wru.async(function(event) {
        wru.assert('mouseover', event.relatedTarget === box1);

        box1.parentNode.removeChild(box1);
        box2.parentNode.removeChild(box2);
      }));

      document.body.appendChild(box1);
      document.body.appendChild(box2);
    }
  }, {
    name: 'HTMLElement',
    test: function () {
      wru.assert('type', typeof window.HTMLElement === 'object');
    }
  }
]);
