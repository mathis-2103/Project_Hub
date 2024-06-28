import React, {useState} from 'react';
import {Flex} from '@chakra-ui/react';
import '../../../theme/index.css';

interface CustomTimePickerProps {
  value: string | null;
  onChange: (value: string) => void;
}

const CustomTimePicker: React.FC<CustomTimePickerProps> = ({value, onChange}) => {
  const [editedValue, setEditedValue] = useState(value);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedValue(e.target.value);
  };

  return (
    <Flex width={'150px'}>
      <input
        className={'inputStyle'}
        value={editedValue || ''}
        onChange={handleInputChange}
        color="#E5E7E6"
      />
    </Flex>
  );
};

export default CustomTimePicker;
