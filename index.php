<?php include 'includes/errors.php'; ?>

<?php include 'includes/functions.php'; ?>

<?php include 'includes/header.php'; ?>

<body>

<h1>Hi, welcome to the Font Combinator</h1>

<form action="">
<select name="h1Font" id="">
  <?php createFontOptions('h1Font', $system); ?>
</select>

<select name="h1Variant" id="">
  <?php createVariantOptions('h1Variant', $system); ?>
</select>

<input type="submit" value="Submit">
</form>

<?php print_r( $_GET); ?>

<?php include 'includes/footer.php'; ?>
</body>
</html>