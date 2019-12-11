/**
 * @copyright 2009-2019 Vanilla Forums Inc.
 * @license GPL-2.0-only
 */

/**
 * Get width of window in pixels
 */
export function getCurrentWindowWidth() {
    return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || null;
}
