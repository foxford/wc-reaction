import {shim} from 'map-tojson'
import { html, LitElement, classString } from '@polymer/lit-element'
import { withStyle } from '@netology-group/wc-utils/lib/mixins/mixins'
import Emoji from 'node-emoji/lib/emoji.js' // eslint-disable-line import/extensions

import styles from './reaction-list.css'

export class Reactions extends LitElement {
  static get properties () {
    return {
      config: Object,
      direction: String,
      displayname: String,
      showcount: Boolean,
      showall: Boolean,
    }
  }

  constructor (props) {
    super(props)

    this.emoji = Emoji

    this._boundedClick = this._handleClick.bind(this)
    this.config = new Map()
    this.displayname = 'reactions'
    this.showall = false
    this.showcount = false
  }

  _renderIcon (data) {
    return data.icon ? html`<img src="${data.icon}" />` : this.emoji.get(data.name)
  }

  _handleClick (e) {
    this.dispatchEvent(new CustomEvent(`${this.displayname}-toggle`, { detail: { reaction: e.currentTarget.name } }))
  }

  _renderActions () {
    return ((() => {shim(); return this.config.toJSON})())().map((...argv) => this._renderReaction(...argv));
  }

  _renderReaction ([k, v]) {
    const count = Number(v.count || 0)
    const shouldRender = count || this.showall
    const shouldCount = (count > 0) && this.showcount

    return !shouldRender
      ? null
      : html`
        <div class="icon" name=${k} on-click=${this._boundedClick}>
          <span>${this._renderIcon(v)}</span>
          ${shouldCount ? html`<span class="count">${count}</span>` : null}
        </div>
      `
  }

  _configure (config) {
    if (!(config instanceof Map)) throw new TypeError('Wrong configuration')
    const data = new Map(config)

    if (config !== data) this.config = data
  }

  _render (props) {
    const { direction = 'row' } = props

    return html`
      <div class$=${classString({ icons: true, vertical: direction === 'column' })}>
        ${this._renderActions()}
      </div>
    `
  }
}
const ReactionList = withStyle(Reactions, styles)

export default ReactionList

export { ReactionList, styles }
