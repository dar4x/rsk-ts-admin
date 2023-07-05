import React, { FC } from 'react';
import { IHamburgerProps } from 'src/common/types/hamburger';
import './Hamburger.scss';
import classNames from 'classnames';

enum HamburgerColor {
  BLACK = 'black',
  WHITE = 'white',
}

export const HamburgerMenu: FC<IHamburgerProps> = ({
  className,
  color,
  isActive,
  onClick,
  children,
}) => {
  return (
    <div className={classNames('hamburger', className)} onClick={onClick}>
      <div
        className={classNames('burger', {
          burger__black: color === HamburgerColor.BLACK,
          burger__white: color === HamburgerColor.WHITE,
          burger__active: isActive,
        })}
      >
        {children}
      </div>
    </div>
  );
};
