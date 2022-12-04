import "./share.css";
import { PermMedia, Label, Room, EmojiEmotions, Cancel } from "@material-ui/icons"
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useRef, useState } from "react";
import axios from "axios";

export default function Share() {

  const PF = "http://localhost:8000/images/";
  const description = useRef();
  const [file, setFile] = useState(null);

  const { user } = useContext(AuthContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      description: description.current.value,
    };
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.img = fileName;
      // console.log(newPost);
      try {
        await axios.post("http://localhost:8000/api/upload", data);
      } catch (err) {
        console.log(err);
      }
    }
    // console.log(newPost);
    console.log(user._id);
    try {
      console.log(newPost);
      console.log("post created");
      await axios.post("http://localhost:8000/api/posts/", newPost);
      window.location.replace("/");
    } catch (err) {
      console.log(err);
    }
  };



  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            className="shareProfileImg"
            src={user.profilePicture ? PF + user.profilePicture : PF + "person/download.png"}
            alt=""
          />
          <input
            placeholder={`What's on your mind, ${user.username}?`}
            className="shareInput"
            ref={description}
          />
        </div>

        {file && (
          <div className="shareImgContainer">
            <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
            <Cancel className="shareCancelImg" onClick={() => { setFile(null) }} />
          </div>
        )}


        <hr className="shareHr" />
        <form className="shareBottom" onSubmit={submitHandler}  >
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Photo or Video</span>
              <input type="file" id="file" style={{ "display": "none" }} onChange={(e) => setFile(e.target.files[0])} />
            </label>
            <div className="shareOption">
              <Label htmlColor="blue" className="shareIcon" />
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <Room htmlColor="green" className="shareIcon" />
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
              <span className="shareOptionText">Feelings</span>
            </div>
          </div>
          <button className="shareButton" type="submit"  >Share</button>
        </form>
      </div>
    </div>
  );
}
