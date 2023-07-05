import React, { FC, useRef } from 'react';
import classNames from 'classnames';
import { CSSTransition } from 'react-transition-group';
import { TRANSITION } from 'src/utils/const';
import styles from './DropMenu.module.scss';
import { IDropdownProps } from 'src/common/types/dropdown';

const Dropdown: FC<IDropdownProps> = ({ className, children, isOpen }) => {
  const nodeRef = useRef(null);

  return (
    <CSSTransition
      classNames={className}
      in={isOpen}
      nodeRef={nodeRef}
      timeout={TRANSITION}
      unmountOnExit
    >
      <div ref={nodeRef}>
        <div className={classNames(styles.dropdown)}>{children}</div>
      </div>
    </CSSTransition>
  );
};

export default Dropdown;
