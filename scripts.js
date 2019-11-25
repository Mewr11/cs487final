/**
 * This js file is for mundane things like handling interface-related stuff: Button clicks, element creation, etc.
 */

// Global variables
var courseList;
var menuDiv;
var viewDiv;
var courseWizardTab;
var courseWizardDiv;

// Function to be called whenever the page is loaded.
onLoad = function() {
  if(/*See below; will be `if(information to load)`*/false) {
    // TODO: Open saved information, if it exists
  } else {
    courseList = [new Course("CS487", "Software Engineering", "11:25", [false, false, true, false, true, false, false]), new Course("CS100", "Intro to the Profession", "3:15", false, true, false, true, false, false, false)];
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
  var pane = document.createElement('div');
  var name = document.createElement('h1');
  var desc = document.createElement('p');
  var timeheader = document.createElement('h2');
  var time = document.createElement('p');
  var daysheader = document.createElement('h2');
  name.appendChild(document.createTextNode(course.name));
  desc.appendChild(document.createTextNode(course.desc));
  timeheader.appendChild(document.createTextNode('Time:'));
  time.appendChild(document.createTextNode(course.time));
  daysheader.appendChild(document.createTextNode('Schedule:'));
  pane.appendChild(name);
  pane.appendChild(desc);
  pane.appendChild(timeheader);
  pane.appendChild(time);
  pane.appendChild(daysheader);
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
