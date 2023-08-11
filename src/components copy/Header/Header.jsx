import React from 'react';
import Button from '../Button/Button';
import './Header.css';
import { useTelegram } from '../../hooks/useTelegram';

const Header = () => {
  const { user, handleClose } = useTelegram();

  return (
    <div className={'header'}>
      <Button onClick={handleClose}>Закрыть</Button>
      <span className={'username'}>{user?.username}</span>
    </div>
  );
};

export default Header;
