import React from 'react';
import Button from 'components/Button';
import Link from 'components/Link';
import LogoImage from 'assets/images/logo.svg';

import styles from './Start.scss';

const Start = () => {
  return (
    <div className={styles.home}>
      <h1 className="heading-1 full-width t-quicksand t-white">
        Welcome to
        <br />
        Syscoin Wallet
      </h1>
      <img src={`/${LogoImage}`} className={styles.logo} alt="syscoin" />
      <Button
        type="submit"
        theme="secondary"
        variant={styles.started}
        linkTo="/create/pass"
      >
        Get started
      </Button>
      <Link color="secondary" to="/import">
        Import using wallet seed phrase
      </Link>
    </div>
  );
};

export default Start;
