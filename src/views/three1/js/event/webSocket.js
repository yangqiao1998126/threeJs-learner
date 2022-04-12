import {Message} from "element-ui";

export class WS {
  constructor(scene,url='ws://localhost:3001', ) {
    this.scene = scene;
    this.url = url;
    this.ws = null;
    this.lockReconnect = false; //重连--避免重复连接
    this.userClose = false; //主动断开连接 不需要重连
    this.init();
  }
  init() {
    try {
      this.ws = new WebSocket(this.url);
      this.ws.onopen = this.onopen.bind(this);
      this.ws.onmessage = this.onmessage.bind(this);
      this.ws.onclose = this.onclose.bind(this);
      this.ws.onerror = this.onerror.bind(this);
    }catch (e) {
      Message.error('websocket连接失败'+e)
    }

  }
  onopen() {
    Message.success('onopen websocket连接成功')
  }

  onmessage(e) {
    Message.success('onmessage 收到消息')
    console.log(e.data);
  }
  onclose() {
    Message.success('onclose 连接被关闭 正在重新连接')
    if(!this.userClose) {
      this.reconnect(this.url);
    }
  }
  onerror(e) {
    Message.error('onerror 连接错误'+e)
  }
  send(data) {
    this.ws.send(data);
  }
  close() {
    if(this.ws) {
      this.userClose = true
      this.ws.close();
    }
  }
  reconnect(url){
    if(this.lockReconnect) return;
    this.lockReconnect = true;
    setTimeout(() => {
      this.lockReconnect = false;
      this.init(url);
    }, 4000);
  }
}
