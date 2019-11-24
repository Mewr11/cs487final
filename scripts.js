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
    courseList = [];
  }

  menuDiv = document.getElementById('menu');
  viewDiv = document.getElementById('view');

  for(const course in courseList) {
    var pane = generateCoursePane(course);
    pane.style.display = 'none';
    course.pane = pane;
    viewDiv.appendChild(pane);
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
