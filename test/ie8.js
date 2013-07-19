// if included as external script ... it fails ... 
document.addEventListener('DOMContentLoaded', function(e){
  function E(type) {
    var e = document.createEvent('Event');
    e.initEvent(type, true, true);
    return e;
  }
  function show(e) {
    alert([
      'type: ' + e.type,
      'timeStamp: ' + e.timeStamp,
      'eventPhase: ' + e.eventPhase,
      'e.currentTarget: ' + e.currentTarget
    ].join('\n'));
  }
  show(e);
  this.addEventListener('custom-event-name', {handleEvent:function (e) {
    show(e);
    document.removeEventListener(e.type, this);
    // won't trigger anyway
    // document.dispatchEvent(E(e.type));
  }});
  this.documentElement.addEventListener('custom-event-name', show);
  this.body.innerHTML = 'OK, now try to click somewhere';
  this.documentElement.addEventListener('click', function (e) {
    show(e);
    this.dispatchEvent(E('custom-event-name'));
  });
});

