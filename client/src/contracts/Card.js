import React, { useEffect } from 'react'
import './Card.css'

export default function Card(props) {

    const submit = ()=>{
        (props.contract).methods.likePost(props.id).send({from:props.add});
    }

  
  return (
    <div className='data'>
        
        <div >
                <img src={props.link} className='image' />
        </div>
        <div className="votes">
            Votes:{props.votes}
        </div>
        <div className="button">
            <button className='btn btn-primary'onClick={submit}>vote</button>
        </div>

    </div>
  )
}
