<?php include 'includes/errors.php'; ?>

<?php include 'includes/functions.php'; ?>

<?php include 'includes/header.php'; ?>

<body>

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

<input type="submit" value="Submit">
</form> <!-- end fc-controls -->

<?php print_r( $_GET); ?>

<?php include 'includes/footer.php'; ?>
</body>
</html>