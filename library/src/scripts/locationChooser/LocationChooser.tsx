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
import { getCurrentLocale, t } from "@vanilla/i18n/src";
import { locationChooserClasses } from "@library/locationChooser/locationChooserStyles";
import { Chooser, ILocation } from "@library/locationChooser/Chooser";
import { LocaleLocation } from "@library/locationChooser/locations/LocaleLocation";

// export interface ILocation {
//     render: boolean;
//     head: React.ReactNode;
//     body: React.ReactNode;
// }

// buttonType?: ButtonTypes;
// fullWidth?: boolean;
// buttonClass?: string;
// initialLocation?: number;
// locations: ILocation[];
// toggleContents: () => string;

export function LocationChooser(props) {
    return (
        <Chooser
            locations={[
                {
                    head: <GlobeIcon />,
                    body: <LocaleLocation onChange={} />,
                },
            ]}
        />
    );
}
