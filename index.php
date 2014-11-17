<?php include 'includes/errors.php'; ?>

<?php include 'includes/functions.php'; ?>

<?php include 'includes/header.php'; ?>

<body>

<h1>Hi, welcome to the Font Combinator</h1>

<form action="">
<select name="h1Font" id="">
<?php options('h1', $system); ?>
</select>

<select name="h1Variant" id="">
<?php variants('h1v', $system); ?>
</select>

<input type="submit" value="Submit">
</form>
<?php include 'includes/footer.php'; ?>
 </body>
 </html>