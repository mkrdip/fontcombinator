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
function createFontOptions($elem, $system, $defaults = '$defaults', $default = ''){
  foreach ($system['fonts'] as $font) {
    echo '<option class="system-font" value="' . $font . '" ';
    if(
      (isset($_GET[$elem]) && $_GET[$elem] == $font) ||
      (isset($default) && $default === 'default' && $defaults[$elem]['fontFamily'] === $font)
       ){
      echo 'selected';
    }
    echo ' >';
    echo $font;
    echo '</option>';
  }
}

// This creates the <option> elements for the variants - needs to be placed within a <select>
function createVariantOptions($elem, $system, $defaults = '$defaults', $default = ''){
  foreach ($system['variants'] as $variant) {
    echo '<option class="system-variant" value="' . $variant . '" ';
    if(
      (isset($_GET[$elem]) && $_GET[$elem] == $variant) ||
      (isset($default) && $default === 'default' && $defaults[$elem]['fontVariant'] === $variant)
      ){
      echo 'selected';
    }
    echo ' >';
    echo $variant;
    echo '</option>';
  }
}


// This is what generates the <style> element in the header (see header.php for the call)
function createHeaderStyles($elems, $defaults){
    echo '<style>';

    // creating a style declaration for each element in the global $elems
    foreach ($elems as $elem) {
      
      // need to make strings of the $elem plus facet
      $varCall        = (string)$elem . 'Variant';
      $fontCall       = (string)$elem . 'Font';
      $sizeCall       = (string)$elem . 'Size';
      $lhCall         = (string)$elem . 'LineHeight';
      $visibilityCall = (string)$elem . 'Visibility';
      $colorCall      = (string)$elem . 'Color';

      // removing the word 'italic' so we *just* have the weight
      if($_GET){
        $weight = str_replace(' italic', '', $_GET[$varCall]);
      } else if (isset($defaults[$elem]['fontVariant'])) {
        $weight = str_replace(' italic', '', $defaults[$elem]['fontVariant']);
      }  

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
        default:
          $weight = '400';
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
      } else if (isset($defaults[$elem]['color'])){
        echo 'color: ' . $defaults[$elem]['color'] . ';';
      }
      echo "\n";

      // checks for font family
      if (isset($_GET[$fontCall])) {
        echo 'font-family: ' . $_GET[$fontCall] . ';';
      } else if (isset($defaults[$elem]['fontFamily'])){
        echo 'font-family: ' . $defaults[$elem]['fontFamily'] . ';';
      }
      echo "\n";

      // checks to see if variant parameter indicates italic
      if (
        (isset($_GET[$varCall]) && strpos($_GET[$varCall], 'italic')) ||
        (!isset($_GET[$varCall]) && isset($defaults[$elem]['fontVariant']) && strpos($defaults[$elem]['fontVariant'], 'italic'))
        ) {
        echo 'font-style: italic;';
        echo "\n";
      }
      
      // checks for font weight
      echo 'font-weight: ' . $weight . ';';
      echo "\n";

      // checks for font size
      if (isset($_GET[$sizeCall])) {
        echo 'font-size: ' . $_GET[$sizeCall] . 'px;';
      } else if (isset($defaults[$elem]['fontSize'])){
        echo 'font-size: ' . $defaults[$elem]['fontSize'] . 'px;';
      }
      echo "\n";

      // checks for line height
      if (isset($_GET[$lhCall])) {
        echo 'line-height: ' . $_GET[$lhCall] . ';';
      } else if (isset($defaults[$elem]['lineHeight'])){
        echo 'line-height: ' . $defaults[$elem]['lineHeight'] . ';';
      }
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

}

// function that creates all the element controls with the appropriate names and IDs
function createAllControls($elem, $label, $system, $defaults){
  // uses same set of stringified variables
  $varCall = (string)$elem . 'Variant';
  $fontCall = (string)$elem . 'Font';
  $sizeCall = (string)$elem . 'Size';
  $lhCall = (string)$elem . 'LineHeight';
  $visibilityCall = (string)$elem . 'Visibility';
  $colorCall = (string)$elem . 'Color';

  echo '<label for="' . $elem . 'Font">'. $label .' Typeface</label>';
  echo '<select name="' . $elem . 'Font" id="' . $elem . 'Font" data-target="'. $elem .'" data-property="fontFamily">';
  if($_GET){
    createFontOptions($fontCall, $system); 
  } else {
    createFontOptions($elem, $system, $defaults, 'default');
  }
  echo '</select>';

  echo '<label for="' . $elem . 'Variant">'. $label .' Weight</label>';
  echo '<select name="' . $elem . 'Variant" id="' . $elem . 'Variant" data-target="'. $elem .'" data-property="variant">';
  if($_GET){
    createVariantOptions($varCall, $system); 
  } else {
    createVariantOptions($elem, $system, $defaults, 'default'); 
  }
  echo '</select>';

  echo '<label for="' . $elem . 'Size">' . $label . ' Type Size</label>';
  echo '<input type="number" name="' . $elem . 'Size" id="' . $elem . 'Size" data-target="'. $elem .'" data-property="fontSize" min="8" step="1" value="';
  if($_GET){
    echo $_GET[$sizeCall];
  } else {
    echo $defaults[$elem]['fontSize'];
  }
  echo '"/>';

  echo '<label for="' . $elem . 'LineHeight">' . $label . ' Line Height</label>';
  echo '<input type="number" name="' . $elem . 'LineHeight" id="' . $elem . 'LineHeight"  data-target="'. $elem .'" data-property="lineHeight" min="0" step=".1" value="';
  if ($_GET && isset($_GET[$lhCall])) {
    echo $_GET[$lhCall];
  } else {
    echo $defaults[$elem]['lineHeight'];
  }
  echo '"/>';

  echo '<label for="' . $elem . 'Color">' . $label . ' Color</label>';
  echo '<input type="color" id="' . $elem . 'Color" data-target="'. $elem .'" data-property="color" name="' . $elem . 'Color" value="';
  if ($_GET && isset($_GET[$colorCall])) {
    echo $_GET[$colorCall];
  } else {
    echo $defaults[$elem]['color']; 
  }
  echo '"/>';

  echo '<label for="' . $elem . 'Visibility">';
  echo '<input type="checkbox" name="' . $elem . 'Visibility" id="' . $elem . 'Visibility"  data-target="'. $elem .'" value="hidden" '; 
  if (isset($_GET[$visibilityCall])  && $_GET[$visibilityCall] === 'hidden'){ 
    echo "checked='checked'";
  } 
  echo ' />Hide</label>';

 }
?>