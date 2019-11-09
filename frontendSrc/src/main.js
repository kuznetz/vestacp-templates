import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export let config = null

async function loadConfig () {
  try {
    let response = await fetch('/config.json')
    let newConfig = await response.json()
    return newConfig
  } catch(e) {
    throw 'Failed to load config.json';
  }
}

async function main() {
  config = await loadConfig();
  console.log('config',config)
  new Vue({
    render: h => h(App),
  }).$mount('#app')    
}
main();


