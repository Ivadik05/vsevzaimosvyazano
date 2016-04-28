import * as React from 'react';
import { browserHistory } from 'react-router';
import { marketType } from '../../../io/types';
import { routeConstants } from '../../../routes';
import * as ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Mobile from '../mobileContent';
let MediaQuery = require('react-responsive');
let styles = require('./style.css');
let animation = require('./animation.css');

export interface IProps {
  productDetail: marketType;
}

class ProductDetail extends React.Component<IProps , {}> {
  constructor(props) {
    super(props);
  }

  public onClose() {
    browserHistory.push(routeConstants.MARKET);
  }

  public render() {
    let productDetail: marketType = this.props.productDetail;
    return (
        <div>
          <MediaQuery maxDeviceWidth={600}>
            <ReactCSSTransitionGroup
                transitionName={animation}
                transitionLeaveTimeout={600}
            >
              {this.props.productDetail ? (
              <div className={styles.overlay} key={productDetail.id}>
                <div className={styles.productDetail}>
                  <button className={styles.closeButton} onClick={this.onClose}>x</button>
                  <div className={styles.productDetailwrap}>
                    <div className={styles.productImg} style={{backgroundImage: `url(${productDetail.photo})`}}>
                    </div>
                    <div className={styles.productDescription}>
                      {productDetail.title}
                    </div>
                  </div>
                </div>
              </div>) : null}
            </ReactCSSTransitionGroup>
          </MediaQuery>
          <MediaQuery minDeviceWidth={600}>
            {this.props.productDetail ? (
            <div className={styles.overlay} key={productDetail.id}>
              <div className={styles.productDetail}>
                <button className={styles.closeButton} onClick={this.onClose}>x</button>
                <div className={styles.productDetailwrap}>
                  <div className={styles.productImg} style={{backgroundImage: `url(${productDetail.photo})`}}>
                  </div>
                  <div className={styles.productDescription}>
                    {productDetail.title}
                  </div>
                </div>
              </div>
            </div>) : null}
          </MediaQuery>
        </div>
    );
  }
}

export default ProductDetail;