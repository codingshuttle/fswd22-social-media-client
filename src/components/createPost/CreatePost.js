import React, { useState } from "react";
import Avatar from "../avatar/Avatar";
import "./CreatePost.scss";
import backgroundDummyImg from "../../assets/background.jpeg";
import { BsCardImage } from "react-icons/bs";
import { axiosClient } from "../../utils/axiosClient";
import {useDispatch} from 'react-redux';
import { setLoading } from "../../redux/slices/appConfigSlice";

function CreatePost() {
    const [postImg, setPostImg] = useState("");
    const [caption, setCaption] = useState('')
    const dispatch = useDispatch();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            if (fileReader.readyState === fileReader.DONE) {
                setPostImg(fileReader.result);
                console.log("img data", fileReader.result);
            }
        };
    };

    const hanldePostSubmit = async() => {
        try {
            dispatch(setLoading(true))
            const result = await axiosClient.post('/posts', {
                caption,
                postImg
            });
            console.log('post done', result);
        } catch (error) {
            
        } finally {
            dispatch(setLoading(false))
            setCaption('');
            setPostImg('');
        }
        

    }

    return (
        <div className="CreatePost">
            <div className="left-part">
                <Avatar />
            </div>
            <div className="right-part">
                <input
                    value={caption}
                    type="text"
                    className="captionInput"
                    placeholder="What's on your mind?"
                    onChange={(e) => setCaption(e.target.value)}
                />
                {postImg && (
                    <div className="img-container">
                        <img
                            className="post-img"
                            src={postImg}
                            alt="post-img"
                        />
                    </div>
                )}

                <div className="bottom-part">
                    <div className="input-post-img">
                        <label htmlFor="inputImg" className="labelImg">
                            <BsCardImage />
                        </label>
                        <input
                            className="inputImg"
                            id="inputImg"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                    </div>
                    <button className="post-btn btn-primary" onClick={hanldePostSubmit}>Post</button>
                </div>
            </div>
        </div>
    );
}

export default CreatePost;
