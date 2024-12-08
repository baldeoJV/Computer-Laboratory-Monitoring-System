/* eslint-disable no-unused-vars */
import PropTypes from "prop-types";
import React from "react";
import airplay from "./airplay.svg";
import alertTriangle from "./alert-triangle.svg";
import archive from "./archive.svg";
import box from "./box.svg";
import icon from "./icon.svg";
import reports from "./reports.svg";
import settings from "./settings.svg";
import "./style.css";

export const SideMenuItem = ({ property1, overview = "overview.svg" }) => {
    return (
        <div className={`side-menu-item ${property1}`}>
            {(property1 === "about" ||
                property1 === "archive" ||
                property1 === "dashboard" ||
                property1 === "default" ||
                property1 === "inventory" ||
                property1 === "reports" ||
                property1 === "settings" ||
                property1 === "variant-8") && (
                <>
                    <div className="rectangle" />

                    <div className="frame">
                        <img
                            className="airplay"
                            alt="Airplay"
                            src={
                                property1 === "dashboard"
                                    ? overview
                                    : property1 === "reports"
                                        ? alertTriangle
                                        : property1 === "inventory"
                                            ? box
                                            : property1 === "archive"
                                                ? archive
                                                : property1 === "settings"
                                                    ? settings
                                                    : property1 === "about"
                                                        ? reports
                                                        : property1 === "variant-8"
                                                            ? icon
                                                            : airplay
                            }
                        />

                        <div className="laboratory">
                            {property1 === "default" && <>Laboratory</>}

                            {property1 === "dashboard" && <>Dashboard</>}

                            {property1 === "reports" && <>Reports</>}

                            {property1 === "inventory" && <>Inventory</>}

                            {property1 === "archive" && <>Archive</>}

                            {property1 === "settings" && <>Settings</>}

                            {property1 === "about" && <>About</>}

                            {property1 === "variant-8" && <>Downloads</>}
                        </div>
                    </div>
                </>
            )}

            {property1 === "wf" && (
                <div className="div">
                    <div className="rectangle-2" />

                    <div className="text-wrapper">Downloads</div>
                </div>
            )}
        </div>
    );
};

SideMenuItem.propTypes = {
    property1: PropTypes.oneOf([
        "dashboard",
        "reports",
        "default",
        "wf",
        "variant-8",
        "inventory",
        "about",
        "settings",
        "archive",
    ]),
    overview: PropTypes.string,
};
