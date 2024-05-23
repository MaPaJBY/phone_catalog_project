import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';
import Icon from '../Icon';
import { Icons } from '../../types';

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <Link to="/" className={styles.footer__logo}>
        <img src="/img/Logo.png" alt="logo" />
      </Link>

      <nav className={`${styles['footer-nav']} ${styles.footer__nav}`}>
        <a href="https://github.com/" className={styles['footer-nav__item']}>
          Github
        </a>
        <a href="/" className={styles['footer-nav__item']}>
          Contacts
        </a>
        <a href="/" className={styles['footer-nav__item']}>
          Rights
        </a>
      </nav>

      <div className={styles['top-link']}>
        <p className={styles['top-link__text']}>Back to top</p>
        <button onClick={() => window.scrollTo(0, 0)}>
          <Icon iconId={Icons.ARROW_TOP} />
        </button>
      </div>
    </footer>
  );
};