import './styles.css'
import React, { useState, useEffect, useCallback } from 'react'
import Chip from '@mui/material/Chip'
import { doc, setDoc } from 'firebase/firestore'
import { getUserDetail } from '../actions/userActions'
import { onAuthStateChanged, getAuth } from 'firebase/auth'
import { db } from '../config/firebase'
import Card from './Card'

const MultipleImageUpload = () => {
    const [userDetails, setUserDetails] = useState()
    const [images, setImages] = useState(Array(6).fill(null))

    const handleImageChange = (index, event) => {
        let newImages = [...images]
        newImages[index] = URL.createObjectURL(event.target.files[0])
        setImages(newImages)
    }

    const moveImage = useCallback((dragIndex, hoverIndex) => {
        setImages((prevCards) => {
            const clonedCards = [...prevCards]
            const removedItem = clonedCards.splice(dragIndex, 1)[0]
            clonedCards.splice(hoverIndex, 0, removedItem)
            return clonedCards
        })
    }, [])

    useEffect(() => {
        onAuthStateChanged(getAuth(), (user) => {
            if (user) {
                getUserDetail(user?.uid)
                    .then((response) => {
                        let userData = response.data
                        setUserDetails(userData)
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            }
        })
    }, [])

    const handleUploadImage = () => {
        let allFilled = images.every((element) => element !== null)
        const userRef = doc(db, 'Users', userDetails.uid)

        if (allFilled) {
            setDoc(
                userRef,
                { capital: true, profileImages: images },
                { merge: true }
            )
        } else {
            alert('Please select all images')
        }
    }

    return (
        <div className="wrapper">
            <div className="image-grid">
                {images.map((image, index) => (
                    <div key={index} className="image-container">
                        {image ? (
                            <Card
                                src={image}
                                title={`Image ${index + 1}`}
                                id={index}
                                index={index}
                                moveImage={moveImage}
                                className={'uploaded-image'}
                            />
                        ) : (
                            <label
                                htmlFor={`fileInput${index}`}
                                className="upload-label"
                            >
                                <div className="upload-icon">+</div>
                                <input
                                    type="file"
                                    id={`fileInput${index}`}
                                    className="file-input"
                                    onChange={(event) =>
                                        handleImageChange(index, event)
                                    }
                                />
                            </label>
                        )}
                    </div>
                ))}
            </div>
            <Chip
                color="primary"
                onClick={() => handleUploadImage()}
                label={<span className="truncate">{`Upload`}</span>}
            />
        </div>
    )
}

export default MultipleImageUpload
