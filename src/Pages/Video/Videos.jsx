import React from 'react'
import Playvideo from '../../Components/PlayVideo/Playvideo'
import './Video.css'
import Recomended from '../../Components/Recomended/Recomended'
import { useParams } from 'react-router-dom'
const Videos = () => {

const { videoId, categoryId} = useParams();
  return (
    <div className="play-container">
      <Playvideo videoId={videoId} />
      <Recomended categoryId={categoryId}/>
    </div>)
}

export default Videos