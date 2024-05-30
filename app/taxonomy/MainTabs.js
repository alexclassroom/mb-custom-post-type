import { __ } from '@wordpress/i18n';
import Toggle from '../controls/Toggle.svg';
import { Tooltip } from '@wordpress/components';
import { useState } from "@wordpress/element";
import CheckboxList from '../controls/CheckboxList';
import Control from '../controls/Control';
import Sidebar from '../controls/Sidebar';
import Logo from '../controls/logo.svg';
import { SettingsContext } from '../SettingsContext';
import { AdvancedControls, BasicControls, CodeControls, LabelControls } from './constants/Data';
import Result from './Result';
const { useContext } = wp.element;
const { TabPanel } = wp.components;
const tabs = [
	{
		name: 'general',
		title: __( 'General', 'mb-custom-post-type' ),
	},
	{
		name: 'labels',
		title: __( 'Labels', 'mb-custom-post-type' ),
	},
	{
		name: 'advanced',
		title: __( 'Advanced', 'mb-custom-post-type' ),
	},
	{
		name: 'types',
		title: __( 'Post Types', 'mb-custom-post-type' ),
	},
	{
		name: 'code',
		title: __( 'Get PHP Code', 'mb-custom-post-type' ),
		className: 'mb-cpt-code button button-small'
	}
];

let autoFills = [ ...LabelControls, ...BasicControls ];
autoFills.push( { name: 'label', default: '%name%', updateFrom: 'labels.name' } );

const panels = {
	general: BasicControls.map( ( field, key ) => <Control key={ key } field={ field } autoFills={ autoFills.filter( f => f.updateFrom === field.name ) } /> ),
	labels: LabelControls.map( ( field, key ) => <Control key={ key } field={ field } /> ),
	advanced: AdvancedControls.map( ( field, key ) => <Control key={ key } field={ field } /> ),
	types: <CheckboxList name="types" options={ MBCPT.types } description={ __( 'Post types for the taxonomy:', 'mb-custom-post-type' ) } />,
	code: (
		<>
			{ CodeControls.map( ( field, key ) => <Control key={ key } field={ field } /> ) }
			<Result />
		</>
	)
};

const MainTabs = () => {
	const { settings } = useContext( SettingsContext );
	const [ toggle, setToggle ] = useState( false );

	return <>
		<div className="mb-cpt">
			<div className="mb-cpt-header">
				<div className="mb-cpt-logo">
					<Tooltip text={ __( 'Back to all taxonomies', 'mb-custom-post-type' ) } position={ 'bottom right' }>
						<a href={ MBCPT.url }><Logo /></a>
					</Tooltip>
					<h1>{ ( MBCPT.action == 'add' ) ? __( 'Add Taxonomies', 'mb-custom-post-type' ) : __( 'Edit Taxonomies', 'mb-custom-post-type' ) }</h1>
					{ !( MBCPT.action == 'add' ) && <a href={ MBCPT.add }>{ __( 'Add New', 'mb-custom-post-type' ) }</a> }
				</div>
				<div className="mb-cpt-action">
					<input type="submit" name="draft" className="components-button is-compact is-tertiary mb-cpt-draft" value={ ( MBCPT.status == 'publish' ) ? __( 'Switch to draft', 'mb-custom-post-type' ) : __( 'Save draft', 'mb-custom-post-type' ) } />
					<input type="submit" name="publish" className="mb-cpt-publish button button-primary button-large" value={ ( MBCPT.status == 'publish' ) ? __( 'Update', 'mb-custom-post-type' ) : __( 'Publish', 'mb-custom-post-type' ) } />
					<Tooltip text={ __( 'Toggle sidebar', 'mb-custom-post-type' ) }>
						<a><Toggle onClick={ () => setToggle( !toggle ) } className="toggle-sidebar" /></a>
					</Tooltip>
				</div>
			</div>
				<div className="mb-cpt-tabs">
					<div className="mb-cpt-content">
						<TabPanel className="mb-cpt-wrapper" tabs={ tabs }>
							{ tab => panels[ tab.name ] }
						</TabPanel>
						<div className="mb-cpt-message hidden"></div>
					</div>
					{ toggle && <Sidebar /> }
				</div>
				<input type="hidden" name="post_title" value={ settings.labels.singular_name } />
				<input type="hidden" name="content" value={ JSON.stringify( settings ) } />
				<input type="hidden" className="post_status" name="post_status" value="draft" />
		</div>
	</>;
};

export default MainTabs;