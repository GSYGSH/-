import { getSetting, openSetting, chooseAddress, showModal, requestPayment,showToast } from '../../utils/util.js'
import { request } from '../../request/request.js'
Page({
  data: {
    goodsList: [],
    total: 0,
    checkNum: 0,
    address: null
  },
  onShow() {
    /* 获取地址 */
    const address = wx.getStorageSync('address');
    if (address) {
      address.allAddress = address.provinceName + address.cityName + address.countyName + address.detailInfo
      this.setData({
        address
      })
    }
    this.getGoodsList()



  },
  getGoodsList() {
    let goodsList = wx.getStorageSync('cart') || []
    goodsList = goodsList.filter(item => item.isCheck)
    this.setData({
      goodsList,
    })
    this.updateGoodsList()
  },
  updateGoodsList() {
    const goodsList = this.data.goodsList
    let checkNum = 0
    /* 总价 */
    let total = goodsList.length ? goodsList.reduce((pre, item, index) => {
      if (item.isCheck) {
        checkNum += item.num
        return pre += item.goods_price * item.num
      } else {
        allCheck = false
        return pre
      }
    }, 0) : 0
    this.setData({
      total,
      checkNum
    })
  },
  async handleOrderPay() {
    /* 点击支付 */
    const token = wx.getStorageSync('token')
    if (!token) {
      wx.navigateTo({
        url: '/pages/auth/index',
      });
      return;
    }
    /* 获取地址 */
    this.setData({
      address: wx.getStorageSync('address')
    })
    /* 请求头参数 */
    const header = { Authorization: token }
    /* 请求体参数 */
    const order_price = this.data.total.toString()
    const consignee_addr = this.data.address.toString()
    const goods = []
    this.data.goodsList.forEach(item => goods.push({
      goods_id: item.goods_id,
      goods_number: item.num,
      goods_price: item.goods_price
    }))
    /* 创建订单,获取订单编号 */
    const orderParams = { order_price, consignee_addr, goods }
    const { data: { message: { order_number } } } = await request({
      url: '/my/orders/create',
      method: "POST",
      data: orderParams,
      header
    })
    /* 发起预支付接口 */
    const {data:{message:{pay}}} = await request({
      url: "/my/orders/req_unifiedorder", 
      method: 'POST',
      header,
      data: {
        order_number
      }
    })
    console.log(pay);
    /* 调起微信内支付 */
/*     const ret = await requestPayment(pay)
    console.log(ret); */
    
    /* 清空数据 */
    let goodsList = wx.getStorageSync('cart');
    console.log(goodsList);
    goodsList = goodsList.filter(item => !item.isCheck)
    wx.setStorageSync('cart', goodsList);
    wx.reLaunch({
      url:'/pages/order/index?type=1',
      complete: () => {
        showToast({ title: '支付成功', icon: 'success' })
      }
    });

  }
});