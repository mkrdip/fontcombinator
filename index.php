<?php include 'includes/errors.php'; ?>

<?php include 'includes/functions.php'; ?>

<?php include 'includes/header.php'; ?>

<body>
<p class="no-js-warning">
  JavaScript seems to be disabled. While the Font Combinator <em>will work</em> without JavaScript, you will be missing out on the use of Google Fonts. I would highly suggest that you enable JavaScript to use the Font Combinator.
</p>
<div class="content">
<h1>Hi, welcome to the Font Combinator</h1>
<h2>This is the h2</h2>
<p>This is the body text</p>
</div>


<form action="index.php" class="fc-controls">

<?php createAllControls('h1', 'h1', $system, $defaults); ?>

<br />

<?php createAllControls('h2', 'h2', $system, $defaults); ?>

<br/>

<?php createAllControls('p', 'Paragraph', $system, $defaults); ?>

<br />

<label for="bgColor">Background Color</label>
<input type="color" id="bgColor" name="bgColor" 
<?php 
  if (isset($_GET["bgColor"])) {
    echo 'value="'.$_GET["bgColor"].'"';
  } else {
    echo 'value="#ffffff"';
  }
 ?>
/>

<input type="submit" value="Submit" class="fc-submit">
<br />
<a href="index.php" class="fc-reset">Reset</a>
</form> <!-- end fc-controls -->

<?php print_r( $_GET); ?>

<?php include 'includes/footer.php'; ?>
</body>
</html>