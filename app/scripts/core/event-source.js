export default {
  _subscribers: {},
  init () {
    document.addEventListener('mouseup', event => {
      const selObj = document.getSelection()
      const str = selObj.toString()
      if (str) {
        this.dispatch('words', {
          words: str,
          nativeEvent: event
        })
      }
    }, false)
  },
  dispatch (eventType, payload) {
    console.log('[dispatch] eventType: ', eventType, 'payload: ', payload)
    let subscribers = this._subscribers[eventType] || []
    subscribers.forEach(fn => fn({type: eventType, payload}))
  },
  subscribe (eventType, callback) {
    let subscribers = this._subscribers[eventType]
    if (!subscribers) {
      subscribers = this._subscribers[eventType] = []
    }
    subscribers.push(callback)
  }
}
