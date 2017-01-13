export default class Events {

  constructor () {
    this.listeners = {};
    this.emit = function (ev, data) {
      (this.listeners[ev] || []).map(function (f) { f(data) });
    };
    this.on = function (ev, f) {
      (this.listeners[ev] = this.listeners[ev] || []).push(f);
    };

    this.off = function (ev, f) {
      var i;
      if (this.listeners[ev] && (i = ~this.listeners[ev].indexOf(f)))
        this.listeners[ev].splice(-i - 1, 1);
      else if (ev)
        delete this.listeners[ev];
      else
        this.listeners = {};
    };
  }
}

// tests
//var log = function (what) { return function () { console.log(what); }; };

//var one = events();

//one.on('event', log(1));
//one.emit('event'); // 1

//one.on('event', log(2));
//one.off('event');
//one.emit('event'); //

//one.on('event', log(3));
//one.off();
//one.emit('event'); //

//var log5,
//two = events();

//two.on('event', log(4));
//two.on('event', (log5 = log(5)));
//two.on('event', log(6));
//two.off('event', log5);
//two.emit('event'); // 4, 6

//two.off('event');
//two.emit('event'); //
