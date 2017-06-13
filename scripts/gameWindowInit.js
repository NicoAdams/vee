/* This is dumb but necessary to get 'require' calls to work right
 *
 * (TLDR: The first js file loaded by index.html thinks its in directory "vee",
 * and every consecutive one thinks it's in directory "vee/scripts". So this
 * js file is the throwaway that thinks it's in "vee" so that every file
 * following thinks it's in "scripts", making "require" statements simpler.
 * Also hi Jackson kudos to you if you actually took the time to read this)
 */

const game = require('./scripts/gameWindow');
