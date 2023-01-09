import React from "react";
import userImg from "../../assets/user.png";
import "./Avatar.scss";

function Avatar({ src }) {
    return (
        <div className="Avatar">
            <img src={src ? src : userImg} alt="user avatar" />
        </div>
    );
}

export default Avatar;
