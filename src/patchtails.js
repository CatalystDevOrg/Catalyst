// some bits of code that is required by other code
/**
 * Shortcut for getElementById
 * @param {string} id
 */
const byId = id => document.getElementById(id);

/**
 * Shortcut for a click addEventListener
 * @param {string} id - The ID of element the listener will be attached to
 * @param {Function} cb - The callback function that's executed when a user clicks the element
 */
const click = (id, cb) => byId(id).addEventListener('click', (e) => {
    cb(e);
});
