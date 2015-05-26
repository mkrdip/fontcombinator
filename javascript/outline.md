A pseudo-code outline for the Font Combinator


On load:
  Remove any "js needed" messages
  Remove 'no js' class and add 'js' class
  If there is a hash
    Parse out the selected font faces
      if not a system font, make google font link
    (The rest of this *should* be handled by the PHP)
  If there is localStorage
    If there is a stored config
      Parse the config
      Change header styles accordingly
  Call the Google API to get a list of fonts
    If success - pass the font list
    If error - post a message about it
  Determine screen width
    If wide enough - load jQuery and Chosen

