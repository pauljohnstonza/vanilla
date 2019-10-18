import {
    useAvailableSubcommunityLocales,
    useCurrentSubcommunity,
} from "@subcommunities/subcommunities/subcommunitySelectors";
import React, { useRef, useState } from "react";
import { Devices, useDevice } from "@library/layout/DeviceContext";
import { DownTriangleIcon } from "@library/icons/common";
import DropDown, { DropDownOpenDirection, FlyoutType } from "@library/flyouts/DropDown";
import { ButtonTypes } from "@library/forms/buttonStyles";
import classNames from "classnames";
import Frame from "@library/layout/frame/Frame";
import { FrameHeaderMinimal } from "@library/layout/frame/FrameHeaderMinimal";
import Button from "@library/forms/Button";
import FrameBody from "@library/layout/frame/FrameBody";
import { getCurrentLocale, t } from "@vanilla/i18n/src";
import { locationChooserClasses } from "@library/locationChooser/locationChooserStyles";

export interface ILocation {
    render?: boolean;
    head: React.ReactNode;
    body: React.ReactNode;
}

interface IDropdownProps {
    buttonType?: ButtonTypes;
    fullWidth?: boolean;
    buttonClass?: string;
    initialLocation?: number;
    locations: ILocation[];
    toggleContents: () => string;
}

export function Chooser(props: IDropdownProps) {
    const { buttonType, fullWidth, buttonClass, initialLocation = 0, locations = [], toggleContents } = props;
    const [activeLocation, setActiveLocation] = useState(initialLocation);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const availableLocales = useAvailableSubcommunityLocales();
    const device = useDevice();
    const showHeader = device === Devices.MOBILE || device === Devices.XS;

    // Check if we have at least one location to display
    let localtions = [];
    locations.map(l => {
        if (l.render !== false) {
            // undefined is considered "true", only rejected by explicitly excluding the rendering of the "location".
            locations.push(l);
        }
    });

    if (localtions.length === 0) {
        return null;
    }
    // if (!subcommunity && !availableLocales) {
    //     return null;
    // }

    const classes = locationChooserClasses();

    const hasMultipleLocales = availableLocales && Object.values(availableLocales).length > 1;

    // let toggleName = <DownTriangleIcon title={t("Languages")} /> as React.ReactNode;

    // if (subcommunity) {
    //     toggleName = subcommunity.name;
    //     if (hasMultipleLocales) {
    //         toggleName += ` (${subcommunity.locale}) `;
    //     }
    // }

    return (
        <DropDown
            isVisible={isOpen}
            onVisibilityChange={setIsOpen}
            buttonRef={buttonRef}
            isSmall
            flyoutType={FlyoutType.FRAME}
            buttonBaseClass={props.buttonType || ButtonTypes.STANDARD}
            toggleButtonClassName={classNames(props.fullWidth && classes.toggleFullWidth, props.buttonClass)}
            openDirection={DropDownOpenDirection.AUTO}
            buttonContents={
                <span className={classNames(classes.toggle)}>
                    {toggleContents()}
                    <DownTriangleIcon
                        className={classNames(classes.toggleArrow, props.fullWidth && classes.toggleArrowFullWidth)}
                    />
                </span>
            }
        >
            <Frame
                header={
                    showHeader && (
                        <FrameHeaderMinimal
                            onClose={() => {
                                setIsOpen(false);
                            }}
                        >
                            {(localtions[activeLocation] as ILocation).head}
                            {/*{hasMultipleLocales && (*/}
                            {/*    <>*/}
                            {/*        <Button*/}
                            {/*            baseClass={*/}
                            {/*                activeLocation === "locale" ? ButtonTypes.TEXT_PRIMARY : ButtonTypes.TEXT*/}
                            {/*            }*/}
                            {/*            onClick={() => setActiveSection("locale")}*/}
                            {/*        >*/}
                            {/*            {t("Locales")}*/}
                            {/*        </Button>*/}
                            {/*        <hr className={classes.headingDivider} />*/}
                            {/*    </>*/}
                            {/*)}*/}
                            {/*<Button*/}
                            {/*    disabled={activeSection === "locale"}*/}
                            {/*    baseClass={activeSection === "product" ? ButtonTypes.TEXT_PRIMARY : ButtonTypes.TEXT}*/}
                            {/*    onClick={() => setActiveSection("product")}*/}
                            {/*>*/}
                            {/*    {t("Products")}*/}
                            {/*</Button>*/}
                        </FrameHeaderMinimal>
                    )
                }
                body={
                    <FrameBody selfPadded className={classes.body}>
                        {(localtions[activeLocation] as ILocation).body}

                        {/*{!subcommunity && availableLocales ? (*/}
                        {/*    <LocaleChooser*/}
                        {/*        value={getCurrentLocale()}*/}
                        {/*        onChange={() => {*/}
                        {/*            return;*/}
                        {/*        }}*/}
                        {/*        locales={useAvailableSubcommunityLocales()}*/}
                        {/*    />*/}
                        {/*) : (*/}
                        {/*    <SubcommunityChooser activeSection={activeSection} setActiveSection={setActiveSection} />*/}
                        {/*)}*/}
                    </FrameBody>
                }
                footer={null}
            />
        </DropDown>
    );
}
