import {config} from './main'

let api = {
  token:null,

  async serverHttp (url, params) {
    console.log('serverHttp', url, params)
    let response = await fetch(config.address + url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },      
      body: JSON.stringify(params)
    })
    let result = await response.json()
    // console.log('serverHttp result', result)
    if (typeof result.code !== 'string') {
      result.code = 'OK'
    }
    if (result.code == 'INVALID_TOKEN') {
      throw (result)
    } else if (result.code != 'OK') {
      throw (result)
    }
    console.log('serverHttp result',url, result)
    return result
  }

}
export default api