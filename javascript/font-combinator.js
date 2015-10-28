// using the new-fangled 'use strict'
'use strict';

// The file is organized into the following sections

// SETUP & UTILITIES - inital creation of namespace, utility functions that are used elsewhere
// ASSEMBLE - building pieces of the page
// RESPOND - responding to user events
// SAVE STATE - saving things to localStorage
// SHARING - the sharing functionality
// CSS - to come: displaying generated styles
// INIT - stuff that kicks in on init
// START - starting everything up


/* ______ SETUP & UTILITIES _______ */

// using the fc object to namespace everything, plus a few utility functions
var fc = {
  html: document.querySelector('html'),
  body: document.querySelector('body'),
  content: document.querySelector('.content'),
  apiKey: 'AIzaSyAc3a2WfPaSbA1B25u78zFQRfAide8T34c',
  fontGroupSize: 12, //tweak this to change how many fonts are ganged together to cut down on HTTP requests
  systemFonts: new Array(
    'Arial',
    'Garamond',
    'Georgia',
    'Helvetica',
    'Palatino',
    'Tahoma',
    'Times New Roman',
    'Trebuchet MS',
    'Verdana'
    ),
  elems: new Array(
    'h1',
    'h2',
    'p'
    ),
  checkForSystemFont: function(fontName) {
    if(fc.systemFonts.indexOf(fontName) !== -1){
      return true;
    }
  },
  changeSpacesToPluses: function(str) {
    var str = str.replace(/\ /g,'+');
    return str;
  },
  removeSpaces: function(str) {
    var str = str.replace(/\ /g,'');
    return str;
  },
  changePlusesToSpaces: function(str) {
    var str = str.replace(/\+/g,' ');
    return str;
  },
  removePluses: function(str) {
    var str = str.replace(/\+/g,'');
    return str;
  },
  addLink: function(href) {
    // takes an href and appends a link to the head
    var link = document.createElement('link');
    var base = "http://fonts.googleapis.com/css?family=";
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = base + href; 
    document.querySelector('head').appendChild(link);
  }

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

// This expands the font family select menus to include options from Google Fonts
// we're passed the fontList from fc.apiCall function
fc.addFontOptions = function(fontList) {
  // grabbing all three select menus - could be more elegant, but it works
  var fontSelects = document.querySelectorAll('#h1Font, #h2Font, #pFont');

  // creating a seperator that indicates systems fonts
  var seperator = document.createElement('option');
  seperator.disabled = "disabled";
  seperator.innerHTML = "-- System Fonts --";

  for (var j = fontSelects.length - 1; j >= 0; j--)  {
      var thisSelect = fontSelects[j];
      thisSelect.insertBefore(seperator.cloneNode(true), thisSelect.firstChild);
  };

  // looping through the fontList object
  for (var i = fontList.length - 1; i >= 0; i--) {
    // for now, limiting this list to just latin fonts
    if (fontList[i].subsets.indexOf('latin') !== -1){
      // create an <option> for each font family
      var newOption = document.createElement('option');
      newOption.value = fontList[i].family;
      newOption.innerHTML = fontList[i].family;
    } 

    // insert the new <option> into each select menu
    // I wanted to gang up the options and *then* insert them, but .insertBefore is a right bastard
    // that insists on being given a single node to insert
    for (var j = fontSelects.length - 1; j >= 0; j--)  {
        var thisSelect = fontSelects[j];
        thisSelect.insertBefore(newOption.cloneNode(true), thisSelect.firstChild);
    };

  };
}

fc.requestFonts = function (fontList) {
  
  var groupedFontList = fc.breakArrayIntoGroups(fontList, fc.fontGroupSize);
  //console.log(groupedFontList);

  for (var i=0; i < groupedFontList.length; i++) {
    var fontNames = '';
    for (var j=0; j < groupedFontList[i].length; j++) {
      var family = groupedFontList[i][j].family;
      fontNames += fc.changeSpacesToPluses(family) + '&text=' + fc.removeSpaces(family) + '|';
    }
    
    fc.addLink(fontNames);  // be careful here - this loads *everything*
  }

};


/* ______ RESPOND _______ */

// this changes the on-page styling
fc.changeStyles = function () {
  var newValue = this.value;
  var target = document.querySelector('.content ' + this.getAttribute('data-target'));
  var property = this.getAttribute('data-property');

  if (property === 'fontFamily') {
    if (!fc.checkForSystemFont(newValue)) {
      var href = fc.changeSpacesToPluses(newValue);
      fc.addLink(href); // adding Google Font Link when the user has selected one
    } 

    // this will change the font family regardless
    target.style.fontFamily = newValue;

  } else if (property === 'variant'){
    // variant is a special case 
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

  var apiURL = 'https://www.googleapis.com/webfonts/v1/webfonts?key='+ fc.apiKey +'&sort=alpha&sort=asc';

  request.open('GET', apiURL, true);

  request.onload = function () {
    if (this.status >= 200 && this.status < 400) {
      // Success!
      //var resp = this.response;
        var data = JSON.parse(this.response);
        console.log(this.response);
        fc.addFontOptions(data.items);
        fc.requestFonts(data.items);
    } else {
      // We reached our target server, but it returned an error
        console.log(fallbackData);
    }
  };

  request.onerror = function() {
    // There was a connection error of some sort
      console.error('doh!');
      fc.addFontOptions(fallbackData.items);
      fc.requestFonts(fallbackData.items);
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



// a small subset of the JSON data from google to use in the event I'm not on the interenet while developing
var fallbackData = {
 "kind": "webfonts#webfontList",
 "items": [
  {
   "kind": "webfonts#webfont",
   "family": "ABeeZee",
   "category": "sans-serif",
   "variants": [
    "regular",
    "italic"
   ],
   "subsets": [
    "latin"
   ],
   "version": "v4",
   "lastModified": "2015-04-06",
   "files": {
    "regular": "http://fonts.gstatic.com/s/abeezee/v4/mE5BOuZKGln_Ex0uYKpIaw.ttf",
    "italic": "http://fonts.gstatic.com/s/abeezee/v4/kpplLynmYgP0YtlJA3atRw.ttf"
   }
  },
  {
   "kind": "webfonts#webfont",
   "family": "Abel",
   "category": "sans-serif",
   "variants": [
    "regular"
   ],
   "subsets": [
    "latin"
   ],
   "version": "v6",
   "lastModified": "2015-04-06",
   "files": {
    "regular": "http://fonts.gstatic.com/s/abel/v6/RpUKfqNxoyNe_ka23bzQ2A.ttf"
   }
  },
  {
   "kind": "webfonts#webfont",
   "family": "Abril Fatface",
   "category": "display",
   "variants": [
    "regular"
   ],
   "subsets": [
    "latin-ext",
    "latin"
   ],
   "version": "v8",
   "lastModified": "2015-04-06",
   "files": {
    "regular": "http://fonts.gstatic.com/s/abrilfatface/v8/X1g_KwGeBV3ajZIXQ9VnDojjx0o0jr6fNXxPgYh_a8Q.ttf"
   }
  },
  {
   "kind": "webfonts#webfont",
   "family": "Aclonica",
   "category": "sans-serif",
   "variants": [
    "regular"
   ],
   "subsets": [
    "latin"
   ],
   "version": "v6",
   "lastModified": "2015-04-06",
   "files": {
    "regular": "http://fonts.gstatic.com/s/aclonica/v6/M6pHZMPwK3DiBSlo3jwAKQ.ttf"
   }
  },
  {
   "kind": "webfonts#webfont",
   "family": "Acme",
   "category": "sans-serif",
   "variants": [
    "regular"
   ],
   "subsets": [
    "latin"
   ],
   "version": "v5",
   "lastModified": "2015-04-06",
   "files": {
    "regular": "http://fonts.gstatic.com/s/acme/v5/-J6XNtAHPZBEbsifCdBt-g.ttf"
   }
  },
  {
   "kind": "webfonts#webfont",
   "family": "Actor",
   "category": "sans-serif",
   "variants": [
    "regular"
   ],
   "subsets": [
    "latin"
   ],
   "version": "v6",
   "lastModified": "2015-04-06",
   "files": {
    "regular": "http://fonts.gstatic.com/s/actor/v6/ugMf40CrRK6Jf6Yz_xNSmQ.ttf"
   }
  },
  {
   "kind": "webfonts#webfont",
   "family": "Adamina",
   "category": "serif",
   "variants": [
    "regular"
   ],
   "subsets": [
    "latin"
   ],
   "version": "v7",
   "lastModified": "2015-04-06",
   "files": {
    "regular": "http://fonts.gstatic.com/s/adamina/v7/RUQfOodOMiVVYqFZcSlT9w.ttf"
   }
  },
  {
   "kind": "webfonts#webfont",
   "family": "Advent Pro",
   "category": "sans-serif",
   "variants": [
    "100",
    "200",
    "300",
    "regular",
    "500",
    "600",
    "700"
   ],
   "subsets": [
    "latin-ext",
    "greek",
    "latin"
   ],
   "version": "v4",
   "lastModified": "2015-04-06",
   "files": {
    "100": "http://fonts.gstatic.com/s/adventpro/v4/87-JOpSUecTG50PBYK4ysi3USBnSvpkopQaUR-2r7iU.ttf",
    "200": "http://fonts.gstatic.com/s/adventpro/v4/URTSSjIp0Wr-GrjxFdFWnGeudeTO44zf-ht3k-KNzwg.ttf",
    "300": "http://fonts.gstatic.com/s/adventpro/v4/sJaBfJYSFgoB80OL1_66m0eOrDcLawS7-ssYqLr2Xp4.ttf",
    "regular": "http://fonts.gstatic.com/s/adventpro/v4/1NxMBeKVcNNH2H46AUR3wfesZW2xOQ-xsNqO47m55DA.ttf",
    "500": "http://fonts.gstatic.com/s/adventpro/v4/7kBth2-rT8tP40RmMMXMLJp-63r6doWhTEbsfBIRJ7A.ttf",
    "600": "http://fonts.gstatic.com/s/adventpro/v4/3Jo-2maCzv2QLzQBzaKHV_pTEJqju4Hz1txDWij77d4.ttf",
    "700": "http://fonts.gstatic.com/s/adventpro/v4/M4I6QiICt-ey_wZTpR2gKwJKKGfqHaYFsRG-T3ceEVo.ttf"
   }
  },
  {
   "kind": "webfonts#webfont",
   "family": "Aguafina Script",
   "category": "handwriting",
   "variants": [
    "regular"
   ],
   "subsets": [
    "latin-ext",
    "latin"
   ],
   "version": "v5",
   "lastModified": "2015-04-06",
   "files": {
    "regular": "http://fonts.gstatic.com/s/aguafinascript/v5/65g7cgMtMGnNlNyq_Z6CvMxLhO8OSNnfAp53LK1_iRs.ttf"
   }
  },
  {
   "kind": "webfonts#webfont",
   "family": "Akronim",
   "category": "display",
   "variants": [
    "regular"
   ],
   "subsets": [
    "latin-ext",
    "latin"
   ],
   "version": "v5",
   "lastModified": "2015-04-06",
   "files": {
    "regular": "http://fonts.gstatic.com/s/akronim/v5/qA0L2CSArk3tuOWE1AR1DA.ttf"
   }
  },
  {
   "kind": "webfonts#webfont",
   "family": "Aladin",
   "category": "handwriting",
   "variants": [
    "regular"
   ],
   "subsets": [
    "latin-ext",
    "latin"
   ],
   "version": "v5",
   "lastModified": "2015-04-06",
   "files": {
    "regular": "http://fonts.gstatic.com/s/aladin/v5/PyuJ5cVHkduO0j5fAMKvAA.ttf"
   }
  },
  {
   "kind": "webfonts#webfont",
   "family": "Aldrich",
   "category": "sans-serif",
   "variants": [
    "regular"
   ],
   "subsets": [
    "latin"
   ],
   "version": "v6",
   "lastModified": "2015-04-06",
   "files": {
    "regular": "http://fonts.gstatic.com/s/aldrich/v6/kMMW1S56gFx7RP_mW1g-Eg.ttf"
   }
  },
  {
   "kind": "webfonts#webfont",
   "family": "Alef",
   "category": "sans-serif",
   "variants": [
    "regular",
    "700"
   ],
   "subsets": [
    "hebrew",
    "latin"
   ],
   "version": "v5",
   "lastModified": "2015-04-08",
   "files": {
    "regular": "http://fonts.gstatic.com/s/alef/v5/ENvZ_P0HBDQxNZYCQO0lUA.ttf",
    "700": "http://fonts.gstatic.com/s/alef/v5/VDgZJhEwudtOzOFQpZ8MEA.ttf"
   }
  },
  {
   "kind": "webfonts#webfont",
   "family": "Alegreya",
   "category": "serif",
   "variants": [
    "regular",
    "italic",
    "700",
    "700italic",
    "900",
    "900italic"
   ],
   "subsets": [
    "latin-ext",
    "latin"
   ],
   "version": "v7",
   "lastModified": "2015-04-06",
   "files": {
    "regular": "http://fonts.gstatic.com/s/alegreya/v7/62J3atXd6bvMU4qO_ca-eA.ttf",
    "italic": "http://fonts.gstatic.com/s/alegreya/v7/cbshnQGxwmlHBjUil7DaIfesZW2xOQ-xsNqO47m55DA.ttf",
    "700": "http://fonts.gstatic.com/s/alegreya/v7/5oZtdI5-wQwgAFrd9erCsaCWcynf_cDxXwCLxiixG1c.ttf",
    "700italic": "http://fonts.gstatic.com/s/alegreya/v7/IWi8e5bpnqhMRsZKTcTUWgJKKGfqHaYFsRG-T3ceEVo.ttf",
    "900": "http://fonts.gstatic.com/s/alegreya/v7/oQeMxX-vxGImzDgX6nxA7KCWcynf_cDxXwCLxiixG1c.ttf",
    "900italic": "http://fonts.gstatic.com/s/alegreya/v7/-L71QLH_XqgYWaI1GbOVhp0EAVxt0G0biEntp43Qt6E.ttf"
   }
  },
  {
   "kind": "webfonts#webfont",
   "family": "Alegreya SC",
   "category": "serif",
   "variants": [
    "regular",
    "italic",
    "700",
    "700italic",
    "900",
    "900italic"
   ],
   "subsets": [
    "latin-ext",
    "latin"
   ],
   "version": "v6",
   "lastModified": "2015-04-06",
   "files": {
    "regular": "http://fonts.gstatic.com/s/alegreyasc/v6/3ozeFnTbygMK6PfHh8B-iqCWcynf_cDxXwCLxiixG1c.ttf",
    "italic": "http://fonts.gstatic.com/s/alegreyasc/v6/GOqmv3FLsJ2r6ZALMZVBmkeOrDcLawS7-ssYqLr2Xp4.ttf",
    "700": "http://fonts.gstatic.com/s/alegreyasc/v6/M9OIREoxDkvynwTpBAYUq3e1Pd76Vl7zRpE7NLJQ7XU.ttf",
    "700italic": "http://fonts.gstatic.com/s/alegreyasc/v6/5PCoU7IUfCicpKBJtBmP6c_zJjSACmk0BRPxQqhnNLU.ttf",
    "900": "http://fonts.gstatic.com/s/alegreyasc/v6/M9OIREoxDkvynwTpBAYUqyenaqEuufTBk9XMKnKmgDA.ttf",
    "900italic": "http://fonts.gstatic.com/s/alegreyasc/v6/5PCoU7IUfCicpKBJtBmP6U_yTOUGsoC54csJe1b-IRw.ttf"
   }
  },
  {
   "kind": "webfonts#webfont",
   "family": "Alegreya Sans",
   "category": "sans-serif",
   "variants": [
    "100",
    "100italic",
    "300",
    "300italic",
    "regular",
    "italic",
    "500",
    "500italic",
    "700",
    "700italic",
    "800",
    "800italic",
    "900",
    "900italic"
   ],
   "subsets": [
    "latin-ext",
    "vietnamese",
    "latin"
   ],
   "version": "v3",
   "lastModified": "2015-04-06",
   "files": {
    "100": "http://fonts.gstatic.com/s/alegreyasans/v3/TKyx_-JJ6MdpQruNk-t-PJFGFO4uyVFMfB6LZsii7kI.ttf",
    "100italic": "http://fonts.gstatic.com/s/alegreyasans/v3/gRkSP2lBpqoMTVxg7DmVn2cDnjsrnI9_xJ-5gnBaHsE.ttf",
    "300": "http://fonts.gstatic.com/s/alegreyasans/v3/11EDm-lum6tskJMBbdy9acB1LjARzAvdqa1uQC32v70.ttf",
    "300italic": "http://fonts.gstatic.com/s/alegreyasans/v3/WfiXipsmjqRqsDBQ1bA9CnfqlVoxTUFFx1C8tBqmbcg.ttf",
    "regular": "http://fonts.gstatic.com/s/alegreyasans/v3/KYNzioYhDai7mTMnx_gDgn8f0n03UdmQgF_CLvNR2vg.ttf",
    "italic": "http://fonts.gstatic.com/s/alegreyasans/v3/TKyx_-JJ6MdpQruNk-t-PD4G9C9ttb0Oz5Cvf0qOitE.ttf",
    "500": "http://fonts.gstatic.com/s/alegreyasans/v3/11EDm-lum6tskJMBbdy9aQqQmZ7VjhwksfpNVG0pqGc.ttf",
    "500italic": "http://fonts.gstatic.com/s/alegreyasans/v3/WfiXipsmjqRqsDBQ1bA9Cs7DCVO6wo6i5LKIyZDzK40.ttf",
    "700": "http://fonts.gstatic.com/s/alegreyasans/v3/11EDm-lum6tskJMBbdy9aVCbmAUID8LN-q3pJpOk3Ys.ttf",
    "700italic": "http://fonts.gstatic.com/s/alegreyasans/v3/WfiXipsmjqRqsDBQ1bA9CpF66r9C4AnxxlBlGd7xY4g.ttf",
    "800": "http://fonts.gstatic.com/s/alegreyasans/v3/11EDm-lum6tskJMBbdy9acxnD5BewVtRRHHljCwR2bM.ttf",
    "800italic": "http://fonts.gstatic.com/s/alegreyasans/v3/WfiXipsmjqRqsDBQ1bA9CicOAJ_9MkLPbDmrtXDPbIU.ttf",
    "900": "http://fonts.gstatic.com/s/alegreyasans/v3/11EDm-lum6tskJMBbdy9aW42xlVP-j5dagE7-AU2zwg.ttf",
    "900italic": "http://fonts.gstatic.com/s/alegreyasans/v3/WfiXipsmjqRqsDBQ1bA9ChRaDUI9aE8-k7PrIG2iiuo.ttf"
   }
  },
  {
   "kind": "webfonts#webfont",
   "family": "Alegreya Sans SC",
   "category": "sans-serif",
   "variants": [
    "100",
    "100italic",
    "300",
    "300italic",
    "regular",
    "italic",
    "500",
    "500italic",
    "700",
    "700italic",
    "800",
    "800italic",
    "900",
    "900italic"
   ],
   "subsets": [
    "latin-ext",
    "vietnamese",
    "latin"
   ],
   "version": "v3",
   "lastModified": "2015-04-06",
   "files": {
    "100": "http://fonts.gstatic.com/s/alegreyasanssc/v3/trwFkDJLOJf6hqM93944kVnzStfdnFU-MXbO84aBs_M.ttf",
    "100italic": "http://fonts.gstatic.com/s/alegreyasanssc/v3/qG3gA9iy5RpXMH4crZboqqakMVR0XlJhO7VdJ8yYvA4.ttf",
    "300": "http://fonts.gstatic.com/s/alegreyasanssc/v3/AjAmkoP1y0Vaad0UPPR46-1IqtfxJspFjzJp0SaQRcI.ttf",
    "300italic": "http://fonts.gstatic.com/s/alegreyasanssc/v3/0VweK-TO3aQgazdxg8fs0CnTKaH808trtzttbEg4yVA.ttf",
    "regular": "http://fonts.gstatic.com/s/alegreyasanssc/v3/6kgb6ZvOagoVIRZyl8XV-EklWX-XdLVn1WTiuGuvKIU.ttf",
    "italic": "http://fonts.gstatic.com/s/alegreyasanssc/v3/trwFkDJLOJf6hqM93944kTfqo69HNOlCNZvbwAmUtiA.ttf",
    "500": "http://fonts.gstatic.com/s/alegreyasanssc/v3/AjAmkoP1y0Vaad0UPPR46_hHTluI57wqxl55RvSYo3s.ttf",
    "500italic": "http://fonts.gstatic.com/s/alegreyasanssc/v3/0VweK-TO3aQgazdxg8fs0NqVvxKdFVwqwzilqfVd39U.ttf",
    "700": "http://fonts.gstatic.com/s/alegreyasanssc/v3/AjAmkoP1y0Vaad0UPPR4600aId5t1FC-xZ8nmpa_XLk.ttf",
    "700italic": "http://fonts.gstatic.com/s/alegreyasanssc/v3/0VweK-TO3aQgazdxg8fs0IBYn3VD6xMEnodOh8pnFw4.ttf",
    "800": "http://fonts.gstatic.com/s/alegreyasanssc/v3/AjAmkoP1y0Vaad0UPPR46wQgSHD3Lo1Mif2Wkk5swWA.ttf",
    "800italic": "http://fonts.gstatic.com/s/alegreyasanssc/v3/0VweK-TO3aQgazdxg8fs0HStmCm6Rs90XeztCALm0H8.ttf",
    "900": "http://fonts.gstatic.com/s/alegreyasanssc/v3/AjAmkoP1y0Vaad0UPPR461Rf9EWUSEX_PR1d_gLKfpM.ttf",
    "900italic": "http://fonts.gstatic.com/s/alegreyasanssc/v3/0VweK-TO3aQgazdxg8fs0IvtwEfTCJoOJugANj-jWDI.ttf"
   }
  },
  {
   "kind": "webfonts#webfont",
   "family": "Alex Brush",
   "category": "handwriting",
   "variants": [
    "regular"
   ],
   "subsets": [
    "latin-ext",
    "latin"
   ],
   "version": "v6",
   "lastModified": "2015-04-06",
   "files": {
    "regular": "http://fonts.gstatic.com/s/alexbrush/v6/ooh3KJFbKJSUoIRWfiu8o_esZW2xOQ-xsNqO47m55DA.ttf"
   }
  },
  {
   "kind": "webfonts#webfont",
   "family": "Alfa Slab One",
   "category": "display",
   "variants": [
    "regular"
   ],
   "subsets": [
    "latin"
   ],
   "version": "v5",
   "lastModified": "2015-04-06",
   "files": {
    "regular": "http://fonts.gstatic.com/s/alfaslabone/v5/Qx6FPcitRwTC_k88tLPc-Yjjx0o0jr6fNXxPgYh_a8Q.ttf"
   }
  },
  {
   "kind": "webfonts#webfont",
   "family": "Alice",
   "category": "serif",
   "variants": [
    "regular"
   ],
   "subsets": [
    "latin"
   ],
   "version": "v7",
   "lastModified": "2015-04-06",
   "files": {
    "regular": "http://fonts.gstatic.com/s/alice/v7/wZTAfivekBqIg-rk63nFvQ.ttf"
   }
  },
  {
   "kind": "webfonts#webfont",
   "family": "Alike",
   "category": "serif",
   "variants": [
    "regular"
   ],
   "subsets": [
    "latin"
   ],
   "version": "v7",
   "lastModified": "2015-04-06",
   "files": {
    "regular": "http://fonts.gstatic.com/s/alike/v7/Ho8YpRKNk_202fwDiGNIyw.ttf"
   }
  },
  {
   "kind": "webfonts#webfont",
   "family": "Alike Angular",
   "category": "serif",
   "variants": [
    "regular"
   ],
   "subsets": [
    "latin"
   ],
   "version": "v6",
   "lastModified": "2015-04-06",
   "files": {
    "regular": "http://fonts.gstatic.com/s/alikeangular/v6/OpeCu4xxI3qO1C7CZcJtPT3XH2uEnVI__ynTBvNyki8.ttf"
   }
  },
  {
   "kind": "webfonts#webfont",
   "family": "Allan",
   "category": "display",
   "variants": [
    "regular",
    "700"
   ],
   "subsets": [
    "latin-ext",
    "latin"
   ],
   "version": "v7",
   "lastModified": "2015-04-06",
   "files": {
    "regular": "http://fonts.gstatic.com/s/allan/v7/T3lemhgZmLQkQI2Qc2bQHA.ttf",
    "700": "http://fonts.gstatic.com/s/allan/v7/zSxQiwo7wgnr7KkMXhSiag.ttf"
   }
  },
  {
   "kind": "webfonts#webfont",
   "family": "Allerta",
   "category": "sans-serif",
   "variants": [
    "regular"
   ],
   "subsets": [
    "latin"
   ],
   "version": "v7",
   "lastModified": "2015-04-06",
   "files": {
    "regular": "http://fonts.gstatic.com/s/allerta/v7/s9FOEuiJFTNbMe06ifzV8g.ttf"
   }
  },
  {
   "kind": "webfonts#webfont",
   "family": "Allerta Stencil",
   "category": "sans-serif",
   "variants": [
    "regular"
   ],
   "subsets": [
    "latin"
   ],
   "version": "v7",
   "lastModified": "2015-04-06",
   "files": {
    "regular": "http://fonts.gstatic.com/s/allertastencil/v7/CdSZfRtHbQrBohqmzSdDYFf2eT4jUldwg_9fgfY_tHc.ttf"
   }
  },
  {
   "kind": "webfonts#webfont",
   "family": "Allura",
   "category": "handwriting",
   "variants": [
    "regular"
   ],
   "subsets": [
    "latin-ext",
    "latin"
   ],
   "version": "v4",
   "lastModified": "2015-04-06",
   "files": {
    "regular": "http://fonts.gstatic.com/s/allura/v4/4hcqgZanyuJ2gMYWffIR6A.ttf"
   }
  },
  {
   "kind": "webfonts#webfont",
   "family": "Almendra",
   "category": "serif",
   "variants": [
    "regular",
    "italic",
    "700",
    "700italic"
   ],
   "subsets": [
    "latin-ext",
    "latin"
   ],
   "version": "v8",
   "lastModified": "2015-04-06",
   "files": {
    "regular": "http://fonts.gstatic.com/s/almendra/v8/PDpbB-ZF7deXAAEYPkQOeg.ttf",
    "italic": "http://fonts.gstatic.com/s/almendra/v8/CNWLyiDucqVKVgr4EMidi_esZW2xOQ-xsNqO47m55DA.ttf",
    "700": "http://fonts.gstatic.com/s/almendra/v8/ZpLdQMj7Q2AFio4nNO6A76CWcynf_cDxXwCLxiixG1c.ttf",
    "700italic": "http://fonts.gstatic.com/s/almendra/v8/-tXHKMcnn6FqrhJV3l1e3QJKKGfqHaYFsRG-T3ceEVo.ttf"
   }
  },
  {
   "kind": "webfonts#webfont",
   "family": "Almendra Display",
   "category": "display",
   "variants": [
    "regular"
   ],
   "subsets": [
    "latin-ext",
    "latin"
   ],
   "version": "v6",
   "lastModified": "2015-04-03",
   "files": {
    "regular": "http://fonts.gstatic.com/s/almendradisplay/v6/2Zuu97WJ_ez-87yz5Ai8fF6uyC_qD11hrFQ6EGgTJWI.ttf"
   }
  },
  {
   "kind": "webfonts#webfont",
   "family": "Almendra SC",
   "category": "serif",
   "variants": [
    "regular"
   ],
   "subsets": [
    "latin"
   ],
   "version": "v6",
   "lastModified": "2015-04-03",
   "files": {
    "regular": "http://fonts.gstatic.com/s/almendrasc/v6/IuiLd8Fm9I6raSalxMoWeaCWcynf_cDxXwCLxiixG1c.ttf"
   }
  },
  {
   "kind": "webfonts#webfont",
   "family": "Amarante",
   "category": "display",
   "variants": [
    "regular"
   ],
   "subsets": [
    "latin-ext",
    "latin"
   ],
   "version": "v4",
   "lastModified": "2015-04-06",
   "files": {
    "regular": "http://fonts.gstatic.com/s/amarante/v4/2dQHjIBWSpydit5zkJZnOw.ttf"
   }
  },
  {
   "kind": "webfonts#webfont",
   "family": "Amaranth",
   "category": "sans-serif",
   "variants": [
    "regular",
    "italic",
    "700",
    "700italic"
   ],
   "subsets": [
    "latin"
   ],
   "version": "v6",
   "lastModified": "2015-04-06",
   "files": {
    "regular": "http://fonts.gstatic.com/s/amaranth/v6/7VcBog22JBHsHXHdnnycTA.ttf",
    "italic": "http://fonts.gstatic.com/s/amaranth/v6/UrJlRY9LcVERJSvggsdBqPesZW2xOQ-xsNqO47m55DA.ttf",
    "700": "http://fonts.gstatic.com/s/amaranth/v6/j5OFHqadfxyLnQRxFeox6qCWcynf_cDxXwCLxiixG1c.ttf",
    "700italic": "http://fonts.gstatic.com/s/amaranth/v6/BHyuYFj9nqLFNvOvGh0xTwJKKGfqHaYFsRG-T3ceEVo.ttf"
   }
  },
  {
   "kind": "webfonts#webfont",
   "family": "Amatic SC",
   "category": "handwriting",
   "variants": [
    "regular",
    "700"
   ],
   "subsets": [
    "latin"
   ],
   "version": "v6",
   "lastModified": "2015-04-06",
   "files": {
    "regular": "http://fonts.gstatic.com/s/amaticsc/v6/MldbRWLFytvqxU1y81xSVg.ttf",
    "700": "http://fonts.gstatic.com/s/amaticsc/v6/IDnkRTPGcrSVo50UyYNK7y3USBnSvpkopQaUR-2r7iU.ttf"
   }
  },
  {
   "kind": "webfonts#webfont",
   "family": "Amethysta",
   "category": "serif",
   "variants": [
    "regular"
   ],
   "subsets": [
    "latin"
   ],
   "version": "v4",
   "lastModified": "2015-04-06",
   "files": {
    "regular": "http://fonts.gstatic.com/s/amethysta/v4/1jEo9tOFIJDolAUpBnWbnA.ttf"
   }
  },
  {
   "kind": "webfonts#webfont",
   "family": "Amiri",
   "category": "serif",
   "variants": [
    "regular",
    "italic",
    "700",
    "700italic"
   ],
   "subsets": [
    "arabic",
    "latin"
   ],
   "version": "v7",
   "lastModified": "2015-04-07",
   "files": {
    "regular": "http://fonts.gstatic.com/s/amiri/v7/ATARrPmSew75SlpOw2YABQ.ttf",
    "italic": "http://fonts.gstatic.com/s/amiri/v7/3t1yTQlLUXBw8htrqlXBrw.ttf",
    "700": "http://fonts.gstatic.com/s/amiri/v7/WQsR_moz-FNqVwGYgptqiA.ttf",
    "700italic": "http://fonts.gstatic.com/s/amiri/v7/uF8aNEyD0bxMeTBg9bFDSPesZW2xOQ-xsNqO47m55DA.ttf"
   }
  },
  {
   "kind": "webfonts#webfont",
   "family": "Amita",
   "category": "monospace",
   "variants": [
    "regular",
    "700"
   ],
   "subsets": [
    "devanagari",
    "latin-ext",
    "latin"
   ],
   "version": "v1",
   "lastModified": "2015-05-21",
   "files": {
    "regular": "http://fonts.gstatic.com/s/amita/v1/RhdhGBXSJqkHo6g7miTEcQ.ttf",
    "700": "http://fonts.gstatic.com/s/amita/v1/cIYA2Lzp7l2pcGsqpUidBg.ttf"
   }
  },
  {
   "kind": "webfonts#webfont",
   "family": "Anaheim",
   "category": "sans-serif",
   "variants": [
    "regular"
   ],
   "subsets": [
    "latin-ext",
    "latin"
   ],
   "version": "v4",
   "lastModified": "2015-04-06",
   "files": {
    "regular": "http://fonts.gstatic.com/s/anaheim/v4/t-z8aXHMpgI2gjN_rIflKA.ttf"
   }
  },
  {
   "kind": "webfonts#webfont",
   "family": "Andada",
   "category": "serif",
   "variants": [
    "regular"
   ],
   "subsets": [
    "latin-ext",
    "latin"
   ],
   "version": "v7",
   "lastModified": "2015-04-06",
   "files": {
    "regular": "http://fonts.gstatic.com/s/andada/v7/rSFaDqNNQBRw3y19MB5Y4w.ttf"
   }
  },
  {
   "kind": "webfonts#webfont",
   "family": "Andika",
   "category": "sans-serif",
   "variants": [
    "regular"
   ],
   "subsets": [
    "cyrillic",
    "latin-ext",
    "cyrillic-ext",
    "latin"
   ],
   "version": "v6",
   "lastModified": "2015-04-06",
   "files": {
    "regular": "http://fonts.gstatic.com/s/andika/v6/oe-ag1G0lcqZ3IXfeEgaGg.ttf"
   }
  },
  {
   "kind": "webfonts#webfont",
   "family": "Angkor",
   "category": "display",
   "variants": [
    "regular"
   ],
   "subsets": [
    "khmer"
   ],
   "version": "v8",
   "lastModified": "2015-04-06",
   "files": {
    "regular": "http://fonts.gstatic.com/s/angkor/v8/DLpLgIS-8F10ecwKqCm95Q.ttf"
   }
  },
  {
   "kind": "webfonts#webfont",
   "family": "Annie Use Your Telescope",
   "category": "handwriting",
   "variants": [
    "regular"
   ],
   "subsets": [
    "latin"
   ],
   "version": "v6",
   "lastModified": "2015-04-06",
   "files": {
    "regular": "http://fonts.gstatic.com/s/annieuseyourtelescope/v6/2cuiO5VmaR09C8SLGEQjGqbp7mtG8sPlcZvOaO8HBak.ttf"
   }
  },
  {
   "kind": "webfonts#webfont",
   "family": "Anonymous Pro",
   "category": "monospace",
   "variants": [
    "regular",
    "italic",
    "700",
    "700italic"
   ],
   "subsets": [
    "cyrillic",
    "latin-ext",
    "greek",
    "latin"
   ],
   "version": "v8",
   "lastModified": "2015-04-06",
   "files": {
    "regular": "http://fonts.gstatic.com/s/anonymouspro/v8/Zhfjj_gat3waL4JSju74E-V_5zh5b-_HiooIRUBwn1A.ttf",
    "italic": "http://fonts.gstatic.com/s/anonymouspro/v8/q0u6LFHwttnT_69euiDbWKwIsuKDCXG0NQm7BvAgx-c.ttf",
    "700": "http://fonts.gstatic.com/s/anonymouspro/v8/WDf5lZYgdmmKhO8E1AQud--Cz_5MeePnXDAcLNWyBME.ttf",
    "700italic": "http://fonts.gstatic.com/s/anonymouspro/v8/_fVr_XGln-cetWSUc-JpfA1LL9bfs7wyIp6F8OC9RxA.ttf"
   }
  }

 ]
}