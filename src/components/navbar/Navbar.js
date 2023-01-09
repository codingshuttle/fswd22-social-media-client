import React, { useRef, useState } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { useNavigate } from "react-router";
import Avatar from "../avatar/Avatar";
import "./Navbar.scss";
import LoadingBar from 'react-top-loading-bar'


function Navbar() {
    const navigate = useNavigate();
    const loadingRef = useRef()

    const [loading, setLoading] = useState(false);

    function toggleLoadingBar() {
        if(loading) {
            setLoading(false);
            loadingRef.current.complete();
        } else {
            setLoading(true);
            loadingRef.current.continuousStart();
        }
    }

    return (
        <div className="Navbar">
            <LoadingBar height={6} color='#5f9fff' ref={loadingRef} />
            <div className="container">
                <h2 className="banner hover-link" onClick={() => navigate("/")}>
                    Social Media
                </h2>
                <div className="right-side">
                    <div
                        className="profile hover-link"
                        onClick={() => navigate("/profile/asdlfl")}
                    >
                        <Avatar />
                    </div>
                    <div className="logout hover-link" onClick={toggleLoadingBar}>
                        <AiOutlineLogout />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
