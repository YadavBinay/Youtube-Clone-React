import React, { useEffect, useState } from 'react'
import './Feed.css'


import { Link } from 'react-router-dom';
import { API_KEY, value_converter } from '../../data';
import moment from 'moment';
import Error from '../Error/Error';

const Feed = ({ category }) => {
    const [data, setData] = useState([]);
    const [errormsg, seterrormsg] = useState(null)
    const fetchData = async () => {
        try {

            const videoList_url =
                `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=NP&videoCategoryId=${category}&key=${API_KEY}`;
            await fetch(videoList_url).then(response => {
                seterrormsg("Status Code: "+ response.status + response.statusText.toString());
                return response.json()
            }).then(data => setData(data.items));
        }
        catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [category])

    return (
        <div className="feed">

            {
                data ? data.map((item, index) => {
                    return (
                        <Link style={{ color: "black" }} key={index}
                            to={`video/${item.snippet.categoryId}/${item.id}`} className="card">
                            <img src={item.snippet.thumbnails.medium.url} alt="" />
                            <h2>{item.snippet.title}</h2>
                            <h3>{item.snippet.channelTitle}</h3>
                            <p>
                                {value_converter(item.statistics.viewCount)} views &bull; {" "}
                                {moment(item.snippet.publishedAt).fromNow()}</p>
                        </Link>

                    )
                }) : <Error msg={errormsg} />
            }





        </div>
    )
}

export default Feed