import UserProfile from '@/Component/ProfilePage/UserProfile';
import ValidUser from '@/ProtectRoute/ValidUser';

import React from 'react';

const Profile = () => {
    return (
        <div>
            <ValidUser>
                <UserProfile></UserProfile>
            </ValidUser>
        </div>
    );
};

export default Profile;