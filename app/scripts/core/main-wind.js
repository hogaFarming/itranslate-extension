import { setStyle, isClickOutSide } from './utils'
import { youdaoTranslate } from './service'

export default {
  _container: null,
  _input: null,
  _result: null,
  _btn: null,
  _isPoppingUp: false,
  _init () {
    this._initContainer()

    document.addEventListener('click', event => {
      if (isClickOutSide(this._container, event) && !this._isPoppingUp) {
        this.dismiss()
      }
    }, false)
  },
  _initContainer () {
    const container = this._container = document.createElement('div')
    container.className = 'it-wind'
    container.innerHTML = `
            <div class="it-wind__title">itranslate</div>
            <textarea class="it-wind__input"></textarea>
            <br>
            <button class="it-wind__btn">翻译</button>
            <div class="it-wind__result"></div>
        `
    setStyle(container, {
      display: 'none',
      position: 'absolute',
      padding: '15px',
      border: '1px solid #dddddd',
      background: 'aliceblue'
    })
    document.body.appendChild(container)

    this._input = container.querySelector('.it-wind__input')
    this._result = container.querySelector('.it-wind__result')
    this._btn = container.querySelector('.it-wind__btn')
    this._btn.addEventListener('click', event => {
      const words = this._input.value
      this.translate(words)
    })
  },
  translate (words) {
    this._input.value = words
    this._result.innerHTML = '翻译中...'
    youdaoTranslate(words).then(result => {
      console.log(result)
      if (result.translation) {
        this._result.innerHTML = result.translation.map(text => '<p>' + text + '</p>').join('')
      } else {
        this._result.innerHTML = '无结果'
      }
    }, (err) => {
      console.log('translation request err ', err)
      this._result.innerHTML = '无结果'
    })
  },
  popup ({pageX, pageY}, words) {
    if (!this._container) this._init()
    this._isPoppingUp = true
    setTimeout(() => { this._isPoppingUp = false }, 500)
    setStyle(this._container, {
      display: 'block',
      top: pageY + 3 + 'px',
      left: pageX + 3 + 'px'
    })
    this.translate(words)
  },
  dismiss () {
    if (!this._container) return
    setStyle(this._container, {
      display: 'none'
    })
    this._input.value = ''
  }
}
