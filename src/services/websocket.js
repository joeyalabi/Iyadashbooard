export class IyapaysWebSocket {
  constructor(url) {
    this.socket = new WebSocket(url)
    this.listeners = new Map()

    this.socket.onmessage = (event) => {
      const { type, data } = JSON.parse(event.data)
      const handlers = this.listeners.get(type) || []
      handlers.forEach(handler => handler(data))
    }
  }

  subscribe(type, callback) {
    if (!this.listeners.has(type)) {
      this.listeners.set(type, [])
    }
    this.listeners.get(type).push(callback)
  }

  unsubscribe(type, callback) {
    const handlers = this.listeners.get(type) || []
    this.listeners.set(type, handlers.filter(handler => handler !== callback))
  }
}
