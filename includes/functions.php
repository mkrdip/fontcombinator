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

    $output .= '</style>';

    return $output;
  }
}
 
?>