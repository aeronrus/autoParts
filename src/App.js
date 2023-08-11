import './App.css';
import { useEffect } from 'react';
import { tg, useTelegram } from './hooks/useTelegram';
import Form from './components copy/Form/Form';
import Header from './components copy/Header/Header';
import { Routes, Route, Link } from 'react-router-dom';
import ProductList from './components copy/ProductList/ProductList';

function App() {
  const { tg, onToggleButton, handleClose } = useTelegram();
  useEffect(() => {
    tg.ready(); //метод сообщает, что приложение проинициализировалось и его можно отрисовывать
  }, []);

  return (
    <div className="App">
      <Header />
      <Link to="/form">Form</Link>
      <h1>Change</h1>
      <Routes>
        <Route index element={<ProductList />} />
        <Route path={'form'} element={<Form />} />
      </Routes>
      <button onClick={onToggleButton}>toggle</button>
      <button onClick={handleClose}>Закрыть</button>
    </div>
  );
}
//при нажатии на кнопку будет появлятьс или исчезать mainbutton-основная кнопка взаимодействия с ботом

export default App;
