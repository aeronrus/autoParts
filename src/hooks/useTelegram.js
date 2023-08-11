const tg = window.Telegram.WebApp; //начала надо установить!!!

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
  };
}
