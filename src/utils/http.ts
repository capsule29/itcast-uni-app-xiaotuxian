/**
 * 添加拦截器
 *  拦截request请求
 *  拦截upload文件上传
 *
 * Todo
 *  1.非http开头需要拼接地址
 *  2.请求超时
 *  3.添加小程序端请求标识
 *  4.添加token请求头标识
 */

import { useMemberStore } from '@/stores'

const BaseURL = 'https://abcdefg'
// 添加拦截器
const httpInterceptor = {
  // 拦截前触发
  invoke(options: UniApp.RequestOptions) {
    // 1.非http开头需要拼接地址
    if (!options.url.startsWith('http')) {
      options.url = BaseURL + options.url
    }
    // 2.请求超时
    options.timeout = 10000 // ms，默认60s
    // 3.添加小程序端请求标识
    options.header = {
      ...options.header, // 保留原配置
      'source-slient': 'miniapp',
    }
    // 4.添加token请求头标识
    const memberStore = useMemberStore()
    const token = memberStore.profile?.token
    if (token) {
      // API要求的
      options.header.Authorization = token
    }
    console.log(options)
  },
}
uni.addInterceptor('request', httpInterceptor)
uni.addInterceptor('uploadFile', httpInterceptor)

/**
 * 请求函数
 * @param UniApp.RequestOptions
 * @returns Promise
 *  1. 返回Promise对象
 *  2. 请求成功
 *      2.1 提取数据 res.data
 *      2.2 添加类型，支持泛型
 *  3. 请求失败
 *      3.1 网络错误    提示用户换网络
 *      3.2 401错误     清理用户信息，跳转到登录页面
 *      3.3 其他错误    根据后端返回的错误信息进行轻提醒
 */
interface Data<T> {
  code: string
  msg: string
  result: T
}
// 2.2 添加类型，支持泛型
export const http = <T>(options: UniApp.RequestOptions) => {
  // 1.返回Promise对象
  return new Promise<Data<T>>((resolve, reject) => {
    uni.request({
      ...options,
      // 2. 请求成功
      success(res) {
        // 2.1 提取数据 res.data
        resolve(res.data as Data<T>)
      },
    })
  })
}
