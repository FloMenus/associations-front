import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

function Card(props) {
    const { slug } = useParams();
    
  return (
    <div className="card w-80 bg-base-100 shadow-xl h-96 hover:drop-shadow-2xl">
      <figure>
        <img className="aspect-video " src={props.image} alt={props.name} />
      </figure>
      <div className="card-body">
        <h2 className="card-title font-semibold">{props.name}</h2>
        <h3>{props.slogan}</h3>
      </div>
    </div>
  )
}

export default Card