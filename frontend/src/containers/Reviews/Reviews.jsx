import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Reviews.css'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Reviews = ({ isAuthenticated, user }) => {
    const baseURL = 'http://localhost:8000/api/'
    const [reviews, setReviews] = useState([])
    const [prevPage, setPrevPage] = useState([])
    const [nextPage, setNextPage] = useState([])
    const [page, setPage] = useState(1)
    const [userInfo, setUserInfo] = useState({ user })
    const [userAuth, setUserAuth] = useState({ isAuthenticated })

    useEffect(() => {
        getReviews();
    }, [isAuthenticated])


    const deleteReview = (config, body) => {
        axios.delete(`${baseURL}delete-review/`, body, config)
            .then(res => {
                console.log(res)

            })
            .catch(err => console.log(err))
    }

    const createReview = () => {
        axios.post(`${baseURL}`)

    }

    const getReviews = () => {
        axios.get(`${baseURL}get-reviews/`)
            .then((res) => {
                setPrevPage(res.data.previous)
                setNextPage(res.data.next)
                setReviews(res.data.results)

            })
            .catch(err => console.log(err))

    }

    const pageincrementer = (pagetype, url) => {
        if (url === null || undefined) {
            return null
        }
        axios.get(url)
            .then(res => {
                setPrevPage(res.data.previous)
                setNextPage(res.data.next)
                setReviews(res.data.results)
            }).catch(err => console.log(err))

    }

    const starAdd = (num) => {
        let stars = []
        for (let i = 0; i < num; i++) {
            stars.push(<span className="fa fa-star"></span>)
        }
        return (
            <>
                {stars.map((curr, idx) => {
                    return (
                        <>
                            <span className={curr.props.className} ></span>
                        </>
                    )
                })}
            </>
        )
    }

    const showDelete = (client, review) => {
        const deleteHandler = () => {
            if (localStorage.getItem('access')) {
                try {
                    const config = {
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        }
                    }

                    let dt = localStorage.getItem('access')
                    const body = JSON.stringify({ token: dt })
                    deleteReview(config, body)
                }
                catch (err) {
                    console.log(err)
                }
            } else {
                return null;
            }


        }

        if (userAuth.isAuthenticated === null || false) {
            return (
                <>
                    {null}
                </>
            )
        } else {
            if (userInfo.user === null) {
                return (
                    <>
                        {null}
                    </>
                )
            } else if (client === userInfo.user.id) {
                return (
                    <>
                        <div className="delete-holder">
                            <span className="fa fa-trash" onClick={(e) => deleteHandler()}></span>
                        </div>
                    </>
                )
            }
        }
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
                                        <div><h3>{currentItem.title},</h3></div>
                                        <div className="date-posted"><i>{currentItem.date_posted}</i></div>
                                    </div>
                                    <div className="name-date-holder">
                                        <div><h4>{currentItem.client.first_name}</h4></div>
                                        <div>
                                            {starAdd(currentItem.rating)}

                                        </div>
                                    </div>
                                    <div className="desc-holder">
                                        <p>{currentItem.desc}</p>
                                    </div>
                                    {showDelete(currentItem.client.id, currentItem.id)}
                                </div>
                            </>
                        )
                    })}
                </div>
                <div className="pagenum">
                    <div><Link className="pageinfo" to="#" onClick={(e) => pageincrementer(1, prevPage)}>Previous</Link></div>
                    <div><Link className="pageinfo" to="#" onClick={(e) => pageincrementer(2, nextPage)}>Next</Link></div>
                </div>

            </div>

        </div>
    </>
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
})

export default connect(mapStateToProps, {})(Reviews);