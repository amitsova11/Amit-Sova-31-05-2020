import React from 'react';
import '../styles/topbar.scss';
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Image from "react-bootstrap/Image";
import weatherIcon from "../images/weather-icon.png"
import { FaCloudSunRain, FaRegHeart } from 'react-icons/fa';

function Topbar() {
    return (
        <div className="topbar">
            <Navbar bg="light" expand="lg">
                <Navbar.Brand><Image src={weatherIcon} style={{width: "50px", height: "50px"}}/> iWeather App  </Navbar.Brand>
                    <Nav className="mr-auto" variant={"pills"}>
                        <Nav.Link className={"navlink"} href="/weather"><FaCloudSunRain style={{marginRight:"10px"}}/>Weather</Nav.Link>
                        <Nav.Link className={"navlink"} href="/favourites"><FaRegHeart style={{marginRight:"7px", height: "17px"}}/>Favourites</Nav.Link>
                    </Nav>
            </Navbar>
        </div>
    );
}

export default Topbar;
