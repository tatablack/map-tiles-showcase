/** @author Angelo Tata */
if (typeof mp == "undefined" || !mp) {
	/**
	 * The mp global namespace object.
	 * @namespace
	 */
	var mp = {};
}

/**
 * Returns the namespace specified and creates it if it doesn't exist
 * <pre>
 * mp.namespace("property.package");
 * mp.namespace("mp.property.package");
 * </pre>
 * Either of the above would create mp.property, then
 * mp.property.package
 *
 * <p>Inspired by the equivalent YUI namespace function.</p>
 *
 * @method namespace
 * @static
 * @param  {String} arguments 1-n namespaces to create
 * @return {Object}  A reference to the last namespace object created
 */
mp.namespace = function() {
	var a=arguments, o=null, i, j, segments;
	for (i=0; i < a.length; i=i+1) {
		segments = a[i].split(".");
		o = mp;

		// mp is implied, so it is ignored if it is included
		for (j=(segments[0] == "mp") ? 1 : 0; j < segments.length; j=j+1) {
			o[segments[j]] = o[segments[j]] || {};
			o = o[segments[j]];
		}
	}

	return o;
};