import React, { useEffect, useState } from 'react'
import './Recomended.css'



import { API_KEY, value_converter } from '../../data';
import { Link } from 'react-router-dom';

const Recomended = ({ categoryId }) => {

    const [recomendedData, setRecomendedData] = useState([]);
    const fetchData = async () => {
        const RecomendedUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=45&regionCode=US&videoCategoryId=${categoryId}&key=${API_KEY}`
        await fetch(RecomendedUrl).then(res => res.json()).then(data => setRecomendedData(data.items))
    }
    useEffect(() => {
        fetchData();
    }, [])

    return (
        <div className='recomended'>

            {
                recomendedData.map((item, index) => {
                    return (
                        <Link to={`/video/${item.snippet.categoryId}/${item.id}`} className="side-video-list" key={index}>
                            <img src={item.snippet.thumbnails.medium.url} alt="" />
                            <div className="vid-info">
                                <h4>{item.snippet.title}</h4>
                                <p>{item.snippet.channelTitle}</p>
                                <p>{value_converter(item.statistics.viewCount)} views</p>
                            </div>
                        </Link>

                    )
                })
            }



        </div>
    )
}

export default Recomended