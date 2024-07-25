import components from './components'

const materiel = {}
const schemas = {}

const install = (Vue) => {
  Object.keys(components).forEach((key) => {
    Vue.component(key, components[key])
  })
}

components.install = install

export { materiel, schemas, components as default }