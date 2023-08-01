import React, { useEffect, useState } from 'react';
import styles from './Navbar.module.scss';
import '../styles.scss';
import LogoSVG from '../assets/images/RSK_Bank_Logo1.svg';
import AvatarSVG from '../assets/images/avatar.svg';
import UserAvatarSVG from '../assets/images/UserAvatar.svg';
import ChatSVG from '../assets/images/chatbubble-ellipses-outline.svg';
import HomeSVG from '../assets/images/octicon_home-24.svg';
import SettingsSVG from '../assets/images/carbon_user-settings.svg';
import Settings from '../assets/images/solar_settings-linear.svg';

import { Link } from 'react-router-dom';
import { Ipage } from 'src/common/types/navbar';
import { HamburgerMenu } from './HamburgerMenu';
import './Hamburger.scss';
import classNames from 'classnames';
import Dropdown from './modals/dropmenu/DropMenu';
import { IDropPage } from 'src/common/types/dropdown';
import { useAuthContext } from 'src/context/AuthContext';

const Navbar: React.FC = () => {
  const [isActive, setActive] = useState(false);

  const handleToggle = () => {
    setActive((prevState) => !prevState);
  };

  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const { logout, user, getTCPConfig, tcp, changeTCP } = useAuthContext();


  const handleToggleDropDown = () => {
    setIsDropDownOpen((prevState) => !prevState);
  };

  const handleClick = () => {
    handleToggle();
    handleToggleDropDown();
  };

  useEffect(() => {
    getTCPConfig();
  }, [])

  const [ tcpChange, setTcpChange ] = useState(false);
  const [ newTcp, setNewTcp ] = useState('');

  //rgba(248, 248, 248, 1)

  const pages: Ipage[] = [
    {
      icon: <img src={HomeSVG} alt="" />,
      title: 'Главная',
      link: '/',
    },
    {
      icon: <img src={UserAvatarSVG} alt="" />,
      title: 'Пользователи СЭО',
      link: '/admin/users',
    },
    {
      icon: <img src={SettingsSVG} alt="" />,
      title: 'Настройка очередей',
      link: '/admin/queue-setttings',
    },
  ];

  const dropPages: IDropPage[] = [
    {
      title: 'База данных',
      link: '/admin/database',
    },
    {
      title: 'Протоколы',
      link: '/admin/protocol',
    },
    {
      title: 'Статистика',
      link: '/admin/statistic',
    },
    {
      title: 'Календарь',
      link: '/admin/calendar',
    },
    {
      title: 'Выход',
      link: '/auth',
    },
  ];

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const data = {
      tcp_port: newTcp
    }
    changeTCP(data);
    setTcpChange(false);
  }

  return (
    <header>
      <div className={styles.container}>
        <div className={styles.header_nav}>
          <div className={styles.header__nav__start}>
            <div className={styles.header_logo}>
              <img src={LogoSVG} alt="" />
            </div>
            <div className={styles.chat}>
              Рабочий чат
              <img src={ChatSVG} alt="" className={styles.chatSVG} />
            </div>
            <div className={styles.chat}>
              Порт TCP: { tcpChange ? (
                <form onSubmit={handleSubmit} >
                  <input type="text" value={newTcp} onChange={(e) => setNewTcp(e.target.value)} placeholder='Введите новый порт' />
                  <button>Сохранить</button>
                </form>
              ) : (<span style={{ fontSize: "17px", fontWeight: "700", color: "blue" }} >{ tcp?.tcp_port }</span>) }
              <img src={Settings} style={{ width: "25px", height: "25px" }} onClick={() => setTcpChange(true)} />
            </div>
          </div>
          <div className={styles.user}>
            <div className={styles.user_name}>Администратор</div>
            <div className={styles.user_photo}>
              <img src={AvatarSVG} alt="" />
              {/*photo_URL*/}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.navigation}>
        <div className={styles.nav}>
          {pages.map((page) => (
            <ul className={styles.nav_items} key={page.title}>
              <li className={styles.nav_link_item}>
                <Link to={page.link}>
                  <button className={styles.nav_link_item}>
                    {page.icon}
                    {page.title}
                  </button>
                </Link>
              </li>
            </ul>
          ))}
          <div className={styles.burger_menu}>
            <HamburgerMenu
              color="white"
              isActive={isActive}
              onClick={handleClick}
            />
            {isDropDownOpen && (
              <Dropdown className={styles.drop__menu} isOpen={isDropDownOpen}>
                {dropPages.map((page) => (
                  <ul className={styles.drop__catalog} key={page.title}>
                    <Link to={page.link}>
                      <li
                        onClick={() => logout()}
                        className={classNames(styles.drop__catalog__item, {
                          [styles.logout]: page.title === 'Выход',
                        })}
                      >
                        {page.title}
                      </li>
                    </Link>
                  </ul>
                ))}
              </Dropdown>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
