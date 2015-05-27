<?php 

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

global $elems;

$elems = array (
  'h1',
  'h2',
  'p'
  );

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

function createHeaderStyles($elems){
  if($_GET){

    $output = '<style>';

    foreach ($elems as $elem) {
      
      $varCall = (string)$elem . 'Variant';
      $fontCall = (string)$elem . 'Font';
      $sizeCall = (string)$elem . 'Size';
      $lhCall = (string)$elem . 'LineHeight';
      $visibilityCall = (string)$elem . 'Visibility';
      $colorCall = (string)$elem . 'Color';

      $weight = str_replace(' italic', '', $_GET[$varCall]);

      //$weight = str_replace(' italic', '', $_GET['h1Variant']);

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

      $output .= '.content ' . $elem . '{'; 
      $output .= "\n";

      if (isset($_GET[$visibilityCall]) && $_GET[$visibilityCall] === '1') {
        $output .= 'display: none;';
        $output .= "\n";
      }

      if (isset($_GET[$colorCall])) {
        $output .= 'color: ' . $_GET[$colorCall] . ';';
        $output .= "\n";
      }

      $output .= 'font-family: ' . $_GET[$fontCall] . ';';
      $output .= "\n";

      if (strpos($_GET[$varCall], 'italic')) {
        $output .= 'font-style: italic;';
        $output .= "\n";
      }
      
      $output .= 'font-weight: ' . $weight . ';';
      $output .= "\n";
      $output .= 'font-size: ' . $_GET[$sizeCall] . 'px;';
      $output .= "\n";
      $output .= 'line-height: ' . $_GET[$lhCall] . ';';
      $output .= "\n";
      $output .= '}';

      $output .= "\n";
    }

    if (isset($_GET['bgColor'])) {
      $output .= 'body {';
      $output .= "\n";
      $output .= 'background-color: ' . $_GET['bgColor'];
      $output .= "\n";
      $output .= '}';
    }

    $output .= '</style>';

    return $output;
  }
}

// function that creates all the element controls with the appropriate names and IDs
function createAllControls($elem, $label, $defaultSize, $system){

  $colorCall = (string)$elem . 'Color';
  $visibilityCall = (string)$elem . 'Visibility';

  echo '<label for="' . $elem . 'Font">'. $label .' Typeface</label>';
  echo '<select name="' . $elem . 'Font" id="' . $elem . 'Font">';
  createFontOptions('h1Font', $system); 
  echo '</select>';
  echo '<label for="' . $elem . 'Variant">'. $label .' Weight</label>';
  echo '<select name="' . $elem . 'Variant" id="' . $elem . 'Variant">';
  createVariantOptions('h1Variant', $system); 
  echo '</select>';
  echo '<label for="' . $elem . 'Size">' . $label . ' Type Size</label>';
  echo '<input type="number" name="' . $elem . 'Size" id="' . $elem . 'Size" min="8" step="1" value="' . $defaultSize . '"/>';
  echo '<label for="' . $elem . 'LineHeight">' . $label . ' Line Height</label>';
  echo '<input type="number" name="' . $elem . 'LineHeight" id="' . $elem . 'LineHeight" min="0" step=".1" value="1.4"/>';
  echo '<label for="' . $elem . 'Color">' . $label . ' Color</label>';
  echo '<input type="color" id="' . $elem . 'Color" name="' . $elem . 'Color" ';
  if (isset($_GET[$colorCall])) {
    echo 'value="'.$_GET[$colorCall].'"';
  }
  echo '/>';
  echo '<label for="' . $elem . 'Visibility">';
  echo '<input type="checkbox" name="' . $elem . 'Visibility" id="' . $elem . 'Visibility" value="1" '; 
  if (isset($_GET[$visibilityCall])  && $_GET[$visibilityCall] === '1'){ 
    echo "checked='checked'";
  } 
  echo '/>Hide</label>';
 }
?>