// using the new-fangled 'use strict'
'use strict';

// The file is organized into the following sections

// SETUP - inital creation of namespace
// ASSEMBLE - building pieces of the page
// RESPOND - responding to user events
// SAVE STATE - saving things to localStorage
// SHARING - the sharing functionality
// CSS - to come: displaying generated styles
// INIT - stuff that kicks in on init
// START - starting everything up


/* ______ SETUP _______ */

// using the fc object to namespace everything
var fc = {
  html: document.querySelector('html'),
  body: document.querySelector('body'),
  content: document.querySelector('.content'),
};

var Config = function () {
  var fontFamily,
      fontSize,
      fontWeight,
      fontStyle,
      lineHeight,
      color
}

/* ______ ASSEMBLE _______ */

// found here: http://jsfiddle.net/jfriend00/g95umf40/
fc.breakArrayIntoGroups = function (data, maxPerGroup) {
  var groups = [];
  for (var index = 0; index < data.length; index += maxPerGroup) {
      groups.push(data.slice(index, index + maxPerGroup));
  }
  return groups;
}


fc.requestFonts = function (fontList) {
  var base = "http://fonts.googleapis.com/css?family=";
  var groupedFontList = fc.breakArrayIntoGroups(fontList, 6);

  console.log(groupedFontList);

  for (var i=0, j = groupedFontList.length; i < j; i++) {
    //console.log(groupedFontList[i].length);

    for (var k=0, l = groupedFontList[i][k].length; k < l; k++) {
      console.log(groupedFontList[i][k]);
    }
  }

};


/* ______ RESPOND _______ */

// this changes the on-page styling
fc.changeStyles = function (){
  var newValue = this.value;
  var target = document.querySelector('.content ' + this.getAttribute('data-target'));
  var property = this.getAttribute('data-property');

  // variant is a special case 
  if (property === 'variant'){
    console.log(property);
    
  } else {
    //everthing else is pretty straight forward
    target.style[property] = newValue;
  } 
  
}

fc.addListeners = function(){
  var targets = document.querySelectorAll('select, [type="number"], [type="color"]');

  for (var i = targets.length - 1; i >= 0; i--) {
    targets[i].addEventListener('change', fc.changeStyles, false);
  };  
}

/* ______ INIT _______ */

fc.doesBrowserCutMustard = function () {
  if('querySelector' in document
    && 'localStorage' in window
    && 'addEventListener' in window) {
    return true;
  }
}

fc.browserWarning = function () {
  var browserWarning = document.createElement('p');
  browserWarning.classList.add('browser-warning');
  browserWarning.innerHTML = 'Your browser does not seem to support some of the features the Font Combinator needs in order to use some of the advanced features. Please consider using a modern browser such as <a href="https://www.google.com/chrome/">Google Chrome</a> or <a href="https://www.mozilla.org/en-US/firefox/new/">Mozilla Firefox</a>';
  fc.body.insertBefore(browserWarning, fc.content)
}

fc.intialDOMManipulation = function () {
  document.querySelector('.fc-submit').remove(); //hiding the submit button
  document.querySelector('.fc-reset').remove();
  // TODO: need to swap check boxes with buttons here
}

fc.apiCall = function () {
  var request = new XMLHttpRequest();

  var apiURL = 'https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyAc3a2WfPaSbA1B25u78zFQRfAide8T34c&sort=alpha&sort=desc';

  request.open('GET', apiURL, true);

  request.onload = function () {
    if (this.status >= 200 && this.status < 400) {
      // Success!
      //var resp = this.response;
        var data = JSON.parse(this.response);
        fc.requestFonts(data.items);
    } else {
      // We reached our target server, but it returned an error
        console.log('doh!');
    }
  };

  request.onerror = function() {
    // There was a connection error of some sort
      console.log('doh!');
  };
  request.send();
};

/* ______ START _______ */

// initiating the whole thing with a self executing function
fc.init = function () {

  // this actually gets the party started
  if(fc.doesBrowserCutMustard()){
    fc.apiCall();
    //fc.intialDOMManipulation();
    fc.addListeners();
  } else {
    fc.browserWarning();
  }
  
}();
