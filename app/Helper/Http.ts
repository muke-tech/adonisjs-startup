import axios, { AxiosInstance } from "axios"
import { string } from '@ioc:Adonis/Core/Helpers'
import { MD5 } from 'crypto-js'
import qs from 'qs'


export default class Http {
  protected instance: AxiosInstance;
  protected appKey: string;

  constructor(appKey: string) {
    this.appKey = appKey

    this.instance = axios.create({
      timeout: 100 * 1000,
    })
  }

  protected sortByLetter(obj: object) {
    const sortedKeys = Object.keys(obj).sort();
    const sortedObj = {};
    for (let key of sortedKeys) {
      sortedObj[key] = obj[key];
    }

    return sortedObj;
  }

  protected buildQuery(params: object) {
    return qs.stringify(params)
  }

  protected prepareData(data: object) {
    const nonce = string.generateRandom(32); // 随机数
    const timestamp = Math.floor(Date.now() / 1000); // 秒级时间戳
    const sortedData = this.sortByLetter(data)

    const signParam = this.buildQuery({
      app_key: this.appKey,
      nonce,
      timestamp,
      data: sortedData
    })
    const sign = MD5(signParam)

    return { nonce, timestamp, sortedData, sign }
  }

  public async post(data: object) {
    const { nonce, timestamp, sortedData, sign } = this.prepareData(data)
    const headers = {
      nonce,
      timestamp,
      sign
    }

    const content = await axios.post('http://127.0.0.1:59998/echo', sortedData, {
      headers
    })

    return content
  }
}
