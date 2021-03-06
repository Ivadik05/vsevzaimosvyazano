import { marketType } from '../types';
import { BaseResponse } from './response';

export function prepareMarket(payload: Array<Object>): Array<marketType> {
  if (payload['items']) {
    payload = payload['items'];
  } else {
    payload.splice(0, 1).join();
  }
  return payload.map(item => ({
    id: item['id'],
    ownerId: item['owner_id'],
    albumId: '',
    title: item['title'],
    description: item['description'],
    priceNum: parseFloat(item['price']['text']),
    price: item['price']['text'],
    category: item['category'],
    date: new Date(item['date']),
    preview_photo: item['photos'] ? item['photos'][0]['photo_604'] : '',
    photo: item['photos'] ? item['photos'][0]['photo_807'] : '',
    photos: item['photos'] ? item['photos'].map(item => item['photo_807']) : ''
  }));
}
