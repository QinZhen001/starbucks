import {baseUrl} from './config'
import {showModal} from '../utils/index'

export function request(url, method = 'GET', data, header = {}) {
    return new Promise((resolve, reject) => {
        wx.showLoading({title: '玩命加载中...'})
        wx.request({
            url: baseUrl + url,
            method,
            data,
            header: {'Content-Type': 'json'},
            success: function (res) {
                if (res.statusCode === 200) {
                    resolve(res.data)
                } else {
                    showModal('失败', '出现未知错误!')
                    reject(res.data)
                }
            },
            fail: function () {
                console.log('fail')
                showModal('失败', '获取数据失败!')
            },
            complete: function () {
                console.log('complete')
                wx.hideLoading()
            }
        })
    })
}
