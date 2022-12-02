import React from 'react'
import { useLocation } from 'react-router-dom'
import Profile from '../components/Profile'

const ProfilePage = () => {
    const location = useLocation();
    const profile = location.state.profile;
  return (
    <div>
        <Profile profile={profile} />
    </div>
  )
}

export default ProfilePage