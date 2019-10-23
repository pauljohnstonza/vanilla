import {
    useAvailableSubcommunityLocales,
    useCurrentSubcommunity,
} from "@subcommunities/subcommunities/subcommunitySelectors";
import React, { useRef, useState } from "react";
import { Devices, useDevice } from "@library/layout/DeviceContext";
import { DownTriangleIcon, GlobeIcon } from "@library/icons/common";
import DropDown, { DropDownOpenDirection, FlyoutType } from "@library/flyouts/DropDown";
import { ButtonTypes } from "@library/forms/buttonStyles";
import classNames from "classnames";
import Frame from "@library/layout/frame/Frame";
import { FrameHeaderMinimal } from "@library/layout/frame/FrameHeaderMinimal";
import Button from "@library/forms/Button";
import FrameBody from "@library/layout/frame/FrameBody";
import { getCurrentLocale, ILocale, t } from "@vanilla/i18n/src";
import { locationChooserClasses } from "@library/locationChooser/locationChooserStyles";
import { LocaleLocation } from "@library/locationChooser/locations/LocaleLocation";

export interface ILocation {
    render?: boolean;
    label: React.ComponentType;
    head: React.ComponentType;
    body: React.ComponentType;
}

export interface IDropdownProps {
    buttonType?: ButtonTypes;
    fullWidth?: boolean;
    buttonClass?: string;
    additionalLocations?: ILocation[];
    initialLocation?: number;
    availableLocales?: ILocale[] | null; // useAvailableSubcommunityLocales()
}

export function LocationChooser(props: IDropdownProps) {
    const {
        buttonType,
        fullWidth,
        buttonClass,
        initialLocation = 0,
        additionalLocations = [],
        availableLocales = [],
    } = props;
    const [activeLocation, setActiveLocation] = useState(initialLocation);
    const [selectedLocale, setSelectedLocale] = useState(getCurrentLocale());
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const device = useDevice();
    const showHeader = device === Devices.MOBILE || (device === Devices.XS && activeLocation !== 0);
    const hasMultipleLocales = availableLocales && Object.values(availableLocales).length > 1;

    // Check if we have at least one location to display
    const locations: ILocation[] = hasMultipleLocales
        ? [
              {
                  render: true,
                  label: function locationLabelRender(props: {}) {
                      return <GlobeIcon />;
                  },
                  head: function locationHeadReander(props: {}) {
                      return null;
                  },
                  body: function locationBodyRender() {
                      return <LocaleLocation onChange={setSelectedLocale} />;
                  },
              },
          ]
        : [];

    additionalLocations.forEach((l: ILocation) => {
        if (l && l.render !== undefined && l.render) {
            locations.push(l);
        }
    });

    // if (!subcommunity && !availableLocales) {
    //     return null;
    // }

    const classes = locationChooserClasses();

    // let toggleName = <DownTriangleIcon title={t("Languages")} /> as React.ReactNode;

    // if (subcommunity) {
    //     toggleName = subcommunity.name;
    //     if (hasMultipleLocales) {
    //         toggleName += ` (${subcommunity.locale}) `;
    //     }
    // }

    // [
    //     {
    //         head: (selectedLocale?: string, setSelectedLocale?: (l: string) => void) => {
    //             return <GlobeIcon />;
    //         },
    //         body: (selectedLocale?: string, setSelectedLocale?: (l: string) => void) => {
    //             return <LocaleLocation onChange={setSelectedLocale} value={} />;
    //         },
    //     },
    // ]

    if (locations.length === 0) {
        return null;
    }

    const CurrentLocation = locations[activeLocation];
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
                    <></>
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
                            {<CurrentLocation.head />}
                        </FrameHeaderMinimal>
                    )
                }
                body={
                    <FrameBody selfPadded className={classes.body}>
                        <CurrentLocation.body />
                    </FrameBody>
                }
                footer={null}
            />
        </DropDown>
    );
}
