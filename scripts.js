/**
 * This js file is for mundane things like handling interface-related stuff: Button clicks, element creation, etc.
 */

// Global variables
var courseList;
var menuDiv;
var viewDiv;
var courseWizardTab;
var courseWizardDiv;
var activeCourse;
var eventWizardDiv;
var sourceWizardDiv;
var sourceFrame;
var activeEventDiv;
var exiter;

// Function to be called whenever the page is loaded.
onLoad = function() {
  if(/*See below; will be `if(information to load)`*/false) {
    // TODO: Open saved information, if it exists
  } else {
    courseList = [new Course("CS487", "Software Engineering", "11:25", [false, false, true, false, true, false, false]),
                  new Course("CS100", "Intro to the Profession", "3:15", [false, true, false, true, false, false, false])];
  }

  menuDiv = document.getElementById('menu');
  viewDiv = document.getElementById('view');
  courseWizardTab = document.getElementById('addcourse');
  courseWizardDiv = document.getElementById('coursewizard');
  eventWizardDiv = document.getElementById('eventwizard');
  sourceWizardDiv = document.getElementById('sourcewizard');
  sourceFrame = document.getElementById('sourceframe');
  exiter = document.getElementById('x');
  exiter.style.display = 'none';
  activeEvent = sourceFrame;

  for(const course of courseList) {
    var pane = generateCoursePane(course);
    pane.style.display = 'none';
    course.pane = pane;
    viewDiv.appendChild(pane);
    var tab = generateCourseTab(course);
    menuDiv.appendChild(tab);
    course.tab = tab;
    course.addEventCallbacks.push(registerNewEvent);
    course.addSourceCallbacks.push(registerNewSource);
  }

  courseWizardTab.onclick = () => {
    for (let i = 0; i < viewDiv.children.length; i++) {
      viewDiv.children[i].style.display = 'none';
    }
    courseWizardDiv.style.display = 'block';
  }
}

// Create an info pane for a course.
generateCoursePane = function(course) {
  var dce = document.createElement.bind(document);
  var dctn = document.createTextNode.bind(document); // To save my hands from writing this out every time.
  var pane = dce('div');
  var name = dce('h1');
  var desc = dce('p');
  var timeheader = dce('h2');
  var time = dce('p');
  name.appendChild(dctn(course.name));
  desc.appendChild(dctn(course.desc));
  timeheader.appendChild(dctn('Time'));
  time.appendChild(dctn(course.time));
  var daysheader = dce('h2');
  daysheader.appendChild(dctn('Schedule'));
  var sun = dce('div');
  var mon = dce('div');
  var tue = dce('div');
  var wed = dce('div');
  var thu = dce('div');
  var fri = dce('div');
  var sat = dce('div');
  sun.classList.add(course.days[0] ? "dayboxon" : "dayboxoff");
  mon.classList.add(course.days[1] ? "dayboxon" : "dayboxoff");
  tue.classList.add(course.days[2] ? "dayboxon" : "dayboxoff");
  wed.classList.add(course.days[3] ? "dayboxon" : "dayboxoff");
  thu.classList.add(course.days[4] ? "dayboxon" : "dayboxoff");
  fri.classList.add(course.days[5] ? "dayboxon" : "dayboxoff");
  sat.classList.add(course.days[6] ? "dayboxon" : "dayboxoff");
  var sunlabel = dce('p');
  var monlabel = dce('p');
  var tuelabel = dce('p');
  var wedlabel = dce('p');
  var thulabel = dce('p');
  var frilabel = dce('p');
  var satlabel = dce('p');
  sunlabel.appendChild(dctn('S'))
  monlabel.appendChild(dctn('M'))
  tuelabel.appendChild(dctn('T'))
  wedlabel.appendChild(dctn('W'))
  thulabel.appendChild(dctn('R'))
  frilabel.appendChild(dctn('F'))
  satlabel.appendChild(dctn('S'))
  sun.appendChild(sunlabel);
  mon.appendChild(monlabel);
  tue.appendChild(tuelabel);
  wed.appendChild(wedlabel);
  thu.appendChild(thulabel);
  fri.appendChild(frilabel);
  sat.appendChild(satlabel);
  var bracer = dce('p');
  bracer.appendChild(dctn("\xa0"));
  bracer.classList.add("dayboxbounding")
  var eventheader = dce('h2');
  eventheader.appendChild(dctn('Events'));
  var eventcontainer = dce('div');
  eventcontainer.classList.add("eventcontainer")
  if(course.events.length == 0) {
    var eventnotifier = dce('p');
    eventnotifier.appendChild(dctn('You do not appear to have any events for this course'));
    eventcontainer.appendChild(eventnotifier);
  } else {
    // TODO: Add event tabs -- LOW priority (Will not see during demo)
  }
  var addevent = dce('h3');
  addevent.appendChild(dctn('Add an Event'));
  addevent.onclick = () => {
    activeCourse = course;
    eventWizardDiv.style.display = 'block';
    exiter.style.display = 'block';
  }
  var sourceheader = dce('h2');
  sourceheader.appendChild(dctn('Sources'));
  var sourcecontainer = dce('div');
  sourcecontainer.classList.add("sourcecontainer");
  if(course.sources.length == 0) {
    var sourcenotifier = dce('p');
    sourcenotifier.appendChild(dctn('You do not appear to have any sources for this course'));
    sourcecontainer.appendChild(sourcenotifier);
  } else {
    // TODO: Add source tabs -- LOW priority (Will not see during demo)
  }
  var addsource = dce('h3');
  addsource.appendChild(dctn('Add a Source'));
  addsource.onclick = () => {
    activeCourse = course;
    sourceWizardDiv.style.display = 'block';
    exiter.style.display = 'block';
  }
  pane.appendChild(name);
  pane.appendChild(desc);
  pane.appendChild(timeheader);
  pane.appendChild(time);
  pane.appendChild(daysheader);
  pane.appendChild(sun);
  pane.appendChild(mon);
  pane.appendChild(tue);
  pane.appendChild(wed);
  pane.appendChild(thu);
  pane.appendChild(fri);
  pane.appendChild(sat);
  pane.appendChild(bracer);
  pane.appendChild(eventheader);
  pane.appendChild(eventcontainer);
  pane.appendChild(addevent);
  pane.appendChild(sourceheader);
  pane.appendChild(sourcecontainer);
  pane.appendChild(addsource);
  return pane;
}

// Creates a tab for the menu for a course.
generateCourseTab = function(course) {
  var dce = document.createElement.bind(document);
  var dctn = document.createTextNode.bind(document);
  var tab = dce('div');
  tab.onclick = () => {
    for (let i = 0; i < viewDiv.children.length; i++) {
      viewDiv.children[i].style.display = 'none';
    }
    course.pane.style.display = 'block';
  }
  var title = dce('h1');
  title.appendChild(dctn(course.name));
  tab.appendChild(title);
  tab.classList.add("menubutton");
  return tab;
}

// Creates an info pane for an event
generateEventPane = function(e) {
    var dce = document.createElement.bind(document);
    var dctn = document.createTextNode.bind(document);
    var pane = dce('div');
    pane.classList.add("eventpane");
    var header = dce('h1');
    header.appendChild(dctn(e.name));
    var dateheader = dce('h2');
    dateheader.appendChild(dctn('Date'));
    var date = dce('p');
    date.appendChild(dctn(e.date));
    var timeheader = dce('h2');
    timeheader.appendChild(dctn('Time'));
    var time = dce('p');
    time.appendChild(dctn(e.time));
    var note = dce('p');
    note.appendChild(dctn(e.note));

    pane.appendChild(header);
    pane.appendChild(dateheader);
    pane.appendChild(date);
    pane.appendChild(timeheader);
    pane.appendChild(time);
    pane.appendChild(note);
    return pane;
}

// Creates a tab for an event
generateEventTab = function(e) {
  var dce = document.createElement.bind(document);
  var dctn = document.createTextNode.bind(document);
  var tab = dce('div');
  tab.classList.add("eventtab");
  var title = dce('h1');
  title.appendChild(dctn(e.name));
  tab.appendChild(title);
  tab.onclick = () => {
    activeEvent = e.pane;
    activeEvent.style.display = 'block';
    exiter.style.display = 'block';
  }
  return tab;
}

// Creates a tab for a source
generateSourceTab = function(source) {
  var dce = document.createElement.bind(document);
  var dctn = document.createTextNode.bind(document);
  var tab = dce('div');
  tab.classList.add("sourcetab");
  var title = dce('h1');
  title.appendChild(dctn(source.name));
  tab.appendChild(title);
  if(source.type == "url") {
    if(!/^http/.test(source.path)) {
      source.path = "http://" + source.path;
    }
    tab.onclick = () => {
      window.open(source.path, '_blank');
    }
  } else {
    tab.onclick = () => {
      sourceFrame.src = source.path;
      sourceFrame.style.display = 'block';
      exiter.style.display = 'block';
    }
  }
  return tab;
}

// Create new course data
submitCourseWizard = function() {
  var form = document.forms["courseWizard"];
  var days = [form["sun"].checked, form["mon"].checked, form["tue"].checked, form["wed"].checked, form["thu"].checked, form["fri"].checked, form["sat"].checked];
  course = new Course(form["name"].value, form["desc"].value, form["time"].value, days);
  courseList.push(course);
  var pane = generateCoursePane(course);
  pane.style.display = 'none';
  course.pane = pane;
  viewDiv.appendChild(pane);
  var tab = generateCourseTab(course);
  course.tab = tab;
  course.addEventCallbacks.push(registerNewEvent);
  course.addSourceCallbacks.push(registerNewSource);
  menuDiv.appendChild(tab);
  form.reset();
}

// Create new event
submitEventWizard = function() {
  var form = document.forms["eventWizard"];
  event = new Event(form["name"].value, form["date"].value, form["time"].value, form["note"].value, activeCourse);
  activeCourse.addEvent(event);
  form.reset();
  eventWizardDiv.style.display = 'none';
  exiter.style.display = 'none';
}

// Create new source
submitSourceWizard = function() {
  var form = document.forms["sourceWizard"];
  source = new Source(form["name"].value, form["path"].value, form["type"].value, activeCourse);
  activeCourse.addSource(source);
  form.reset();
  sourceWizardDiv.style.display = 'none';
  exiter.style.display = 'none';
}

// Exit out of all wizards
exitWizards = function() {
  document.forms["eventWizard"].reset();
  document.forms["sourceWizard"].reset();
  eventWizardDiv.style.display = 'none';
  sourceWizardDiv.style.display = 'none';
  sourceFrame.style.display = 'none';
  sourceFrame.src = '';
  exiter.style.display = 'none';
  activeEvent.style.display = 'none';
}

registerNewEvent = function(e) {
  var pane = generateEventPane(e);
  e.pane = pane;
  var tab = generateEventTab(e);
  e.tab = tab;
  ec = e.parent.pane.children[14]; // event container
  if(e.parent.events.length == 1) {
    ec.removeChild(ec.children[0]);
  }
  ec.appendChild(tab);
  pane.style.display = 'none';
  document.getElementById('page').appendChild(pane);
}

registerNewSource = function(s) {
  var tab = generateSourceTab(s);
  s.tab = tab;
  sc = s.parent.pane.children[17];
  if(s.parent.sources.length == 1) {
    sc.removeChild(sc.children[0]);
  }
  sc.appendChild(tab);
}
