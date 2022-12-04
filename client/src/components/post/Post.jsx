import "./post.css";
import { MoreVert } from "@material-ui/icons";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { format } from "timeago.js";

export default function Post({ post }) {
  const [like, setLike] = useState(post.likes.length)
  const [isLiked, setIsLiked] = useState(false)
  const PF = "http://localhost:8000/images/";
  const [user, setUser] = useState({});

  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id.$oid));
  }
    , [currentUser._id.$oid, post.likes]);



  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get(`http://localhost:8000/api/users?userId=${post.userId}`);
      setUser(res.data);



    }
    fetchUsers();
  }
    , [post.userId]);

  const likeHandler = async () => {

    try {
      const res = await axios.put(`http://localhost:8000/api/posts/${post._id}/like`, { userId: currentUser._id.$oid });
      
    } catch (error) {
      
    }



    setLike(isLiked ? like - 1 : like + 1)
    setIsLiked(!isLiked)
  }
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`profile/${user.username}`} >
              <img
                className="postProfileImg"
                src={user.profilePicture ? PF + user.profilePicture : PF + "person/download.png"}
                alt=""
              />
            </Link>
            <span className="postUsername">
              {user.username}
            </span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post.description}</span>
          <img className="postImg" src={PF + post.img} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img className="likeIcon" src={PF + "like.png"} onClick={likeHandler} alt="" />
            <img className="likeIcon" src={PF + "heart.png"} onClick={likeHandler} alt="" />
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}
