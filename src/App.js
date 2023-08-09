import './App.css';
import { useEffect } from 'react';

const tg = window.Telegram.WebApp; //начала надо установить!!!

function App() {
  useEffect(() => {
    tg.ready(); //метод сообщает, что приложение проинициализировалось и его можно отрисовывать
  }, []);

  const handleClose = () => {
    tg.close();
  };
  return (
    <div className="App">
      Реакт-апп
      <button onClick={handleClose}>Закрыть</button>
    </div>
  );
}

export default App;
