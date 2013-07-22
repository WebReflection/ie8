
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
    name: 'offlinse synthetic event NOT bubbling',
    test: function () {
      var
        clicked = false,
        checkIfClicked = wru.async(function () {
          wru.assert('should have not be clicked', !clicked);
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
    name: 'offlinse custom event NOT bubbling',
    test: function () {
      var
        clicked = false,
        checkIfClicked = wru.async(function () {
          wru.assert('should have not be clicked', !clicked);
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
  }
]);

