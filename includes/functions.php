<?php 

// these are the defaults based on system fonts

global $defaults;

$defaults = array(
  'h1' => array (
    'fontFamily' => 'Georgia',
    'fontVariant' => 'bold',
    'fontSize' => '32',
    'lineHeight' => '1.4',
    'color' => '#000000'
    ),
  'h2' => array (
    'fontFamily' => 'Garamond',
    'fontVariant' => 'normal italic',
    'fontSize' => '24',
    'lineHeight' => '1.4',
    'color' => '#000000'
    ),
  'p' => array (
    'fontFamily' => 'Helvetica',
    'fontVariant' => 'normal',
    'fontSize' => '16',
    'lineHeight' => '1.4',
    'color' => '#000000'
    )
  );

// this global variable is for the system font defaults
global $system;

$system = array (
  'fonts' => array (
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
  'variants' => array (
    'normal',
    'normal italic',
    'bold',
    'bold italic'
    )
  );

// this global variable is for an array with the elements we will be targeting
global $elems;

$elems = array (
  'h1',
  'h2',
  'p'
  );

// this creates a set of <option> elements for each font in $system - needs to be placed within a <select>
function createFontOptions($elem, $system){
  foreach ($system['fonts'] as $font) {
    echo '<option class="system-font" value="' . $font . '" ';
    if(isset($_GET[$elem]) && $_GET[$elem] == $font){
      echo 'selected';
    }
    echo ' >';
    echo $font;
    echo '</option>';
  }
}

// This creates the <option> elements for the variants - needs to be placed within a <select>
function createVariantOptions($elem, $system){
  foreach ($system['variants'] as $variant) {
    echo '<option class="system-variant" value="' . $variant . '" ';
    if(isset($_GET[$elem]) && $_GET[$elem] == $variant){
      echo 'selected';
    }
    echo ' >';
    echo $variant;
    echo '</option>';
  }
}


// This is what generates the <style> element in the header (see header.php for the call)
function createHeaderStyles($elems, $defaults){
  if($_GET){

    echo '<style>';

    // creating a style declaration for each element in the global $elems
    foreach ($elems as $elem) {
      
      // need to make strings of the $elem plus facet
      $varCall = (string)$elem . 'Variant';
      $fontCall = (string)$elem . 'Font';
      $sizeCall = (string)$elem . 'Size';
      $lhCall = (string)$elem . 'LineHeight';
      $visibilityCall = (string)$elem . 'Visibility';
      $colorCall = (string)$elem . 'Color';

      // removing the word 'italic' so we *just* have the weight
      $weight = str_replace(' italic', '', $_GET[$varCall]);

      //transforming weights into numbers
      switch($weight) {
        case 'normal':
          $weight = '400';
          break;
        case 'semibold':
          $weight = '500';
          break;
        case 'bold':
          $weight = '600';
          break;  
      }

      // the rules will only target elements within the .content div
      echo '.content ' . $elem . '{'; 
      echo "\n";  //makes a new line for easier reading

      // checks to see if it's hidden
      if (isset($_GET[$visibilityCall]) && $_GET[$visibilityCall] === 'hidden') {
        echo 'display: none;';
        echo "\n";
      }

      // checks for color
      if (isset($_GET[$colorCall])) {
        echo 'color: ' . $_GET[$colorCall] . ';';
        echo "\n";
      }

      // checks for font family
      echo 'font-family: ' . $_GET[$fontCall] . ';';
      echo "\n";

      // checks to see if variant parameter indicates italic
      if (strpos($_GET[$varCall], 'italic')) {
        echo 'font-style: italic;';
        echo "\n";
      }
      
      // checks for font weight
      echo 'font-weight: ' . $weight . ';';
      echo "\n";

      // checks for font size
      echo 'font-size: ' . $_GET[$sizeCall] . 'px;';
      echo "\n";

      // checks for line height
      echo 'line-height: ' . $_GET[$lhCall] . ';';
      echo "\n";
      echo '}';

      echo "\n";
    }

    // checks for body background color, adds a new declaration
    if (isset($_GET['bgColor'])) {
      echo 'body {';
      echo "\n";
      echo 'background-color: ' . $_GET['bgColor'];
      echo "\n";
      echo '}';
    }

    echo '</style>';

  } else {
    // if there isn't a hash, load the defaults
    echo '<style>';
    foreach ($elems as $elem) {
      //making sure variant is set
      if(isset($defaults[$elem]['fontVariant'])){
        //getting rid of 'italic' to just get the weight
        $weight = str_replace(' italic', '', $defaults[$elem]['fontVariant']);

        //transforming weights into numbers
        switch($weight) {
          case 'normal':
            $weight = '400';
            break;
          case 'semibold':
            $weight = '500';
            break;
          case 'bold':
            $weight = '600';
            break;  
        }
      }


      echo '.content ' . $elem . '{'; 
      echo "\n";  
      echo 'font-family: ' . $defaults[$elem]['fontFamily'] . ';';
      echo "\n";

      echo 'font-size: ' . $defaults[$elem]['fontSize'] . 'px;';
      echo "\n";

      if(isset($defaults[$elem]['fontVariant'])){
        echo 'font-weight: ' . $weight . ';';
        echo "\n";

        if (strpos($defaults[$elem]['fontVariant'], 'italic')) {
          echo 'font-style: italic;';
          echo "\n";
        } 
      }

      echo '}';
      echo "\n";  
    }  
    echo '</style>';
  }
}

// function that creates all the element controls with the appropriate names and IDs
function createAllControls($elem, $label, $defaultSize, $system){
  // uses same set of stringified variables
  $varCall = (string)$elem . 'Variant';
  $fontCall = (string)$elem . 'Font';
  $sizeCall = (string)$elem . 'Size';
  $lhCall = (string)$elem . 'LineHeight';
  $visibilityCall = (string)$elem . 'Visibility';
  $colorCall = (string)$elem . 'Color';

  echo '<label for="' . $elem . 'Font">'. $label .' Typeface</label>';
  echo '<select name="' . $elem . 'Font" id="' . $elem . 'Font">';
  createFontOptions($fontCall, $system); 
  echo '</select>';
  echo '<label for="' . $elem . 'Variant">'. $label .' Weight</label>';
  echo '<select name="' . $elem . 'Variant" id="' . $elem . 'Variant">';
  createVariantOptions($varCall, $system); 
  echo '</select>';
  echo '<label for="' . $elem . 'Size">' . $label . ' Type Size</label>';
  echo '<input type="number" name="' . $elem . 'Size" id="' . $elem . 'Size" min="8" step="1" value="';
  if (isset($_GET[$sizeCall])) {
    echo $_GET[$sizeCall];
  } else {
    echo $defaultSize;
  }
  echo '"/>';
  echo '<label for="' . $elem . 'LineHeight">' . $label . ' Line Height</label>';
  echo '<input type="number" name="' . $elem . 'LineHeight" id="' . $elem . 'LineHeight" min="0" step=".1" value="';
  if (isset($_GET[$lhCall])) {
    echo $_GET[$lhCall];
  } else {
    echo '1.4';
  }
  echo '"/>';
  echo '<label for="' . $elem . 'Color">' . $label . ' Color</label>';
  echo '<input type="color" id="' . $elem . 'Color" name="' . $elem . 'Color" ';
  if (isset($_GET[$colorCall])) {
    echo 'value="'.$_GET[$colorCall].'"';
  }
  echo '/>';
  echo '<label for="' . $elem . 'Visibility">';
  echo '<input type="checkbox" name="' . $elem . 'Visibility" id="' . $elem . 'Visibility" value="hidden" '; 
  if (isset($_GET[$visibilityCall])  && $_GET[$visibilityCall] === 'hidden'){ 
    echo "checked='checked'";
  } 
  echo '/>Hide</label>';
 }
?>