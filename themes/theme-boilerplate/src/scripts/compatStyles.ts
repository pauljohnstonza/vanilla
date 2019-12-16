/**
 * Compatibility styles, using the color variables.
 *
 * @copyright 2009-2019 Vanilla Forums Inc.
 * @license GPL-2.0-only
 */

import { useThemeCache } from "@vanilla/library/src/scripts/styles/styleUtils";
import { cssRule } from "typestyle";
import { globalVariables } from "@vanilla/library/src/scripts/styles/globalStyleVars";
import { colorOut } from "@vanilla/library/src/scripts/styles/styleHelpersColors";

// To use compatibility styles, set '$colorFromDynamicTheme : true;' in custom.scss
// and call compatibilityStyles in javascript.js. Don't forget to build.
export const compatibilityStyles = useThemeCache(() => {
    const vars = globalVariables();
    const mainColors = vars.mainColors;
    cssRule("body", {
        backgroundColor: colorOut(mainColors.bg),
    });
});
