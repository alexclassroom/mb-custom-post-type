const DefaultSettings = {
	slug         : '',
	post_types   : ['post'],
	function_name: 'your_prefix_register_taxonomy',
	text_domain  : 'your-textdomain',

	labels       : {
		name                      : '',
		singular_name             : '',
		menu_name                 : '',
		all_items                 : '',
		edit_item                 : '',
		view_item                 : '',
		update_item               : '',
		add_new_item              : '',
		new_item                  : '',
		parent_item               : '',
		parent_item_colon         : '',
		search_items              : '',
		popular_items             : '',
		separate_items_with_commas: '',
		add_or_remove_items       : '',
		choose_from_most_used     : '',
		not_found                 : '',
	},
	description       : '',
	public            : true,
	publicly_queryable: true,
	hierarchical      : false,
	show_ui           : true,
	show_in_menu      : true,
	show_in_nav_menus : true,
	show_in_rest      : true,
	rest_base         : '',
	show_tagcloud     : true,
	show_in_quick_edit: true,
	show_admin_column : false,
	query_var         : '',
	sort              : false,
	rewrite           : {
		slug        : '',
		with_front  : false,
		hierarchical: false,
	}
};

export default DefaultSettings;