import { login} from '../../utils/util.js'
import { request, } from '../../request/request.js'
Page({
  data: {

  },
  async handleGetUserInfo(e) {
    console.log(e);
    /* 获取用户信息 */
    const { encryptedData, rawData, iv, signature } = e.detail
    /* 获取小程序登陆成功后的code */
    const { code } = await login()
    const loginParams = { encryptedData, rawData, iv, signature, code }
    /* 发送请求，获取用户 token */
/*     const res = await request({
      url: '/users/wxlogin',
      method: 'post',
      data:loginParams
    }) */
    const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo"
    wx.setStorageSync('token', token);
    wx.navigateBack({
      delta: 1
    });
  }
})