var fc = {
  html: document.querySelector('html')
}



var fcInit = (function () {
  fc.html.classList.toggle("no-js");
  fc.html.classList.toggle("js");

})();


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