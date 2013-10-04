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

wru.test([
  {
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
  },{
    name: 'off line synthetic events',
    test: function () {
      var div = document.createElement('div');
      div.addEventListener('click', wru.async(function(e){
        wru.assert('OK');
      }));
      div.dispatchEvent(wru.createEvent('click'));
    }
  },{
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
  },{
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
  },{
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
  },{
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
  },
  {
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
  },{
    name: 'native & stopImmediatePropagation',
    test: function () {
      var div = document.createElement('div'),
          counter = 0;
      alert(123);
      div.addEventListener('click', function(e) {
        counter++;
        //e.stopImmediatePropagation();
      });
      div.addEventListener('click', function(e) {
        counter++;
        //e.stopImmediatePropagation();
      });
      div.dispatchEvent(wru.createEvent('click'));
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
  },{
    name: 'custom & preventDefault',
    test: function () {
      var div = document.createElement('div'),
          e;
      div.addEventListener('x:prevent', function(evt) {
        e = evt;
        e.preventDefault();
      });
      div.dispatchEvent(wru.createEvent('x:prevent'));
      wru.assert('default prevented', e.defaultPrevented);
    }
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
    name: 'native click & preventDefault',
    test: function () {
      var a = document.createElement('a');
      window.Clicked = false;
      a.className = 'target';
      a.href = 'javascript:(function(){window.Clicked=true}());';
      a.innerHTML = 'please click here to go on with the test';
      a.addEventListener('click', wru.async(function(e){
        e.preventDefault();
        wru.assert('clicked');
        setTimeout(wru.async(function(){
          wru.assert('no click', !window.Clicked);
          wru.assert('default prevented', e.defaultPrevented);
          window.Clicked = undefined;
          a.parentNode.removeChild(a);
        }), 100);
      }));
      document.body.appendChild(a);
    }
  },
  {
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
  },{
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
  }
  ,
  {
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
  }
  ,
  {
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
  },{
    name: 'textContent',
    test: function () {
      var div = document.createElement('div');
      div.textContent = 'abc';
      wru.assert('it has a text node', div.childNodes.length);
      wru.assert('the content is right', div.innerHTML === 'abc');
      wru.assert('the content is returned', div.textContent === 'abc');
    }
  }
]);

