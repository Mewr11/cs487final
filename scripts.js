/**
 * This js file is for mundane things like handling interface-related stuff: Button clicks, element creation, etc.
 */

// Global variables
var courseList;
var menuDiv;
var viewDiv;

// Function to be called whenever the page is loaded.
onLoad = function() {
  if(/*See below; will be `if(information to load)`*/false) {
    // TODO: Open saved information, if it exists
  } else {
    courseList = [new Course("CS487", "Software Engineering", "11:25"), new Course("CS100", "Intro to the Profession", "3:15")];
  }

  menuDiv = document.getElementById('menu');
  viewDiv = document.getElementById('view');

  for(var i in courseList) {
    var course = courseList[i];
    var pane = generateCoursePane(course);
    pane.style.display = 'none';
    course.pane = pane;
    viewDiv.appendChild(pane);
    var tab = generateCourseTab(course);
    menuDiv.appendChild(tab);
  }
}

// Create an info pane for a course.
generateCoursePane = function(course) {
  var pane = document.createElement('div');
  var name = document.createElement('h1');
  var desc = document.createElement('p');
  name.appendChild(document.createTextNode(course.name));
  desc.appendChild(document.createTextNode(course.desc));
  pane.appendChild(name);
  pane.appendChild(desc);
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
return tab;
}
