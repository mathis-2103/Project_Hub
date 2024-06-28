import React, {CSSProperties, useEffect, useState} from 'react';
import NavigationBar from '../components/navigation/NavBarComponent';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import ProfileComponent from '../components/administrator/ProfileComponent';
import {
  getAuthorizedHeader,
  logout,
} from '../common/auth';
import {Box} from '@chakra-ui/react';
import MapSiteComponent from '../components/MapSiteComponent';
import BackButton from '../components/administrator/BackButton';

interface IProfile {
  email: string;
  password: string;
  password_length: number;
}

interface ProfileContentProperties {
  profile: IProfile;
}


function ProfileContent(props: ProfileContentProperties) {
  const {profile} = props;
  const navigate = useNavigate();

  if (profile === null) {
    return (
      <Box width={'40%'} marginX={'auto'} marginY={'50px'} textAlign={'center'}>
        <p>Loading...</p>
      </Box>
    );
  } else {
    return (
      <Box width={['90%', '70%', '50%', '40%']} marginX="auto" marginY="50px">
        <ProfileComponent user={profile}/>
        <button
          type="submit"
          onClick={() => logout(navigate)}
          className="buttonStyle"
        >
          Logout
        </button>
      </Box>
    );
  }
}

function ProfileScreen() {
  const titleStyle: CSSProperties = {
    margin: '25px 0',
    textAlign: 'center',
    fontSize: 35,
    fontWeight: 'bold',
  };

  const [profile, setProfile] = useState(null as unknown as IProfile);

  async function updateUserData() {
    const response = await axios.get('/api/me', {
      headers: getAuthorizedHeader(),
    });

    setProfile(response.data);
  }

  useEffect(() => {
    updateUserData()
      .catch(reason => console.warn(reason));
  }, []);

  return (
    <Box>
      <NavigationBar/>
      <Box paddingTop={"100px"} minHeight={window.innerHeight - 300} alignItems={'center'}>
        <BackButton/>
        <h6 style={titleStyle}>My Profile</h6>
        <ProfileContent profile={profile}/>
      </Box>
      <MapSiteComponent/>
    </Box>
  );
}

export type {IProfile};
export default ProfileScreen;
