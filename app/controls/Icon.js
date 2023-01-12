import { useState } from "@wordpress/element";
import Tooltip from './Tooltip';

const Icon = ( { label, name, update, value, required = false, tooltip = '' } ) => {
	const [ query, setQuery ] = useState( "" );
	let data = MBCPT.icons.map( icon => {
		let label = icon.replace( /-/g, ' ' ).trim();

		const startsText = [ 'admin', 'controls', 'editor', 'format', 'image', 'welcome' ];
		startsText.forEach( text => {
			if ( icon.startsWith( text ) ) {
				label = label.replace( text, '' );
			}
		} );

		const endsText = [ 'alt', 'alt2', 'alt3' ];
		endsText.forEach( text => {
			if ( icon.endsWith( text ) ) {
				label = label.replace( text, `(${ text })` );
			}
		} );

		return [ icon, label.trim().toLowerCase() ];
	} );

	data = data.filter( item => query === '' || item[ 1 ].includes( query.toLowerCase() ) );

	return (
		<div className="mb-cpt-field mb-cpt-field--radio">
			<label className="mb-cpt-label" htmlFor={ name }>
				{ label }
				{ required && <span className="mb-cpt-required">*</span> }
				{ tooltip && <Tooltip id={ name } content={ tooltip } /> }
			</label>
			<div className='mb-cpt-input'>
				<div className='mb-cpt-icon-selected'>
					<span className={ `dashicons ${ value }` }></span>
					<input type="text" className="mb-cpt-search" placeholder="Search..." value={ query } onChange={ event => setQuery( event.target.value ) } />
				</div>
				<div className="mb-cpt-items">
					{
						data.map( ( [ icon, label ] ) => (
							<div key={ icon } className='mb-cpt-item'>
								<label className="mb-cpt-icon">
									<input type="radio" name={ name } value={ `dashicons-${ icon }` } checked={ `dashicons-${ icon }` === value } onChange={ update } />
									<span className={ `dashicons dashicons-${ icon }` }></span>
								</label>
								<span className='mb-cpt-item__text'>{ label }</span>
							</div>
						) )
					}
				</div>
			</div>
		</div>
	);
};

export default Icon;