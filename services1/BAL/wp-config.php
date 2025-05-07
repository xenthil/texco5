<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the website, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/documentation/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'bitnami_wordpress' );

/** Database username */
define( 'DB_USER', 'bn_wordpress' );

/** Database password */
define( 'DB_PASSWORD', 'e34df292457ed434df30d0dcbd2b3f2099911a32d41eaf46aa9cc5c3a909f469' );

/** Database hostname */
define( 'DB_HOST', '127.0.0.1:3306' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'J^Y#qmx<Z-A[_Djkl*}t0%#V6lW`USKuH)qIH<|WJOaw]v=(%esR nm[BR1Qj$Y3' );
define( 'SECURE_AUTH_KEY',  'n,saV@F;]hz1:xcq[`(Hn=y`aH..3ZJhCloJe~*LKIe1j-~%S>5<u[ZO8ovzVDJ;' );
define( 'LOGGED_IN_KEY',    ')o/:!s~6!S&26:{QW{3f]H?%ZacmopwTMe t<k$V-$ wQ0uRVvKK9;b^Ql+>pP<v' );
define( 'NONCE_KEY',        '6V}Nh;jH@X;:;55$E`sAO?_MX#JQ5Z6lM(ll1}_->6HOWJ/Q hkC7QnrlATU8B#$' );
define( 'AUTH_SALT',        'hU]h Lwo>mdj#e0:Q?9E%?6^<S=1C<_2##Rt|V`X!Gxq~q7xi]203RQ[}$zC:Tw]' );
define( 'SECURE_AUTH_SALT', '>w-:$hi%gN<>mQwp1P+xuvS$mWp4rc^|GlCbtCO!.6?MemZLg|NbZBKQ.;>3KLC}' );
define( 'LOGGED_IN_SALT',   'DqJ|>_qCAk7o.aqHZ@<g.AY?$41!RuaD@R#Jz!1~|FGpt@n+dQ{GL=I4.5@5^`2q' );
define( 'NONCE_SALT',       'm`QhG+K8Me3$2e5^5qO<N/h:s[i+X_M1=^xu!LV%+qI5K~^I5fa:P_fWc%8f_*qa' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/documentation/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */



define( 'FS_METHOD', 'direct' );
define( 'WP_AUTO_UPDATE_CORE', 'minor' );


define( 'WP_ALLOW_MULTISITE', true );
define( 'MULTISITE', true );
define( 'SUBDOMAIN_INSTALL', true );
$base = '/';
define( 'DOMAIN_CURRENT_SITE', 'www.mindpec-manpower.com' );
define( 'PATH_CURRENT_SITE', '/' );
define( 'SITE_ID_CURRENT_SITE', 1 );
define( 'BLOG_ID_CURRENT_SITE', 1 );

/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';

/**
 * Disable pingback.ping xmlrpc method to prevent WordPress from participating in DDoS attacks
 * More info at: https://docs.bitnami.com/general/apps/wordpress/troubleshooting/xmlrpc-and-pingback/
 */
if ( !defined( 'WP_CLI' ) ) {
	// remove x-pingback HTTP header
	add_filter("wp_headers", function($headers) {
		unset($headers["X-Pingback"]);
		return $headers;
	});
	// disable pingbacks
	add_filter( "xmlrpc_methods", function( $methods ) {
		unset( $methods["pingback.ping"] );
		return $methods;
	});
}
