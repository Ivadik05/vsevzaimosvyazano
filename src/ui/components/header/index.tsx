import * as React from 'react';
import { Logo } from '../logo';
let styles = require('./style.css');

export interface IProps extends React.Props<Header> {
}

export default class Header extends React.Component<IProps, void> {
  public render() {
    return (
        <header className={styles.header}>
          <Logo
            src='https://cdn.colorlib.com/wp/wp-content/uploads/sites/2/2014/02/Olympic-logo.png'
          />
        </header>
    );
  }
};
