import { events } from '../../events';
import { marketType, albumsType, shoppingCart  } from '../../io/types';
import { connector } from '../../constants';


let initialState = {
  albums: [],
  data: [],
  contentText: '',
  successOrder: false,
  shoppingCart: {
    sum: 0,
    count: 0,
    productsSelected: []
  }
};

type market = {
  albums: Array<albumsType>;
  data: Array<marketType>;
  successOrder: boolean;
  contentText: string;
  shoppingCart: shoppingCart;
};

export default function market<Reducer>(state: market = initialState, action) {
  switch (action.type) {
    case events.market.DRAW_MARKETS:
      return Object.assign({}, state, {
        data: action.payload
      });
    case events.market.DRAW_SHOPPING_CART:
      return Object.assign({}, state, {
        shoppingCart: action.payload
      });
    case events.market.CLEAR_SHOPPING_CART:
      return Object.assign({}, state, {
        shoppingCart: initialState.shoppingCart,
        successOrder: false
      });
    case events.market.SUCCESS_ORDER:
      return Object.assign({}, state, {
        successOrder: true,
        shoppingCart: initialState.shoppingCart
      });
    case events.saver.MARKET_ALBUMS:
      return Object.assign({}, state, {
        albums: action.payload['albums'],
        data: action.payload['products']
      });
    case events.saver.PAGES:
      return Object.assign({}, state, {
        contentText: (action.payload.id === connector.PAGE_MARKET) ?
            action.payload.text :
            state.contentText
      });
    default:
      return state;
  }
}
