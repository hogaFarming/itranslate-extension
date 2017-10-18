// Enable chromereload by uncommenting this line:
// import 'chromereload/devonly'
import es from './core/event-source'
import trigger from './core/trigger'
import mainWindow from './core/main-wind'
import { pageXYFromEvent } from './core/utils'

init()

function init () {
  es.init()
  es.subscribe('words', ({payload: {words, nativeEvent}}) => {
    trigger.popup(pageXYFromEvent(nativeEvent), function onClick (clickEvent) {
      es.dispatch('translate', {words, nativeEvent})
    })
  })
  es.subscribe('translate', ({payload: {words, nativeEvent}}) => {
    mainWindow.popup(pageXYFromEvent(nativeEvent), words)
  })
  es.subscribe('cancel', event => {
    // 隐藏按钮 & 窗口
    trigger.dismiss()
    mainWindow.dismiss()
  })
}
