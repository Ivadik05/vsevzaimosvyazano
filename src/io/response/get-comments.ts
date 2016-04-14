import { marketType } from '../types';
import { BaseResponse } from './response';

export function prepareComments(nameResponse, payload: Array<Object>): BaseResponse {
  let response = new BaseResponse(nameResponse);
  console.error('!!!!!!payload', payload, '!!!!!!!!!!!!');
  response.setData(payload['comments'].map(item => ({
    id: item['id']
  })));
  return response;
}
