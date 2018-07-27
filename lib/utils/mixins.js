export const withConfig = (base, initialConfig) => class extends base {
  constructor (props) {
    super(props)
    this.config = initialConfig
  }
}
