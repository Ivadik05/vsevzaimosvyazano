import { ITransport } from '../interfaces';
import * as queryString from 'query-string';
import { ITransportOptions } from '../interfaces';
import { IConfig } from '../interfaces';
import * as http from 'http';
import { settings } from '../../settings';

export class NodeTransport implements ITransport {
  private host: string;
  private path: string;
  private port: string;

  constructor(config: IConfig) {
    this.host = config.host;
    this.path = config.path;
    this.port = config.port;
  }

  private getHost() {
    return (this.host);
  }

  private getPath() {
    return this.path || '/';
  }

  private getPort() {
    return this.port;
  }

  public getType() {
    return 'NodeTransmitter';
  }

  private createPathWithQuery(query: Object) {
    let queryParams = queryString.stringify(query);
    return this.getPath() + '?' + queryParams;
  }

  public send(options: ITransportOptions, complete: Function, errorResponse?: Function) {
    const errResponse = errorResponse || function () {};
    let sendOptions = {
      host: this.getHost(),
      hostname: this.getHost(),
      port: this.getPort(),
      path: this.createPathWithQuery(options.query),
      method: options.method || 'GET',
      async: options.async,
      query: options.query || {}
    };
    console.info(
        `send ${sendOptions.host}${sendOptions.port} 
        request query: ${sendOptions.path}`);
    let request = http.get(sendOptions, (res) => {
      let bodyChunks = [];
      res.on('data', function(chunk) {
        bodyChunks.push(chunk);
      }).on('end', function() {
        let body = Buffer.concat(bodyChunks);
        complete(body);
      });
    });

    request.on('error', function(e) {
      errResponse(e);
      console.log('ERROR: ' + e.message);
    });

    request.end();
  }
}

let connectorSettings = settings.connector;
let requestSettings = {
  host: connectorSettings.HOST,
  path: connectorSettings.PATH,
  port: connectorSettings.PORT
};

export const nodeTransport = new NodeTransport(requestSettings);
