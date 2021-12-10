<?php
namespace MBCPT;

class Migration {
	public function __construct() {
		add_filter( 'rwmb_admin_menu', '__return_true' );
		add_action( 'admin_menu', [ $this, 'add_menu' ] );
	}

	public function add_menu() {
		$page_hook = add_submenu_page(
			'meta-box',
			esc_html__( 'CPT UI Migration', 'mb-custom-post-type' ),
			esc_html__( 'CPT UI Migration', 'mb-custom-post-type' ),
			'manage_options',
			'mb-custom-post-type',
			[ $this, 'render' ]
		);
		add_action( "admin_print_styles-$page_hook", [ $this, 'enqueue' ] );
	}

	public function enqueue() {
		wp_enqueue_script( 'mb-cpt', MB_CPT_URL.'assets/migrate.js', [], MB_CPT_VER, true );
		wp_localize_script( 'mb-cpt', 'MbCpt', [
			'start'               => __( 'Start', 'mb-custom-post-type' ),
			'migratingPostTypes'  => __( 'Migrating Post Types', 'mb-custom-post-type' ),
			'migratingTaxonomies' => __( 'Migrating Taxonomies', 'mb-custom-post-type' ),
			'done'                => __( 'Done', 'mb-custom-post-type' ),
		] );
	}


	public function render() {
		?>
		<div class="wrap">
			<h1><?php echo esc_html( get_admin_page_title() ) ?></h1>
			<p>
				<button class="button button-primary" id="process-migrate"><?php esc_html_e( 'Migrate', 'mb-custom-post-type' ) ?></button>
			</p>
			<h2><?php esc_html_e( 'Notes:', 'mb-custom-post-type' ) ?></h2>
			<ul>
				<li><?php esc_html_e( 'Always backup your database first as the plugin will remove/replace the existing CPT UI data. If you find any problem, restore the database and report us. We can\'t help you if you don\'t backup the database and there\'s something wrong.', 'mb-custom-post-type' ) ?></li>
				<li><?php esc_html_e( 'Not all data types and settings in CPT UI have an equivalent in Meta Box CPT. The plugin will try to migrate as much as it can.', 'mb-custom-post-type' ) ?></li>
			</ul>
			<div id="status-migrate"></div>
		</div>
		<?php
	}
}
