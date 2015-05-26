<?php include 'includes/errors.php'; ?>

<?php include 'includes/functions.php'; ?>

<?php include 'includes/header.php'; ?>

<body>

<div class="content">
<h1>Hi, welcome to the Font Combinator</h1>
</div>


<form action="index.php" class="fc-controls">
<select name="h1Font" id="">
  <?php createFontOptions('h1Font', $system); ?>
</select>

<select name="h1Variant" id="">
  <?php createVariantOptions('h1Variant', $system); ?>
</select>

<label for="h1Size">h1 Type Size</label>
<input type="number" name="h1Size" id="h1Size" min="8" step="1" value="32"/>

<label for="h1LineHeight">h1 Line Height</label>
<input type="number" name="h1LineHeight" id="h1LineHeight" min="0" step=".1" value="1.4"/>


<br />

<select name="h2Font" id="">
  <?php createFontOptions('h2Font', $system); ?>
</select>

<select name="h2Variant" id="">
  <?php createVariantOptions('h2Variant', $system); ?>
</select>

<label for="h2Size">h2 Type Size</label>
<input type="number" name="h2Size" id="h2Size" min="8" step="1" value="24"/>

<label for="h2LineHeight">h2 Line Height</label>
<input type="number" name="h2LineHeight" id="h2LineHeight" min="0" step=".1" value="1.4"/>

<br/>

<select name="pFont" id="">
  <?php createFontOptions('pFont', $system); ?>
</select>

<select name="pVariant" id="">
  <?php createVariantOptions('pVariant', $system); ?>
</select>

<label for="pSize">Paragraph Type Size</label>
<input type="number" name="pSize" id="pSize" min="8" step="1" value="16"/>

<label for="pLineHeight">Paragraph Line Height</label>
<input type="number" name="pLineHeight" id="pLineHeight" min="0" step=".1" value="1.4"/>

<br />

<label for="bgColor">Background Color</label>
<input type="color" id="bgColor" />

<input type="submit" value="Submit">
</form> <!-- end fc-controls -->

<?php print_r( $_GET); ?>

<?php include 'includes/footer.php'; ?>
</body>
</html>