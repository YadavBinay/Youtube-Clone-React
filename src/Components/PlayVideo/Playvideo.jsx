import React, { useEffect, useState } from "react";
import "./Playvideo.css";
// import video1 from '../../assets/video.mp4'
import like from "../../assets/like.png";
import dislike from "../../assets/dislike.png";
import save from "../../assets/save.png";
import share from "../../assets/share.png";
import { API_KEY, value_converter } from "../../data";
import moment from "moment/moment";
import { useParams } from "react-router-dom";

const Playvideo = () => {
  const { videoId } = useParams();
  // console.log(`current videoId is ${videoId}`);
  const [videoData, setvideoData] = useState(null);
  const [channelData, setChannelData] = useState(null);
  const [commentData, setcommentData] = useState([]);

  const fetchVideoData = async () => {
    //Fetching Videos Data
    const VideoDetailsUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`;
    //one line fetch is below commented
    // await fetch(VideoDetailsUrl).then(res => res.json()).then(data => setapiData(data.items[0]));
    await fetch(VideoDetailsUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok Video-detail Url");
        }
        return response.json();
      })
      .then((data) => {
        // Process the JSON data
        setvideoData(data.items[0]);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        // Handle the error appropriately (e.g., show an error message to the user)
      });
  };

  const fetchOtherData = async () => {
    // fetching channel data like imgage
    const channelDataUrl = videoData? `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${videoData.snippet.channelId}&key=${API_KEY}`:"";

    await fetch(channelDataUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok-channelData Url");
        }
        return response.json();
      })
      .then((data) => {
        // Process the JSON data
        setChannelData(data.items[0]);
      })
      .catch((error) => {
        console.error("Error fetching data: channelDataURL", error);
        // Handle the error appropriately (e.g., show an error message to the user)
      });

    const commentsURL = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=20&videoId=${videoId}&key=${API_KEY}`;
    await fetch(commentsURL)
      .then((res) => res.json())
      .then((data) => setcommentData(data.items));
  };

  useEffect(() => {
    fetchVideoData();
  }, [videoId]);

  useEffect(() => {
    fetchOtherData();
  });

  return (
    <div className="play-video">
      {/* <video src={video1} controls muted></video> */}
      <iframe
        title=" "
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
      {<h3> {videoData ? videoData.snippet.title : "Title Here"} </h3>}
      <div className="play-video-info">
        <p>
          {" "}
          {value_converter(
            videoData ? videoData.statistics.viewCount : "XX"
          )}{" "}
          Views &bull;
          {moment(videoData ? videoData.snippet.publishedAt : "x").fromNow()}
        </p>

        <div>
          <span>
            <img src={like} alt="" />{" "}
            {value_converter(videoData ? videoData.statistics.likeCount : "XX")}{" "}
          </span>
          <span>
            <img src={dislike} alt="" />{" "}
          </span>
          <span>
            <img src={share} alt="" /> Share
          </span>
          <span>
            <img src={save} alt="" /> Save
          </span>
        </div>
      </div>

      <hr />
      <div className="publisher">
        <img
          src={channelData ? channelData.snippet.thumbnails.default.url : ""}
          alt=""
        />
        <div>
          <p>{videoData ? videoData.snippet.channelTitle : "Channel Name"}</p>
          <span>
            {channelData
              ? value_converter(channelData.statistics.subscriberCount)
              : "x"}{" "}
            Subscribers
          </span>
        </div>
        <button>Subscribe</button>
      </div>
      <div className="vid-description">
        <p>
          {videoData
            ? videoData.snippet.localized.description.slice(0, 250)
            : "Error Fetching"}
        </p>
        <hr />
        <h4>
          {value_converter(
            videoData ? videoData.statistics.commentCount : "XX"
          )}{" "}
          Comments{" "}
        </h4>

        {commentData.map((item, index) => {
          return (
            <div className="comment" key={index}>
              <img
                src={item.snippet.topLevelComment.snippet.authorProfileImageUrl}
                alt=""
              />
              <div>
                <h3>
                  {item.snippet.topLevelComment.snippet.authorDisplayName}
                  <span>
                    {moment(
                      item.snippet.topLevelComment.snippet.publishedAt
                    ).fromNow()}
                  </span>
                </h3>
                <p id="commentHtml"></p>
                <p>{item.snippet.topLevelComment.snippet.textOriginal}</p>

                <div className="comment-action">
                  <img src={like} alt="" />
                  <span>
                    {value_converter(
                      item.snippet.topLevelComment.snippet.likeCount
                        ? item.snippet.topLevelComment.snippet.likeCount
                        : ""
                    )}
                  </span>
                  <img src={dislike} alt="" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Playvideo;
