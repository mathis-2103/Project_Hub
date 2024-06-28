import React, {useState} from 'react';
import {IProfile} from '../../screens/ProfileScreen';
import {Box} from '@chakra-ui/react';
import axios from 'axios';
import {getAuthorizedHeader} from '../../common/auth';
import EditComponent from '../profile/EditComponent';

interface ProfileComponentProperties {
  user: IProfile;
}

function ProfileComponent(props: ProfileComponentProperties) {
  const [isEditingEmail, setEditingEmail] = useState(false);
  const [isEditingPassword, setEditingPassword] = useState(false);


  function handleEmailChange(props: {email: string}): void {
    const email = props.email;
    console.warn(email);
    axios
      .put('/api/update/email', {email}, {headers: getAuthorizedHeader()})
      .then(() => {
        setEditingEmail(false);
      })
      .catch((reason) =>
        console.error('Unable to update email:', reason),
      );
  }

  function handlePasswordChange(props: {password: string, confirmPassword: string}): void {
    const password = props.password;
    const confirmPassword = props.confirmPassword;
    if (password !== confirmPassword)
      alert('Not the same password');
    console.warn(password);
    axios
      .put('/api/update/password', {password}, {headers: getAuthorizedHeader()})
      .then(() => {
        setEditingPassword(false);
      })
      .catch((reason) =>
        alert('Unable to update password:' +  reason),
      );
  }

  return (
    <Box width={'100%'}>
      <EditComponent edit={isEditingEmail} type={'email'} value={props.user.email} onClick={(!isEditingEmail ? () => {setEditingEmail(true)} : (data: {value: string, confirmPassword: string}) => handleEmailChange({email: data.value}))}/>
      {!isEditingPassword && <EditComponent edit={isEditingPassword} type={'name'} value={'*'.repeat(props.user.password_length)} onClick={(!isEditingPassword ? () => {setEditingPassword(true)} : (data: {value: string, confirmPassword: string}) => handlePasswordChange({password: data.value, confirmPassword: data.confirmPassword}))}/>}
      {isEditingPassword && <EditComponent edit={isEditingPassword} type={'password'} value={''} onClick={(!isEditingPassword ? () => {setEditingPassword(true)} : (data: {value: string, confirmPassword: string}) => handlePasswordChange({password: data.value, confirmPassword: data.confirmPassword}))}/>}
    </Box>
  );
}

export default ProfileComponent;
