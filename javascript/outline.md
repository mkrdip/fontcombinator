A pseudo-code outline for the Font Combinator


On load / init:
  Remove any "js needed" messages x
  Remove 'no js' class and add 'js' class x
  If cuts mustard x
    Remove 'submit' button x
    Swap "hide" checkboxes with buttons
  Else
    Post message about needing a more up to date browser   x
  If there is a hash
    Parse out the selected font faces
      if not a system font, make google font link
    (The rest of this *should* be handled by the PHP)
  If there is localStorage
    If there is a stored config
      Parse the config - JSON Parse
      Change header css accordingly
    Else
      Load default config  
  Call the Google API to get a list of fonts
    If success - **pass the font list**
    If error - post a message about it
  Determine screen width
    If wide enough - load jQuery and Chosen

Assembling page elements:
  Parse the font list from Google
  Change spaces to pluses and back again
  Build out select menus with options for each font
  If wide screen
    Group font list into sets of 6 fonts
      including all variants
      including ONLY the letters in the font name
    Load fonts with <link> elements 
      Possibly try to come up with a loading indicator
    Initiate Chosen on selects
    Load a color picker (?)
    Initiate Color picker

Respond to Changes
  On Change of a Font Name
    Add a new <link> with the Font and all variants
    If the selected font has variants, add variant drop down
    If it does not have variants, remove variant drop down
      Reset targeted element to normal weight / style
    Change the targeted element to the new font family
    Fire a Google Analytics event
  On change of font weight / variant
    Change the targeted element's font weight / style
  On change of font-size
    Change targeted element's font size
  On change of line height
    Change targeted element's line height
  On change of color
    Change targeted element's color
  On change of background color
    Change body background color
  On hiding an element
    Hide targeted element


Saving State   
  On change of any elements
    If localStorage
      Create a new config object - JSON stringify?
        Include font choices, visibility
        Include HTML text 
      If a config object is already stored
        Overwrite it
      Else
        Write the config object to localStorage 
    Else
      do nothing

Sharing
  On click of share button
    Fire a Google Analytics event
    Parse state of the form elements
    turn into a string
    assemble URL with hash
    pass URL to bit.ly
    update short URL box with bit.ly url

CSS
  On click of CSS button
    Fire a Google Analytics event
    Parse which fonts are chosen
      Assemble into a google URL
    Parse state of form elements
    Update style block with selections  