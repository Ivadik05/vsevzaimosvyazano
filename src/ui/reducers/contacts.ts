import { events } from '../../events';
import { pagesType } from '../../io/types';
import { connector } from '../../constants';
let objectAssign = require('object-assign');

let initialState = {
  contentText: ''
};

export type contactsType = {
  contentText: string;
};

export default function contacts<Reducer>(state: contactsType = initialState, action) {
  switch (action.type) {
    case events.saver.PAGES:
      return objectAssign({}, state, {
        contentText: (action.payload.id === connector.PAGE_CONTACTS) ?
            action.payload.text :
            state.contentText
      });
    default:
      return state;
  }
}
