import React, {CSSProperties, useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {IconProp} from '@fortawesome/fontawesome-svg-core';
import './ServiceCard.css';

interface IServicesCardProperties {
  name: string;
  color: string;
  icon: IconProp;
  callback: (name: string) => void;
  disabled?: boolean;
}

function ServiceCard(props: IServicesCardProperties): React.JSX.Element {
  const {name, color, icon, callback, disabled} = props;
  const [isHovered, setIsHovered] = useState(false);

  function onClick() {
    if (disabled) return;
    callback(name);
  }

  const cardStyle: CSSProperties = {
    background: color,
    filter: disabled ? 'brightness(.5)' : 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transform: isHovered ? 'scale(1.1)' : 'scale(1)',
    transition: 'transform 0.3s ease',
  };

  return (
    <div onClick={onClick} onKeyDown={onClick} className={'service-card'} style={cardStyle} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <FontAwesomeIcon icon={icon} size={'3x'}/>
      <p>{name}</p>
    </div>
  );
}

export default ServiceCard;
