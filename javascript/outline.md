A pseudo-code outline for the Font Combinator


On load:
  Remove 'no js' class and add 'js' class
  Check to see if there is a hash, coming from a shared URL
    If there is a hash
      Parse out the selected font faces
        if not a system font, make google font link
      (The rest of this *should* be handled by the PHP)