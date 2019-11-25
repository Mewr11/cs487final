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
    for (const f of this.addEventCallbacks) {
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
    for (const f of this.removeEventCallbacks) {
      f(e);
    }
    return e;
  }

  /**
   * Add the source s to the list of events, then returns the total number of events
   * @param {[type]} s [description]
   */
    addSource(s) {
      this.sources.push(s);
      for (const f of this.addSourceCallbacks) {
        f(s);
      }
      return this.sources.length;
    }

  /**
   * Remove the source at index i and returns it
   * @param  {[type]} i [description]
   * @return {[type]}   [description]
   */
    removeSource(i) {
      [this.sources[i], this.sources[0]] = [this.sources[0], this.sources[i]];
      s = this.sources.shift();
      for (const f of this.removeSourceCallbacks) {
        f(s);
      }
      return s;
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
    // TODO: Copy file from path to correct location -- LOW priority (will not be seen in demo)
    this.path = path;
    this.type = type;
    this.parent = parent;
  }
}
