// using the new-fangled 'use strict'
'use strict';

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

function test(){
  console.log(this);
}


var el = document.querySelectorAll('select');


for (var i = el.length - 1; i >= 0; i--) {
  el[i].addEventListener('change', test, false);
};




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
  // need to swap check boxes with buttons here
}

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


// initiating the whole thing with a self executing function
fc.init = function () {
  fc.html.classList.toggle("no-js");
  fc.html.classList.toggle("js");
  document.querySelector('.no-js-warning').remove();

  // this actually gets the party started
  if(fc.doesBrowserCutMustard()){
    fc.apiCall();
    //fc.intialDOMManipulation();
  } else {
    fc.browserWarning();
  }
  
}();

