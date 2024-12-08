/* eslint-disable no-unused-vars */
import PropTypes from "prop-types";
import React from "react";
import NUArtworkItsoBlue52 from "../assets/images/NU_ARTWORK_ITSO_BLUE2.png";
// import { SideMenuItem } from "./SideMenuItem";
import airplay2 from "../assets/images/laboratory_pic.svg";
import alertTriangle2 from "../assets/images/reports_pic.svg";
import box2 from "../assets/images/inventory_pic.svg";
import reports2 from "../assets/images/about_pic.svg";
import settings2 from "../assets/images/settings1_pic.svg";
import "../App.css";

export const SideMenu = ({ property1, headerClassName }) => {
    return (
        <div className="side-menu">
            <div className={`header ${headerClassName}`}>
                <img
                    className="NU-ARTWORK-ITSO-BLUE"
                    alt="Nu ARTWORK ITSO BLUE"
                    src={NUArtworkItsoBlue52}
                />
            </div>

            <div className="div">
                {/* <SideMenuItem overview="image.svg" property1="dashboard" /> */}
                <div className="frame-wrapper">
                    <div className="frame-2">
                        <img className="img" alt="Airplay" src={airplay2} />

                        <div className="text-wrapper">Laboratory</div>
                    </div>
                </div>

                <div className="frame-wrapper">
                    <div className="frame-2">
                        <img className="img" alt="Alert triangle" src={alertTriangle2} />

                        <div className="text-wrapper">Reports</div>
                    </div>
                </div>

                <div className="frame-wrapper">
                    <div className="frame-2">
                        <img className="img" alt="Box" src={box2} />

                        <div className="text-wrapper">Inventory</div>
                    </div>
                </div>
            </div>

            <div className="frame-3">
                <div className="frame-wrapper">
                    <div className="frame-2">
                        <img className="img" alt="Settings" src={settings2} />

                        <div className="text-wrapper-2">Settings</div>
                    </div>
                </div>

                <div className="frame-wrapper">
                    <div className="frame-2">
                        <img className="img" alt="Reports" src={reports2} />

                        <div className="text-wrapper-2">About</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

SideMenu.propTypes = {
    property1: PropTypes.oneOf(["default"]),
    headerClassName: PropTypes.any
};
