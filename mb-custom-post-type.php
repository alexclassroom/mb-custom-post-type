<?php
/**
 * Plugin Name: MB Custom Post Type
 * Plugin URI: https://www.metabox.io/plugins/mb-custom-post-type
 * Description: Create custom post types with easy-to-use UI
 * Version: 1.0.0
 * Author: Rilwis & Duc Doan
 * Author URI: https://metabox.io
 * License: GPL-2.0+
 * Text Domain: mb-custom-post-type
 * Domain Path: /lang/
 */

// Prevent loading this file directly
if ( ! defined( 'ABSPATH' ) )
{
	exit;
}

// ----------------------------------------------------------
// Define plugin URL for loading static files or doing AJAX
// ------------------------------------------------------------
define( 'MB_CPT_URL', plugin_dir_url( __FILE__ ) );
define( 'MB_CPT_CSS_URL', trailingslashit( MB_CPT_URL . 'css' ) );
define( 'MB_CPT_JS_URL', trailingslashit( MB_CPT_URL . 'js' ) );

// ------------------------------------------------------------
// Plugin paths, for including files
// ------------------------------------------------------------
define( 'MB_CPT_DIR', plugin_dir_path( __FILE__ ) );

if ( is_admin() )
{
	require_once MB_CPT_DIR . 'inc/class-mb-cpt-register.php';
	require_once MB_CPT_DIR . 'inc/class-mb-cpt-edit.php';
	require_once MB_CPT_DIR . 'inc/helper.php';
	new MB_CPT_Register;
	new MB_CPT_Edit;

	require_once MB_CPT_DIR . 'inc/required-plugin.php';
}

add_action( 'plugins_loaded', 'mb_cpt_load_textdomain' );

/**
 * Load plugin textdomain
 * @return void
 */
function mb_cpt_load_textdomain()
{
	load_plugin_textdomain( 'mb-custom-post-type', false, plugin_basename( dirname( __FILE__ ) ) . '/lang' );
}
