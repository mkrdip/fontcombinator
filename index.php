<?php
// error_reporting(E_ALL);
// ini_set('display_errors', 'on');
?>

	<?php
	//PHP functions used throughout
	function isSetDef($setVal, $default){
		if(isset($_GET[$setVal])) {
			echo $_GET[$setVal];
		} else {
			echo $default;
		}
	}




	//loads default system fonts
	function defaultFonts($elem){
		echo '<option disabled>*** System Fonts ***</option>';
		global $systemFontArr;
		$systemFontArr = array(
			'Arial',
			'Garamond',
			'Georgia',
			'Helvetica',
			'Palatino',
			'Tahoma',
			'Times New Roman',
			'Trebuchet MS',
			'Verdana'
			);

		foreach($systemFontArr as $value) {
			echo '<option class="system_font" value="' . $value . '"';
			if(isset($_GET[$elem]) && $_GET[$elem] == $value){
							echo 'selected';
						}
			echo	'>' . $value . '</option>';
			echo $value;
		}

	}

	function defaultVariant($elem){
		$variantArr = array(
			'400',
			'400 italic',
			'bold',
			'bold italic'
		);
		foreach($variantArr as $value) {
			echo '<option class="system_variant" value="' . $value . '"';
			if(isset($_GET[$elem]) && $_GET[$elem] == $value){
							echo 'selected';
						}
			echo	'>' . $value . '</option>';
			echo $value;
		}

	}


	?>


<!DOCTYPE html>
<html lang="en-us" class="no-js">
<head>

	<meta charset="utf-8">
	<meta name="HandheldFriendly" content="True">
 	<meta name="MobileOptimized" content="320">
 	<meta name="viewport" content="width=device-width,  initial-scale=1, maximum-scale=1">
 	<meta name="apple-mobile-web-app-capable" content="yes">


	<title>The Web Font Combinator | A Web Typography Tool</title>



	<link rel="stylesheet" href="css/fc_style.css" type="text/css" media="screen" title="no title" />
	<link rel="stylesheet" href="javascript/chosen/chosen.css" type="text/css" media="screen" title="no title" />

	<link rel="stylesheet" href="css/colorpicker.css" type="text/css" media="screen" title="no title" />

	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js" type="text/javascript"></script>
	<script>
	if (typeof jQuery == 'undefined') {
	document.write('<script src="', 'javascript/jquery-1.8.2.min.js', '" type="text/JavaScript"><\/script>');
	}
	</script>

	<style type="text/css" media="screen">

	#wrapper {
		<?php
		if(isset($_GET['bgcolor'])){
		   	 echo 'background-color: #' . $_GET['bgcolor'] . ';';
		    }
		?>
	}

	h1 {
		<?php
		if(isset($_GET['h1'])){
		   	 echo 'font-family: ' . $_GET['h1'] . ';';
		    }
		if(isset($_GET['h1size'])){
			   	 echo 'font-size: ' . $_GET['h1size'] . 'px;';
			    }

		if(isset($_GET['h1v'])){
			   $variant = explode(' ', $_GET['h1v']);
				 echo 'font-weight: ' . $variant[0] . '; ';
			 if($variant[1] == 'italic'){
				 echo 'font-style: italic; ';
			 }
		    }
		if(isset($_GET['h1lh'])){
			   	 echo 'line-height: ' . $_GET['h1lh'] . ';';
			    }

		if(isset($_GET['h1color'])){
			   	 echo 'color: #' . $_GET['h1color'] . ';';
			    }
		?>
	}

	h2 {
		<?php
		if(isset($_GET['h2'])){
		   	 echo 'font-family: ' . $_GET['h2'] . ';';
		    }
		if(isset($_GET['h2size'])){
	   	 echo 'font-size: ' . $_GET['h2size'] . 'px;';
	    }
		if(isset($_GET['h2v'])){
			   $variant = explode(' ', $_GET['h2v']);
				 echo 'font-weight: ' . $variant[0] . '; ';
					 if($variant[1] == 'italic'){
						 echo 'font-style: italic; ';
					 }
			    }

		if(isset($_GET['h2lh'])){
			   	 echo 'line-height: ' . $_GET['h2lh'] . ';';
			    }

		if(isset($_GET['h2color'])){
				echo 'color: #' . $_GET['h2color'] . ';';
			}
		?>
	}

	p {

		<?php
		if(isset($_GET['p'])){
		   	 echo 'font-family: ' . $_GET['p'] . ';';
		    }

		if(isset($_GET['psize'])){
	   	 echo 'font-size: ' . $_GET['psize'] . 'px;';
	    }
		if(isset($_GET['pv'])){
			   $variant = explode(' ', $_GET['pv']);
				 echo 'font-weight: ' . $variant[0] . '; ';
					 if($variant[1] == 'italic'){
						 echo 'font-style: italic; ';
					 }
			    }

		if(isset($_GET['plh'])){
			   	 echo 'line-height: ' . $_GET['plh'] . ';';
			    }

		if(isset($_GET['pcolor'])){
				echo 'color: #' . $_GET['pcolor'] . ';';
			}


		?>
	}
	</style>

	<?php

	$systemFontArr = array(
		'Arial',
		'Garamond',
		'Georgia',
		'Helvetica',
		'Palatino',
		'Tahoma',
		'Times New Roman',
		'Trebuchet MS',
		'Verdana'
		);


	if(isset($_GET['h1']) && !in_array($_GET['h1'], $systemFontArr)){
		echo '<link rel="stylesheet" href="http://fonts.googleapis.com/css?family=' . str_replace(' ','+', $_GET['h1']) . '" type="text/css" />';
	} else {
		echo '<link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Merriweather" type="text/css" />';
	}

	if(isset($_GET['h2']) && !in_array($_GET['h2'], $systemFontArr)){
			echo '<link rel="stylesheet" href="http://fonts.googleapis.com/css?family=' . str_replace(' ','+', $_GET['h2']) . '" type="text/css" />';
	} else {
		echo '<link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Source+Sans+Pro:200" type="text/css" />';
	}
	if(isset($_GET['p']) && !in_array($_GET['p'], $systemFontArr)){
			echo '<link rel="stylesheet" href="http://fonts.googleapis.com/css?family=' . str_replace(' ','+', $_GET['p']) . '" type="text/css" />';
	} else {
		echo '<link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600" type="text/css" />';
	}

		 ?>
</head>
<body>
	<div id="wrapper">

	<section id="font-combinator" class="panel here">
		<div id="content_main">
			<h1 id="h1_text" contenteditable="true">The Web Font Combinator</h1>
			<h2 id="h2_text" contenteditable="true">A Web Typography Tool</h2>
			<div id="p_text" contenteditable="true">
				<p>This tool has been built to allow previewing of font combinations in a <em>fast, browser-based</em> manner. There have been numerous printed books through the years that allowed a designer to put a headline font next to a body font, and this is an attempt to recreate that for the web.</p>
				<p><strong>Directions:</strong> You can edit any of the type on this page in order to preview any particular text. In the controls at the bottom, select the element you want to modify, and then <em>play!</em> You can change the font, size, line height and color of an element, as well as hide an element altogether.</p>
			</div>
	</div>
	</section> <!-- end font-combinator -->
	<section id="about" class="panel">
		<h1>About</h1>

		<p>The Web Font Combinator was built for the classic reason of &ldquo;scratching my own itch&rdquo;. I am a web designer/front end developer, and wanted to have a way to quickly see how fonts looked in combination.</p>

		<h2>Credits</h2>
		<p>There are a number of technologies that make this tool possible, and I&rsquo;d like to give them credit:</p>

		<p><a href="http://www.google.com/webfonts" title="Google Web Fonts" rel="external">Google Web Fonts</a> - This tool works with the Google Fonts collection, as well as a few selected System fonts. In particular, I&rsquo;ve made use of the <a href="https://developers.google.com/webfonts/docs/developer_api" rel="external">Google Web Fonts Developer API</a> to make updates automated.</p>
		<p><a href="http://jquery.com/" title="jQuery: The Write Less, Do More, JavaScript Library" rel="external">jQuery</a> - this site heart and soul is written in jQuery. It would not have seen the light of day if it were not for this JavaScript library.</p>
		<p><a href="http://harvesthq.github.com/chosen/" title="Chosen - a JavaScript plugin for jQuery and Prototype - makes select boxes better" rel="external">The Chosen jQuery plugin</a> - this nifty plugin takes very long select elements and transforms them into much more useful lists. This is what I use on the font name and variant list drop downs.</p>
		<p>This is the <a href="http://www.eyecon.ro/colorpicker/" title="ColorPicker - jQuery plugin" rel="external">jQuery Color Picker</a> that I use in the controls.</p>
	</section>
	<section id="change-log" class="panel">
		<h1>Change Log</h1>
		<h2>Version 1.1.1 - February 6th, 2013</h2>
		<p>Fixed a bug that was happening in Chrome. Slight modification to how the JS works.</p>
		<h2>Version 1.1 - September 24th, 2012</h2>
		<p><strong>Sharing!</strong> Now you can share your combination with others!</p>

		<h2>Version 1.0.1 - April 12th, 2012</h2>
		<p>Added some requested functionality - if you click on an editable element, the relevent type control becomes active.</p>
		<p>Also added a subtle outline on hover of editable text in the hope that it makes it more obvious that text is editable.</p>
		<h2>Version 1.0 - April 4th, 2012</h2>
		<p>Version 1.0 is a total rewrite of the font combinator - from the ground up! I&rsquo;ve been working on this for a few months - I wanted to bring some cool new features. Such as:</p>
		<p><strong>Performance Enhancements</strong> - taking advantage of some of the intricacies of the Google Font API, page load should be a lot faster.</p>
		<p><strong>Responsive Design</strong> - it&rsquo;s been designed to work on modern mobile devices through modern desktop browsers</p>
		<p><strong>Font Variants!</strong> - this has been a popular request, and something I&rsquo;ve wanted for a long time. Now, if a font has variants, those are options.</p>
		<p><strong>Color!</strong> - You can change type color AND the background color of the page!</p>
	</section>
		</div> <!-- end of wrapper -->
	<div id="nav_controls">



		<form action="index.php" method="get" accept-charset="utf-8" id="controls">


			<section id="h1_sec" class="control active">
				<div class="font-family">
					<label for="h1_select">Font:</label>
					<select name="h1" id="h1_select">
						<?php defaultFonts('h1');	?>
					</select>
					<select class="variant_select" id="h1_variant" name="h1v">
						<option>400</option>
						<?php //defaultVariant('h1v'); ?>
					<select>

				</div>


				<div class="size">
					<label for="h1size">Size:</label>
					<input type="range" name="h1size" value="<?php isSetDef('h1size', '30'); ?>"  id="h1size" min="0" max="200" />
					<span class="value"><?php isSetDef('h1size', '30'); ?></span>px
				</div>

				<div class="lh">
					<label for="h1lh">Line Height:</label>
					<input type="range" name="h1lh" value="<?php isSetDef('h1lh', '1.41'); ?>" id="h1lh" step="0.01" min="0" max="5" />
					<span class="value"><?php isSetDef('h1lh', '1.41'); ?></span>
				</div>

				<div class="color">
					<label for="h1color">Color:</label>
					<input type="text" name="h1color" value="<?php if(isset($_GET['h1color'])) {echo $_GET['h1color']; } ?>" placeholder="000000" id="h1color" />
				</div>

				<input type="button" name="h1_hide" value="Hide" id="h1_hide" class="hide_btn" />
			</section>
			<section id="h2_sec" class="control">
				<div class="font-family">
					<label for="h2_select">Font:</label>

				<select name="h2" id="h2_select">
					<?php defaultFonts('h2');	?>
				</select>
				<select class="variant_select" id="h2_variant" name="h2v">
					<?php defaultVariant('h2v'); ?>
				<select>

				</div>
				<div class="size">
					<label for="h2size">Size:</label>
					<input type="range" name="h2size" value="<?php isSetDef('h2size', '20'); ?>"  id="h2size" min="0" max="200" />
					<span class="value"><?php isSetDef('h2size', '20'); ?></span>px
				</div>
				<div class="lh">
					<label for="h2lh">Line Height:</label>

					<input type="range" name="h2lh" value="<?php isSetDef('h2lh', '1.41'); ?>" id="h2lh" step="0.01" min="0" max="5" />
					<span class="value"><?php isSetDef('h2lh', '1.41'); ?></span>
				</div>
				<div class="color">
					<label for="h2color">Color:</label>
					<input type="text" name="h2color" value="<?php if(isset($_GET['h2color'])) {echo $_GET['h2color']; } ?>" placeholder="000000" id="h2color" />
				</div>
				<input type="button" name="h2_hide" value="Hide" id="h2_hide" class="hide_btn" />
			</section>
			<section id="p_sec" class="control">
				<div class="font-family">
					<label for="p_select">Font:</label>

				<select name="p" id="p_select">
					<?php defaultFonts('p');?>
				</select>
				<select class="variant_select" id="p_variant" name="pv">
					<?php defaultVariant('pv'); ?>
				<select>
				</div>
				<div class="size">
					<label for="psize">Size:</label>
					<input type="range" name="psize" value="<?php isSetDef('psize', '16'); ?>" min="5" max="45" id="psize" />
					<span class="value"><?php isSetDef('psize', '16'); ?></span>px
				</div>
				<div class="lh">
					<label for="plh">Line Height:</label>
					<input type="range" name="plh" value="<?php isSetDef('plh', '1.41'); ?>" id="plh" step="0.01" min="0" max="5" />
					<span class="value"><?php isSetDef('plh', '1.41'); ?></span>
				</div>
				<div class="color">
					<label for="pcolor">Color:</label>
					<input type="text" name="pcolor" value="<?php if(isset($_GET['pcolor'])) {echo $_GET['pcolor']; } ?>" placeholder="000000" id="pcolor" />
				</div>
				<input type="button" name="p_hide" value="Hide" id="p_hide" class="hide_btn" />
			</section>
			<section id="bg_sec" class="control">
				<label for="bgcolor">Background Color:</label>
				<input type="text" name="bgcolor" value="<?php if(isset($_GET['bgcolor'])) {echo $_GET['bgcolor']; } ?>" placeholder="FFFFFF" id="bgcolor" />
			</section>

			<input type="submit"  id="submit" value="Submit"/>


		</form>

		</div> <!-- nav_controls -->

	<div class="footer_wrapper">

	<footer class="clearfix">
		<p>
		&copy; <?php echo date("Y") ?> <a href="http://chipcullen.com/" rel="external">Chip Cullen</a> |
		<a href="https://twitter.com/#!/chipcullen" rel="external">Follow me on Twitter!</a> |
		<a href="https://github.com/chippper/fontcombinator" rel="external">GitHub</a>
	</p>
		<nav>
			<ul id="panel_nav">
					<li><a href="#font-combinator" class="here">Font Combinator</a></li>
					<li><a href="#about">About</a></li>
					<li><a href="#change-log">Change log</a></li>
				</ul>

		</nav>

	</footer>

	</div> <!-- footer wrapper -->
	<script src="javascript/chosen/chosen.jquery.min.js" type="text/javascript" charset="utf-8"></script>
	<script src="javascript/colorpicker.js" type="text/javascript" charset="utf-8"></script>

	<script src="javascript/fc_functions.js" type="text/javascript" charset="utf-8"></script>
	<!-- Want to see the unminified javascript? check javascript/fc_functions.js -->

	<script type="text/javascript">

	  var _gaq = _gaq || [];
	  	  _gaq.push(['_setAccount', 'UA-22598536-1']);
	  	  _gaq.push(['_trackPageview']);

	  	  (function() {
	  	    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
	  	    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
	  	    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
	  	  })();

	</script>
</body>
</html>
