/**
 * This js file is for back-end things, like our internal representations of courses, events, etc.
 */

class Course {
  // Public fields
  name;
  desc;

  constructor(name, desc, time, days) {
    this.name = name;
    this.desc = desc;
    this.days = days;
    this.time = time;
    this.events = [];
    this.sources = [];
    this.addEventCallbacks = [];
    this.removeEventCallbacks = [];
    this.addSourceCallbacks = [];
    this.removeSourceCallbacks = [];
  }

/**
 * Add the event e to the list of events, then returns the total number of events
 * @param {[type]} e [description]
 */
  addEvent(e) {
    this.events.push(e);
    for (const f in addEventCallbacks) {
      f(e);
    }
    return this.events.length;
  }

/**
 * Remove the event at index i and returns it
 * @param  {[type]} i [description]
 * @return {[type]}   [description]
 */
  removeEvent(i) {
    [this.events[i], this.events[0]] = [this.events[0], this.events[i]];
    e = this.events.shift();
    for (const f in removeEventCallbacks) {
      f(e);
    }
    return e;
  }
}

class Event {
  constructor(name, date, time, note, parent) {
    this.name = name;
    this.data = date;
    this.time = time;
    this.note = note;
    this.parent = parent;
  }
}

class Source {
  constructor(name, path, type, parent) {
    this.name = name;
    // TODO: Copy file from path to correct location
    this.path = path;
    this.type = type;
    this.parent = parent;
  }
}
