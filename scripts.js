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

  for(var i in courseList) {
    var course = courseList[i];
    var pane = generateCoursePane(course);
    pane.style.display = 'none';
    course.pane = pane;
    viewDiv.appendChild(pane);
    var tab = generateCourseTab(course);
    menuDiv.appendChild(tab);
    course.tab = tab;
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
  thulabel.appendChild(dctn('T'))
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
    // TODO: Add event tabs
  }
  var addevent = dce('h3');
  addevent.appendChild(dctn('Add an Event'));
  addevent.onclick = () => {
    // TODO: Add Event Wizard
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
    // TODO: Add source tabs
  }
  var addsource = dce('h3');
  addsource.appendChild(dctn('Add a Source'));
  addsource.onclick = () => {
    // TOOD: Add Source Wizard
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
  // TODO: Finish pane implementation (linked sources, linked events, timeslot, dates, etc.)
}

// Creates a tab for the menu for a course.
generateCourseTab = function(course) {
  var tab = document.createElement('div');
  tab.onclick = () => {
    for (let i = 0; i < viewDiv.children.length; i++) {
      viewDiv.children[i].style.display = 'none';
    }
    course.pane.style.display = 'block';
  }
  var title = document.createElement('h1');
  title.appendChild(document.createTextNode(course.name));
  tab.appendChild(title);
  tab.classList.add("menubutton");
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
  menuDiv.appendChild(tab);
  form.reset();
}
