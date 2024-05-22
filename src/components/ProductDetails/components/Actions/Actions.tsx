export const AVAILABLE_COLORS: { [key: string]: string } = {
  gold: '#fad8bd',
  spacegray: '#4d4c4a',
  midnightgreen: '#49534b',
  silver: '#e9e9e1',
  black: '#25262a',
  rosegold: '#f1c8c2',
  green: '#b7e4d0',
  yellow: '#ffe98b',
  white: '#fffaf7',
  purple: '#d4d1dc',
  red: '#cd273f',
  coral: '#ff6451',
};


import { Link } from 'react-router-dom';
import cn from 'classnames';
import { IProductDetails, Icons } from '../../../../types';
import style from './Actions.module.scss';
import { useProductsContext } from '../../../../context/ProductsContext';
import Button from '../../../Button';
import getProductLink from '../../../../utils/getProductLink';

interface Props {
  product: IProductDetails;
}

export default function Description({ product }: Props) {
  const {
    name,
    capacityAvailable,
    colorsAvailable,
    priceDiscount,
    priceRegular,
    screen,
    resolution,
    processor,
    ram,
    capacity,
    id,
    images,
  } = product;

  const infoItems = [
    {
      title: 'Screen',
      value: screen,
    },
    {
      title: 'Resolution',
      value: resolution,
    },
    {
      title: 'Processor',
      value: processor,
    },
    {
      title: 'Ram',
      value: ram,
    },
  ];

  const activeColor = id.split('-').pop();
  const { isItemInCart, addItem } = useProductsContext();

  const isProductInCard = isItemInCart(id);
  const cartProduct = {
    id,
    name,
    image: images[0] || '',
    price: priceDiscount,
  };

  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        <div className={style.colors}>
          <span className={style.label}>Available colors</span>
          <ul className={style.list}>
            {colorsAvailable.map((color) => (
              <li className={style.item}>
                <Link
                  to={`/phones/${getProductLink({
                    id,
                    newPart: color,
                  })}`}
                  className={cn(style.colorsLink, {
                    [style.activeLink]: color === activeColor,
                  })}
                  style={{ backgroundColor: AVAILABLE_COLORS[color] || color }}
                />
              </li>
            ))}
          </ul>
        </div>
        <div className={style.capacity}>
          <span className={style.label}>Select capacity</span>
          <ul className={style.list}>
            {capacityAvailable.map((capacityItem) => (
              <li className={style.item}>
                <Link
                  to={`/phones/${getProductLink({
                    id,
                    newPart: capacityItem.toLowerCase(),
                    index: -2,
                  })}`}
                >
                  <Button
                    title={capacityItem}
                    type={capacityItem === capacity ? 'primary' : 'secondary'}
                    className={cn(style.capacityButton, {
                      [style.capacityButtonActive]: capacityItem === capacity,
                    })}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className={style.price}>
          <span>{`$${priceDiscount}`}</span>
          <span className={style.priceRegular}>{`$${priceRegular}`}</span>
        </div>
        <div className={style.actions}>
          <Button
            onClick={()=>addItem(cartProduct)}
            isSelected={isProductInCard}
            className={style.addToCard}
            title={isProductInCard ? 'Added to cart' : 'Add to cart'}
          />
          <Button
            onClick={()=>{}}
            type="secondary"
            className={style.addToFavorite}
            icon={Icons.HEART}
          />
        </div>
        <ul>
          {infoItems.map(({ title, value }) => (
            <li className={style.infoItem} key={value}>
              <span className={style.infoTitle}>{title}</span>
              <span>{value}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};