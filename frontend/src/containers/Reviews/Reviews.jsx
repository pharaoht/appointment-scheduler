import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Reviews.css'

const Reviews = () => {
    const baseURL = 'http://localhost:8000/api/'
    const [reviews, setReviews] = useState([])

    useEffect(() => {
        getReviews();

    }, [])

    const getReviews = () => {
        axios.get(`${baseURL}get-reviews/`)
            .then((res) => {
                console.log(res)
                setReviews(res.data)
            })
            .catch(err => console.log(err))

    }

    return <>
        <div className="reviews-outline">
            <div className="main-holder">
                <div className="header">
                    <h2>Reviews</h2>
                </div>
                <div className="reviews-holder">
                    {reviews.map((currentItem, idx) => {
                        return (
                            <>
                                <div className="review" key={idx}>
                                    <div className="title-star-holder">
                                        <div><h3>{currentItem.title}</h3></div>
                                        <div><i>{currentItem.date_posted}</i></div>
                                    </div>
                                    <div className="name-date-holder">
                                        <div><h4>{currentItem.name}</h4></div>
                                        <div><i>{currentItem.date_posted}</i></div>
                                    </div>
                                    <div className="desc-holder">

                                    </div>
                                </div>
                            </>
                        )
                    })}
                </div>

            </div>

        </div>
    </>
}

export default Reviews;