import React, { useCallback, useEffect, useState } from 'react';
import './Form.css';
import { useTelegram } from '../../hooks/useTelegram';

const Form = () => {
  const [part, setPart] = useState('');
  const [number, setNumber] = useState('');
  const [account, setAccount] = useState('');
  const [subject, setSubject] = useState('physical');
  const { tg } = useTelegram(); //объект для работы с тлг

  const onSendData = useCallback(() => {
    const data = {
      part,
      number,
      account,
      subject,
    };
    tg.sendData(JSON.stringify(data)); //с помощью sendData можем взаимодействовать с нашим ботом, но метод только для keyboard-кнопок, а не для inline_keyboard
  }, [part, street, subject]);

  useEffect(() => {
    tg.onEvent('mainButtonClicked', onSendData);
    return () => {
      tg.offEvent('mainButtonClicked', onSendData);
    };
  }, [onSendData]);

  useEffect(() => {
    tg.MainButton.setParams({
      //меняем данные в main кнопке, которые созданы по умолчанию
      text: 'Узнать стоимость',
    });
  }, []);

  useEffect(() => {
    if (!part || !number || !account) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
    }
  }, [part, street]);

  const onChangePart = (e) => {
    setPart(e.target.value);
  };
  const onChangeNumber = (e) => {
    setNumber(e.target.value);
  };
  const onChangeAccount = (e) => {
    setAccount(e.target.value);
  };

  const onChangeSubject = (e) => {
    setSubject(e.target.value);
  };

  return (
    <div className={'form'}>
      <h3>Введите ваши данные</h3>
      <input
        className={'input'}
        type="text"
        placeholder={'Какую запчасть вы ищете?'}
        value={part}
        onChange={onChangePart}
      />
      <input
        className={'input'}
        type="text"
        placeholder={'Оставьте свой номер телефона для связи'}
        value={number}
        onChange={onChangeNumber}
      />
      <input
        className={'input'}
        type="text"
        placeholder={'Укажите свой ник в телеграмме'}
        value={account}
        onChange={onChangeAccount}
      />

      <select value={subject} onChange={onChangeSubject} className={'select'}>
        <option value={'physical'}>Физ. лицо</option>
        <option value={'legal'}>Юр. лицо</option>
      </select>
    </div>
  );
};

export default Form;