<?php
/**
 *
 * @author Stéphane LaFlèche <stephane.l@vanillaforums.com>
 * @copyright 2009-2018 Vanilla Forums Inc.
 * @license GPL-2.0-only
 */

namespace Vanilla\Themes\Foundation;

/**
 * Class KeystoneThemeHooks
 */
class FoundationThemeHooks extends \Gdn_Plugin {

    /**
     * Run once on enable.
     *
     * @return void
     */
    public function setup() {
        saveToConfig(['Garden.MobileTheme' => 'foundation']);
    }

    /**
     * Runs every page load
     *
     * @param \Gdn_Controller $sender This could be any controller
     *
     * @return void
     */
    public function base_render_before($sender) {
        if (inSection('Dashboard')) {
            return;
        }

        // Set Data "heroImageUrl" to smarty
        if (class_exists('HeroImagePlugin')) {
            $imageUrl = \HeroImagePlugin::getCurrentHeroImageLink();
            $sender->setData('heroImageUrl', $imageUrl);
        }

        $hasAdvancedSearch = class_exists('AdvancedSearchPlugin');

        //set "hasAdvancedSearch" to smarty
        $sender->setData('hasAdvancedSearch', $hasAdvancedSearch);

        //set ThemeOptions to smarty
        $themeOptions = c("Garden.ThemeOptions");

        foreach ($themeOptions as $key => &$value) {
            $sender->setData("ThemeOptions." . $key, $value);
        }
    }

    /**
     * Add custom toggles "hasHeroBanner", "hasFeatureSearchbox", "panelToLeft" to Theme Options
     *
     * @param \SettingsController $sender
     *
     * @return void
     */
    public function settingsController_afterCustomStyles_handler($sender) {
        $form = $sender->Form;
        $hasHeroImagePlugin = $sender->Data["hasHeroImagePlugin"];
        $hasAdvancedSearch = $sender->Data["hasAdvancedSearch"];
        echo '<section>';
        echo '<h2 class="subheading">' . t("Options") . '</h2>';

        //Only render these fields if hasHeroImagePlugin == true
        if ($hasHeroImagePlugin) {
            echo '<li class="form-group">';
            echo $sender->Form->toggle(
                "ThemeOptions.Options.hasHeroBanner",
                t("Integrate Hero Image plugin"),
                [],
                t("Displays \"Hero Image\" plugin below the header. \"Hero Image\" plugin needs to be enabled for this option to work properly.")
            );
            echo '</li>';

            echo '<li class="form-group">';
            echo $sender->Form->toggle(
                "ThemeOptions.Options.hasFeatureSearchbox",
                t("Integrate searchbox with Hero Image plugin"),
                [],
                t("Change searchbox's position to display over Hero Banner. \"Hero Image\" plugin needs to be enabled for this option to work properly.")
            );
            echo '</li>';
        }

        echo '</section>';
        echo '<div class="form-footer js-modal-footer">';
        echo $form->button('Save');
        echo '</div>';
    }

}
