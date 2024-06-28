import React, {useState} from 'react';
import {Box} from '@chakra-ui/react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPencil} from '@fortawesome/free-solid-svg-icons';

interface EditButtonProps {
  edit: boolean,
  type: string
  value: string,
  onClick: (data: {value: string, confirmPassword: string}) => void,
}

function EditComponent(props: EditButtonProps) {
  const [value, setValue] = useState(props.value);
  const [confirmPassword, setConfirmPassword] = useState('');

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const val = event.target.value;
    setValue(val);
  }

  function handleInputPasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
    const val = event.target.value;
    setConfirmPassword(val);
  }

  return (
    <Box display="flex" width={"100%"}>
      <input
        type={props.type}
        disabled={!props.edit}
        value={value}
        style={{marginRight: '8px', height: '100%'}}
        onChange={handleInputChange}
        className={'inputStyle'}
        placeholder="New password"
      />
      {props.edit && props.type === 'password' && <input
        type={props.type}
        disabled={!props.edit}
        value={confirmPassword}
        style={{marginRight: '8px', height: '100%'}}
        onChange={handleInputPasswordChange}
        className={'inputStyle'}
        placeholder="Confirm new password"
      />}
      <Box width={'100px'}>
        <button
          className="buttonStyle"
          onClick={() => props.onClick({value: value, confirmPassword: confirmPassword})}
        >
          {!props.edit ? <FontAwesomeIcon icon={faPencil}/> : <span>Save</span>}
        </button>
      </Box>
    </Box>
  )
}

export default EditComponent;
