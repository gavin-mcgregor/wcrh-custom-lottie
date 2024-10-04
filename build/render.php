<?php

/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */

$custom_ID = $attributes['customID'] ?? "";
$lottie_JSON = $attributes['lottieFile'] ?? "";

?>
<div <?php echo get_block_wrapper_attributes(); ?> id="<?php echo $custom_ID ?>">

	<?php if ($custom_ID === "" | $lottie_JSON === ""): ?>
		<p style="text-align:center;">Animation has failed.</p>
	<?php endif; ?>

</div>
<script>
	const element = document.querySelector("#<?php echo $custom_ID ?>");
	lottie.loadAnimation({
		container: element,
		renderer: "svg",
		loop: true,
		autoplay: true,
		path: "<?php echo $lottie_JSON ?>",
	});
</script>