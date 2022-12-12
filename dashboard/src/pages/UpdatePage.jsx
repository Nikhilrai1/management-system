import React from 'react'
import { useLocation } from 'react-router-dom';
import Profile from '../components/Profile';
import UpdateProfile from '../components/UpdateProfile';

const UpdatePage = () => {
    const location = useLocation();
    const profile = location.state.profile;
    console.log(profile)
    return (
        <div>
            <UpdateProfile profile={profile} />
        </div>
    )
}

export default UpdatePage