// using the new-fangled 'use strict'
'use strict';

var fc = {
  html: document.querySelector('html'),
  body: document.querySelector('body'),
};

fc.doesBrowserCutMustard = function () {
  if('querySelector' in document
    && 'localStorage' in window
    && 'addEventListener' in window) {
    return true;
  }
}

fc.intialDOMManipulation = function () {
  document.querySelector('.fc-submit').remove(); //hiding the submit button
  document.querySelector('.fc-reset').remove();
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
    fc.intialDOMManipulation();
  }
}();

// An outline of functions from the old file:

// getURLVars - parsed set variables from the URL
// config - set default fonts , checking for URL vars
// parameterFonts - acted on the set parameters, including variants, checked for existing matches
// variantsSelectAttach - added variants dropdown, set the selected attribute if needed, styled options
// getFonts - this is a big one: removes default variants list, caches default list, adds link elements to for each font, reappends system font set, set font styling
// bit_url - call bit.ly passing link
// focusShareTextShort - just selected text in shortURL field
// hide submit button
// adding the share link
// selectText - i'm really not sure what this does
// adding controls that only work with js
// changeFonts - another biggie - responds to options changing, attaches full font, actually changes the font
// chosenAttach - added chosen to a bunch of stuff
// defaultFontChange - worked when no google fonts
// variantChange - changed font variant of target element
// font-size change
// line height change
// color change
// hiding elementst
// turned off body spellchecker
// control option change - not sure
// carousel nav - tabbing
// external links
// ajax request
// error handler
// onJSON - what to do when JSON returns
// switching controls when user clicks on an element