import React, { useEffect, useState } from "react";
import Post from "../post/Post";
import "./Profile.scss";
import userImg from "../../assets/user.png";
import { useNavigate, useParams } from "react-router";
import CreatePost from "../createPost/CreatePost";
import {useDispatch, useSelector} from 'react-redux';
import { getUserProfile } from "../../redux/slices/postsSlice";

function Profile() {
    const navigate = useNavigate();
    const params = useParams();
    const userProfile = useSelector(state => state.postsReducer.userProfile);
    const myProfile = useSelector(state => state.appConfigReducer.myProfile);
    const dispatch = useDispatch();
    const [isMyProfile, setIsMyProfile] = useState(false);

    useEffect(() => {
        dispatch(getUserProfile({
            userId: params.userId
        }))
        setIsMyProfile(myProfile?._id === params.userId);
    }, [myProfile]);

    return (
        <div className="Profile">
            <div className="container">
                <div className="left-part">
                    <CreatePost />
                    <Post />
                    <Post />
                    <Post />
                    <Post />
                </div>
                <div className="right-part">
                    <div className="profile-card">
                        <img className="user-img" src={userProfile?.avatar?.url} alt="" />
                        <h3 className="user-name">{userProfile?.name}</h3>
                        <div className="follower-info">
                            <h4>{`${userProfile?.followers?.length} Followers`}</h4>
                            <h4>{`${userProfile?.followings?.length} Followings`}</h4>
                        </div>
                        {!isMyProfile && <button className="follow btn-primary">Follow</button>}
                        {isMyProfile && <button
                            className="update-profile btn-secondary"
                            onClick={() => {
                                navigate("/updateProfile");
                            }}
                        >
                            Update Profile
                        </button>}
                        
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
