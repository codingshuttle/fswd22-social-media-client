import React from 'react'
import Follower from '../follower/Follower'
import Post from '../post/Post'
import './Feed.scss'

function Feed() {
  return (
    <div className="Feed">
        <div className="container">
          <div className="left-part">
            <Post />
            <Post />
            <Post />
            <Post />
          </div>
          <div className="right-part">
            <div className="following">
              <h3 className="title">You Are Following</h3>
              <Follower />
              <Follower />
              <Follower />
              <Follower />
            </div>
            <div className="suggestions">
              <h3 className="title">Suggested For You</h3>
              <Follower />
              <Follower />
              <Follower />
              <Follower />
            </div>
          </div>
        </div>
    </div>
  )
}

export default Feed