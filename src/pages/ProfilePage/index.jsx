import './profileStyles.css'
import React, { useState } from 'react'
import List from '@mui/material/List'
import Button from '@mui/material/Button'
import ListItem from '@mui/material/ListItem'
import { useHistory } from 'react-router-dom'
import Grow from '@mui/material/Grow'
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser'
import axios from 'axios'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ErrorBoundary from '../../components/errorBoundary' // Import the ErrorBoundary component
import { getFirestore, doc, getDoc } from 'firebase/firestore'
import { useEffect } from 'react'

function getIncomeBracket(income) {
    const bracketSize = 50000
    const bracketNumber = Math.floor(income / bracketSize)
    const lowerBound = bracketNumber * bracketSize
    const upperBound = (bracketNumber + 1) * bracketSize - 1
    return `$${lowerBound.toLocaleString()} - $${upperBound.toLocaleString()}`
}

export default function ProfilePage({
    userId,
    handleLike,
    profileItemString,
    profileIndex,
    setDrillDownProfile,
    showLikeButton,
    showPassButton,
    setMatchScreen,
    setIsDrillDown,
    dispatch,
    isEncounter,
    endEncounter,
    showFindOutMoreButton,
    handleProfileClick,
    showHover,
    profileId,
    handleSetUpADate,
    isActiveEncounter,
    setMatchesFirstName,
    dateRequestSent,
}) {
    // console.log('profileItemString', profileItemString)
    // Add a new state to track if the profile is disabled
    const [profileItem, setProfileItem] = useState(null)
    const [likesUser, setLikesUser] = useState(null)
    const [isProfileDisabled, setIsProfileDisabled] = useState(false)
    const [userAction, setUserAction] = useState(null)

    useEffect(() => {
        const fetchProfile = async () => {
            const db = getFirestore()
            console.log('ProfilePage: profileId', profileId)
            console.log('userId', userId)
            const profileDoc = doc(db, 'Users', profileId)
            console.log('profileDoc', profileDoc)
            const profileSnapshot = await getDoc(profileDoc)

            const likeDoc = doc(db, 'Likes', `${profileId}_${userId}`)
            const mutualLikeSnapshot = await getDoc(likeDoc)

            if (mutualLikeSnapshot.exists()) {
                console.log('Setting like user to true')
                setLikesUser(true)
            }

            if (profileSnapshot.exists()) {
                const data = profileSnapshot.data()
                setMatchesFirstName(data.firstName)
                setProfileItem(data)
            } else {
                console.log('No such profile!')
            }
        }

        fetchProfile()
    }, [profileId])

    // const profileItem =
    //     profileItemString && profileItemString.metadata
    //         ? profileItemString.metadata
    //         : profileItemString
    // console.log('profileItem', profileItem.id)
    // Modify the handleLikeClick function to set the user's action
    const handleLikeClick = (profileItem, likes) => {
        console.log('handleLikeClick', profileItem, likes)
        const updatedProfileItem = {
            ...profileItem,
            hasLiked: likes,
        }
        handleLike(updatedProfileItem, likes)
        setIsProfileDisabled(true) // Disable the profile after like/pass
        setUserAction(likes ? 'liked' : 'passed') // Set the user action
    }

    const handleEndEncounter = () => {
        console.log('handleEndEncounter')
        endEncounter()
    }

    const goBack = (profile) => {
        console.log('handleItemClick', profile)
        setIsDrillDown(false)
        setMatchScreen(true) // Add this line
        dispatch({
            type: 'ADD_SYSTEM_MESSAGE',
            message: {
                role: 'system',
                content: `The user has switched to the main match screen where he can see all profiles. You may answer general questions about all profiles while the user is on this screen.`,
            },
        })
    }

    // console.log(' profileItem.profileImageUrls', profileItem)

    return (
        <div>
            <ErrorBoundary>
                <List className="profile-column">
                    {setMatchScreen && (
                        <div className="btn-set-match-screen center-button">
                            <Button
                                onClick={() => goBack()}
                                style={{
                                    color: 'white',
                                    fontWeight: 'bold',
                                    width: '50%',
                                }}
                            >
                                Back to Matches
                            </Button>
                        </div>
                    )}
                    {likesUser && !isActiveEncounter && (
                        <div className="liked-badge">
                            {profileItem && profileItem.firstName
                                ? profileItem.firstName
                                : ''}{' '}
                            has already liked you!
                            <FavoriteIcon />
                        </div>
                    )}

                    {likesUser && isActiveEncounter && (
                        <div className="liked-badge">
                            {profileItem && profileItem.firstName
                                ? profileItem.firstName
                                : ''}{' '}
                            is currently in a match with you.
                        </div>
                    )}
                    <div
                        className={`profile-box ${showHover ? '' : 'no-hover'}`}
                        onClick={() => setDrillDownProfile(profileId)}
                    >
                        <li
                            className={`profile-container ${
                                isProfileDisabled ? 'disabled' : ''
                            }`}
                            key={profileIndex}
                            // onClick={() => handleLikeClick(profileItem)}
                        >
                            {profileItem &&
                                profileItem.profileImageUrls &&
                                profileItem.profileImageUrls[0] && (
                                    <div className="profile-img-container">
                                        <img
                                            src={
                                                `https://storage.cloud.google.com/matchmaker-ai-data/profile-images/` +
                                                profileItem.id +
                                                '/' +
                                                profileItem.profileImageUrls[0]
                                            }
                                        />
                                        <div className="small-img-row"></div>
                                    </div>
                                )}

                            <table style={{ color: 'white' }}>
                                <tbody>
                                    <tr>
                                        <td>First Name:</td>
                                        <td>
                                            {profileItem &&
                                            profileItem.firstName
                                                ? profileItem.firstName
                                                : ''}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Age:</td>
                                        <td>
                                            {profileItem && profileItem.age
                                                ? profileItem.age
                                                : ''}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Height:</td>
                                        <td>
                                            {profileItem && profileItem.height
                                                ? profileItem.height
                                                : ''}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Occupation:</td>
                                        <td>
                                            {profileItem &&
                                            profileItem.occupation
                                                ? profileItem.occupation
                                                : ''}
                                        </td>
                                    </tr>
                                    {profileItem &&
                                    profileItem.gender === 'Male' ? (
                                        <tr>
                                            <td>Income Bracket:</td>
                                            <td>
                                                {' '}
                                                <VerifiedUserIcon
                                                    style={{ color: 'green' }}
                                                    color="green"
                                                />
                                                {getIncomeBracket(
                                                    profileItem &&
                                                        profileItem.income
                                                        ? profileItem.income
                                                        : ''
                                                )}
                                            </td>
                                        </tr>
                                    ) : null}

                                    <tr></tr>
                                </tbody>
                            </table>

                            {profileItem &&
                                profileItem.profileImageUrls &&
                                profileItem.profileImageUrls[1] && (
                                    <div className="profile-img-container">
                                        <img
                                            src={
                                                `https://storage.cloud.google.com/matchmaker-ai-data/profile-images/` +
                                                profileItem.id +
                                                '/' +
                                                profileItem.profileImageUrls[1]
                                            }
                                        />
                                        <div className="small-img-row"></div>
                                    </div>
                                )}
                            <div>
                                <p style={{ color: 'white' }}>
                                    {' '}
                                    {profileItem &&
                                    profileItem.introductionDescription
                                        ? profileItem.introductionDescription
                                        : ''}
                                </p>
                            </div>
                        </li>

                        {showFindOutMoreButton && profileItem && (
                            <li className="like-button">
                                <button
                                    className="btn-Profile"
                                    onClick={() =>
                                        handleProfileClick(profileItem)
                                    }
                                >
                                    {`Find out more about ${profileItem.firstName}`}
                                </button>
                            </li>
                        )}
                        {showLikeButton &&
                            !likesUser &&
                            userAction !== 'liked' &&
                            profileItem &&
                            !isActiveEncounter &&
                            profileItem && (
                                <li className="like-button">
                                    <button
                                        className="btn-Profile"
                                        onClick={() =>
                                            handleLikeClick(profileItem, true)
                                        }
                                    >
                                        {`I like ${profileItem.firstName}!`}
                                    </button>
                                </li>
                            )}

                        {showLikeButton &&
                            likesUser &&
                            userAction !== 'liked' &&
                            profileItem &&
                            !dateRequestSent && (
                                <li className="like-button">
                                    <button
                                        className="btn-Profile"
                                        onClick={() =>
                                            handleSetUpADate(profileItem)
                                        }
                                    >
                                        {`Set up a date with ${profileItem.firstName}!`}
                                    </button>
                                </li>
                            )}

                        {isActiveEncounter && profileItem && (
                            <li className="pass-button">
                                <button
                                    className="btn-pass"
                                    onClick={() =>
                                        handleEndEncounter(profileItem, true)
                                    }
                                >
                                    {`End encounter with ${profileItem.firstName}`}
                                </button>
                            </li>
                        )}
                        {showPassButton &&
                            userAction !== 'liked' &&
                            userAction !== 'passed' &&
                            !isActiveEncounter &&
                            profileItem && (
                                <li className="pass-button">
                                    <button
                                        className="btn-pass"
                                        onClick={() =>
                                            handleLikeClick(profileItem, false)
                                        }
                                    >
                                        {`Pass on ${profileItem.firstName}`}
                                    </button>
                                </li>
                            )}
                        {userAction && profileItem && (
                            <li className={`action-message ${userAction}`}>
                                {userAction === 'liked'
                                    ? `You liked ${profileItem.firstName}`
                                    : `You passed on ${profileItem.firstName}`}
                            </li>
                        )}
                    </div>
                </List>
            </ErrorBoundary>
        </div>
    )
}
