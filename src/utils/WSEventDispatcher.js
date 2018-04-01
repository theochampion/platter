export default class WSEventDispatcher {
  constructor(url) {
    this.ws = new WebSocket(url);
    this.eventHandlers = new Map();

    this.ws.onmessage = event => {
      const json = JSON.parse(event.data);
      this.dispatch(json.event, json.data);
    };

    this.ws.onopen = this.dispatch("open", null);
    this.ws.onerror = this.dispatch("error", null);
    this.ws.onclose = this.dispatch("close", null);
  }

  bind(eventName, eventHandler) {
    this.eventHandlers.set(eventName, eventHandler);
  }

  send(eventName, eventData) {
    this.ws.send(JSON.stringify({ event: eventName, data: eventData }));
  }

  dispatch(eventName, eventData) {
    if (this.eventHandlers.has(eventName))
      this.eventHandlers.get(eventName)(eventData);
  }
}
