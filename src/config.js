// import {apisCallback} from '@/apis'
// import { settings } from 'cluster';
import configJSON from '@/settings.json'

export const TOKEN = '129831nas8b12i2sajkd'
export const VerifiedToken = 'e7a57e0abb8f461f97e1f7c22bf5d97b'

export function setup () {
  Date.prototype.format = function (format_str) {
    var o = {
      'M+': this.getMonth() + 1,
      'd+': this.getDate(),
      'h+': this.getHours(),
      'm+': this.getMinutes(),
      's+': this.getSeconds(),
      'q+': Math.floor((this.getMonth() + 3) / 3),
      'S': this.getMilliseconds()
    }

    if (/(y+)/.test(format_str)) {
      format_str = format_str.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
    }

    for (let k in o) {
      if (new RegExp('(' + k + ')').test(format_str)) {
        format_str = format_str.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
      }
    }
    return format_str
  }

  return Promise.resolve(configJSON)
}

export default null
