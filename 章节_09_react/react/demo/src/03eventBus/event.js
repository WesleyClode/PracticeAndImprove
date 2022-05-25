import { EventEmitter } from 'events'

// 导入事件总线，利用这个对象进行发射和监听事件
const eventBus = new EventEmitter()
export default eventBus