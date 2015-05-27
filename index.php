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

<?php createAllControls('h1', 'h1', 32, $system); ?>

<br />

<?php createAllControls('h2', 'h2', 24, $system); ?>

<br/>

<?php createAllControls('p', 'Paragraph', 16, $system); ?>

<br />

<label for="bgColor">Background Color</label>
<input type="color" id="bgColor" name="bgColor" 
<?php 
      if (isset($_GET["bgColor"])) {
        echo 'value="'.$_GET["bgColor"].'"';
      }
 ?>
/>

<input type="submit" value="Submit">
</form> <!-- end fc-controls -->

<?php print_r( $_GET); ?>

<?php include 'includes/footer.php'; ?>
</body>
</html>