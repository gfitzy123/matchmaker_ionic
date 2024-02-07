import './genderSelectionPageStyles.css'
import React from 'react'
import GenderIdentification from '../../components/genderIdentificatiion'

export default function GenderSelectionPage() {
    return (
        <div className="wrapper">
            <a className="txt-gender-header">Are you a.. </a>
            <GenderIdentification />
        </div>
    )
}
