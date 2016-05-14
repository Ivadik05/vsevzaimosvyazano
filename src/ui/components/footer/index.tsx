import * as React from 'react';
import { Icon, iconList } from '../icon';
let styles = require('./style.css');

export interface IProps extends React.Props<Footer> {
  isShopCart: boolean;
}

export default class Footer extends React.Component<IProps, void> {
  public render() {
    return (
        <footer className={styles.footer}>
          {!this.props.isShopCart ?
          <div className={styles.footerSocial}>
            <a href='https://www.instagram.com/vse_vzaimosvyazano/' target='_blank' className={styles.footerLink}>
              <Icon params={iconList.iconInsta}></Icon>
            </a>
            <a href='http://vk.com/vse_vzaimosvyazano' target='_blank' className={styles.footerLink}>
              <Icon params={iconList.iconVK}></Icon>
            </a>
          </div> : null}
        </footer>
    );
  }
};
