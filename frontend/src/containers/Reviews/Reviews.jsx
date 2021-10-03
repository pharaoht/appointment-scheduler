import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Reviews.css'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Modal from 'react-modal'
import { load_user } from '../../actions/auth';

//finish form errors
//fix reload error when check for users
//remove password from api call

const Reviews = ({ user, isAuthenticated, load_user }) => {
    const baseURL = 'http://localhost:8000/api/'
    const [reviews, setReviews] = useState([])
    const [prevPage, setPrevPage] = useState([])
    const [nextPage, setNextPage] = useState([])
    const [isDelete, setIsDeleted] = useState(false)
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [formData, setFormData] = useState({
        client: "",
        title: "",
        desc: "",
        rating: "",
    })
    const [errFormData, setErrFormData] = useState([])


    useEffect(() => {
        async function fetchData() {
            window.scrollTo(0, 0);
            await load_user()
            getReviews()
            setIsDeleted(false)
        }

        fetchData()
    }, [isDelete, isAuthenticated])

    const changeHandler = (e) => {
        if (isAuthenticated) {
            setFormData({ ...formData, client: user.id, [e.target.name]: e.target.value })
        }
        else {
            return null
        }

    }

    const createReview = (e) => {
        e.preventDefault()
        if (isAuthenticated) {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${localStorage.getItem('access')}`,
                    'Accept': 'application/json'
                }
            }
            axios.post(`${baseURL}create-review/`, formData, config)
                .then(res => {
                    console.log(res)
                    if (res.status === 200) {
                        setErrFormData(res.data)
                        return null

                    } else {
                        alert("Your comment has been Added!")
                        setModalIsOpen(false)
                        setIsDeleted(true)
                        setFormData("")
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        } else {
            alert("Please login to Add a review")
            setModalIsOpen(false)
            setIsDeleted(true)
            setFormData("")
        }


    }

    const getReviews = () => {
        axios.get(`${baseURL}get-reviews/`)
            .then((res) => {
                setPrevPage(res.data.previous)
                setNextPage(res.data.next)
                setReviews(res.data.results)
            })
            .catch((err) => console.log(err))
    }

    const showModal = () => {

        return (
            <>
                <Modal isOpen={modalIsOpen}
                    onRequestClose={() => {
                        setModalIsOpen(false)
                        setFormData("")
                    }}
                    style={
                        {
                            overlay: {
                                backgroundColor: 'rgba(0, 0, 0, 0.55)'
                            },
                            content: {
                                backgroundColor: "aliceblue",
                                position: 'absolute',
                                top: '15%',
                                left: '15%',
                                right: '15%',
                                bottom: '15%',
                                borderRadius: 0
                            }
                        }
                    }>
                    <div className="modal-top-1">
                        <h3>Agrega una Reseña <i class="fa fa-times" aria-hidden="true" onClick={() => {
                            setModalIsOpen(false)
                            setFormData("")
                        }}></i></h3>
                        <div className="modal-holder">
                            <form onSubmit={(e) => createReview(e)}>
                                <div className="modal-form-holder">
                                    <div className="form-input">
                                        <input name="title" type="text" onChange={changeHandler} maxLength="25" placeholder=" título *" required />
                                    </div>
                                    <div className="form-input">
                                        <input name="rating" type="number" onChange={changeHandler} placeholder=" clasificación *" required min='0' max='5' /><span className="num-max">/5</span>
                                    </div>
                                    <div className="form-input">
                                        <textarea name="desc" onChange={changeHandler} placeholder=" describe tu experiencia *" required></textarea>
                                    </div>
                                    <div className="form-input">
                                        <button type="submit">Crear Reseña <i class="fa fa-paw" aria-hidden="true"></i></button>
                                    </div>
                                </div>
                            </form>

                        </div>

                    </div>

                </Modal>

            </>
        )
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
                            <span className={curr.props.className}></span>
                        </>
                    )
                })}
            </>
        )
    }

    const showDelete = (client, review) => {

        if (!isAuthenticated) {
            return false
        }
        const deleteHandler = () => {

            if (window.confirm('¿Estás seguro de que deseas eliminar esta reseña?')) {
                if (localStorage.getItem('access')) {
                    try {
                        const config = {
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `JWT ${localStorage.getItem('access')}`,
                                'Accept': 'application/json'
                            }
                        }

                        const body = JSON.stringify({ id: review })
                        axios.post(`${baseURL}delete-review/`, body, config)
                            .then(res => {
                                setIsDeleted(true)
                            })
                            .catch(err => console.log(err))

                    }
                    catch (err) {
                        console.log(err)
                    }
                } else {
                    return null;
                }
            } else {
                return null
            }
        }

        if (isAuthenticated === null || false) {
            return (
                <>
                    {null}
                </>
            )
        } else {
            if (user.id === null) {
                return (
                    <>
                        {null}
                    </>
                )
            } else if (client === user.id) {
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
                {showModal()}
                <div className="header">
                    <h2>Reseñas {isAuthenticated ? <span className="fa fa-plus" onClick={(e) => setModalIsOpen(true)}></span> : null}</h2>
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
                    <div><Link className="pageinfo" to="#" onClick={(e) => pageincrementer(1, prevPage)}>Previo</Link></div>
                    <div><Link className="pageinfo" to="#" onClick={(e) => pageincrementer(2, nextPage)}>Siguiente</Link></div>
                </div>
            </div>
        </div>
    </>
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
})

export default connect(mapStateToProps, { load_user })(Reviews);