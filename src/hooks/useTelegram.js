const tg = window.Telegram.WebApp; //cначала надо установить!!!

export function useTelegram() {
  const handleClose = () => {
    tg.close();
  };

  const onToggleButton = () => {
    if (tg.MainButton.isVisible) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
    }
  };
  return {
    handleClose,
    onToggleButton,
    tg,
    user: tg.initDataUnsafe?.user,
    queryId: tg.initDataUnsafe?.query_id, //получаем query_Id для отправки на бэкэнд и обмена информацией
  };
}
