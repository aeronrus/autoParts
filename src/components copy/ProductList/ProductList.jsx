import React, { useState } from 'react';
import './ProductList.css';
import ProductItem from '../ProductItem/ProductItem';
import { useTelegram } from '../../hooks/useTelegram';
import { useCallback, useEffect } from 'react';

const products = [
  { id: '1', title: 'рЕЙКА', price: 5000, description: 'Синего цвета, прямые' },
  { id: '2', title: 'Насос', price: 12000, description: 'Зеленого цвета, теплая' },
  { id: '3', title: 'Прокладки 2', price: 5000, description: 'Синего цвета, прямые' },
  { id: '4', title: 'Гур 8', price: 122, description: 'Зеленого цвета, теплая' },
  { id: '5', title: 'Джинсы 3', price: 5000, description: 'Синего цвета, прямые' },
  { id: '6', title: 'Куртка 7', price: 600, description: 'Зеленого цвета, теплая' },
  { id: '7', title: 'Джинсы 4', price: 5500, description: 'Синего цвета, прямые' },
  { id: '8', title: 'Куртка 5', price: 12000, description: 'Зеленого цвета, теплая' },
];

const getTotalPrice = (items = []) => {
  return items.reduce((acc, item) => {
    return (acc += item.price);
  }, 0);
};

const ProductList = () => {
  const [addedItems, setAddedItems] = useState([]);
  const { tg, queryId } = useTelegram();

  const onSendData = useCallback(() => {
    //нажали купить=>отправили запрос на сервер
    const data = {
      //все через useCallback, чтобы не тратить память
      products: addedItems,
      totalPrice: getTotalPrice(addedItems),
      queryId,
    };
    fetch('http://85.119.146.179:8000/web-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }, [addedItems]); //обновляем(пересоздаем, но НЕ ВЫЗЫВАЕМ функцию только при изменении списка добавленных продуктов)

  useEffect(() => {
    tg.onEvent('mainButtonClicked', onSendData);
    return () => {
      tg.offEvent('mainButtonClicked', onSendData);
    };
  }, [onSendData]);

  const onAdd = (product) => {
    const alreadyAdded = addedItems.find((item) => item.id === product.id);
    let newItems = [];

    if (alreadyAdded) {
      newItems = addedItems.filter((item) => item.id !== product.id);
    } else {
      newItems = [...addedItems, product];
    }

    setAddedItems(newItems);

    if (newItems.length === 0) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
      tg.MainButton.setParams({
        //меняем кнопку на купить, если корзина не пустая
        text: `Купить ${getTotalPrice(newItems)}`, //показываем на кнопке общую стоимость товара
      });
    }
  };

  return (
    <div className={'list'}>
      {products.map((item) => (
        <ProductItem product={item} onAdd={onAdd} className={'item'} />
      ))}
    </div>
  );
};

export default ProductList;
