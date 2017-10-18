import { setStyle, isClickOutSide } from './utils'

export default {
  _isPoppingUp: false,
  _clickHandler: null,
  _getElem () {
    if (this._elem) return this._elem
    const elem = this._elem = document.createElement('div')
    elem.innerHTML = '译'
    setStyle(elem, {
      display: 'none',
      position: 'absolute',
      padding: '5px',
      backgroundColor: '#e4f2ff',
      border: '1px solid #9fb8ce',
      cursor: 'pointer'
    })
    elem.addEventListener('click', event => {
      this.dismiss()
      this._clickHandler && this._clickHandler(event)
    })
    document.body.appendChild(elem)

    document.addEventListener('click', event => {
      if (isClickOutSide(this._elem, event) && !this._isPoppingUp) {
        this.dismiss()
      }
    }, false)
    return elem
  },
  popup ({pageX, pageY}, clickCallback) {
    const elem = this._getElem()
    setStyle(elem, {
      display: 'block',
      top: pageY - 5 + 'px',
      left: pageX + 3 + 'px'
    })
    this._clickHandler = clickCallback
    this._isPoppingUp = true
    setTimeout(() => {
      this._isPoppingUp = false
    }, 500)
  },
  dismiss () {
    if (!this._elem) return
    setStyle(this._elem, {
      display: 'none'
    })
  }
}
