import {Message} from "element-ui";
import {CatmullRomCurve3, Vector3} from "three";

let vector = (x, y, z) => new Vector3(x, y, z)

export class WS {
  wsCurveArr = [vector(20, 0, 60)]
  wsCurve = new CatmullRomCurve3(this.wsCurveArr)
  progress = 0

  constructor(engine, url = 'ws://127.0.0.1:3001',) {
    this.engine = engine;
    this.scene = engine.scene;
    this.url = url;
    this.ws = null;
    this.lockReconnect = false; //重连--避免重复连接
    this.userClose = false; //主动断开连接 不需要重连
    this.init();
    this.engine.wsChacheEvent = this.handleChache.bind(this)
  }

  handleChache() {
    if (this.wsCurveArr && (this.wsCurveArr.length > 1)) {
      this.progress = (this.progress * 1000 + 0.006 * 1000) / 1000;
      if (this.progress >= 1) {
        //this.progress = 1;
      } else {
        let {x, y, z} = this.wsCurve.getPoint(this.progress);
        let lookAt = this.wsCurve.getPoint(this.progress + 0.003);
        this.engine.wsObj.wsChache.lookAt(lookAt.x, lookAt.y, lookAt.z);
        this.engine.wsObj.wsChache.position.set(x, y, z);
      }

    }
  }

  init() {
    try {

      this.ws = new WebSocket(this.url);

      this.ws.onopen = this.onopen.bind(this);
      this.ws.onmessage = this.onmessage.bind(this);
      this.ws.onclose = this.onclose.bind(this);
      this.ws.onerror = this.onerror.bind(this);

    } catch (e) {
      Message.error('websocket连接失败' + e)
      this.engine.wsConnecet = false
    }

  }

  onopen() {
    this.engine.wsConnecet = true
    Message.success('onopen websocket连接成功')
  }

  onmessage(e) {
    Message.success('onmessage 收到消息 ' +  e.data)
    console.log(e.data);
    let [x1, y1, z1] = JSON.parse(e.data);
    if (!this.wsCurveArr.some(({x, y, z}) => x1 === x && y1 === y && z1 === z)) {
      if(this.progress >= 1){
        this.progress = 0
      }
      if(this.wsCurveArr.length ===2){
        this.wsCurveArr.shift()
      }
      this.wsCurveArr.push(
        vector(x1, y1, z1),
      )
      this.wsCurve = new CatmullRomCurve3(this.wsCurveArr)
    }
  }

  onclose() {
    Message({
      message: 'onclose  正在重新连接...',
      type: 'warning',
      duration:2500
    })
    if (!this.userClose) {
      this.reconnect(this.url);
    }
  }

  onerror(e) {
    Message({
      message: 'onerror  websocket连接失败 '+e.target.url,
      type: 'error',
      duration: 1500
    });

  }

  send(data) {
    this.ws.send(data);
  }

  close() {
    if (this.ws) {
      this.userClose = true
      this.ws.close();
    }
  }

  reconnect(url) {
    if (this.lockReconnect) return;
    this.lockReconnect = true;
    setTimeout(() => {
      this.lockReconnect = false;
      this.init(url);
    }, 4000);
  }
}
