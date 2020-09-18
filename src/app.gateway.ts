import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
 } from '@nestjs/websockets';

 import { Logger } from '@nestjs/common';

 import { Socket, Server } from 'socket.io';
 
 @WebSocketGateway()
 export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {


  private Sokect: Socket[] = new Array<Socket>();
 
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('AppGateway');
 
 
  afterInit(server: Server) {
    this.logger.log('Init');
  }
 
  handleDisconnect(client: Socket) {
   const index = this.Sokect.findIndex(element => element.id === client.id); 
   this.Sokect.slice(index, 1)
   this.logger.log(`Client disconnected: ${client.id}`);
  }
 
  handleConnection(client: Socket, ...args: any[]) {
   this.Sokect.push(client);
   this.logger.log(`Client connected: ${client.id}`);
  }


  @SubscribeMessage('chatToServer')
  handleMessage(client: Socket, payload: any): void {
    
  console.log(payload)
  
   client.emit('chatToClient', payload[1]);
  }

  @SubscribeMessage('global')
  handleGlobal(client: Socket, payload: string): void {
    
   this.Sokect.forEach(client => {
    return client.emit('global', payload)
   })
  }


 }