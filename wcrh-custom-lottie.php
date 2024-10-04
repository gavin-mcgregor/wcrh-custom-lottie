<?php

/**
 * Plugin Name:       WCRH Custom Lottie
 * Description:       Add a custom lottie animation to your website
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Gavin McGregor
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       wcrh-custom-lottie
 *
 * @package Wcrh
 */

if (! defined('ABSPATH')) {
	exit; // Exit if accessed directly.
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function wcrh_custom_lottie_block_init()
{
	register_block_type(__DIR__ . '/build');
}
add_action('init', 'wcrh_custom_lottie_block_init');

// Add JSON to allowed upload types
function custom_lottie_allow_json_uploads($mime_types)
{
	$mime_types['json'] = 'text/plain';
	return $mime_types;
}
add_filter('upload_mimes', 'custom_lottie_allow_json_uploads');

// Enqueue your JavaScript file for the block editor
function custom_lottie_enqueue_scripts()
{
	wp_enqueue_script(
		'wcrh-custom-lottie-vendor',
		plugins_url('assets/lottie.js', __FILE__),
		array('wp-blocks', 'wp-element', 'wp-editor'),
		null,
		false
	);
}
add_action('enqueue_block_editor_assets', 'custom_lottie_enqueue_scripts');
add_action('wp_enqueue_scripts', 'custom_lottie_enqueue_scripts');
