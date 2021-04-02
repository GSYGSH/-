import { getSetting, openSetting, chooseAddress, showModal,showToast } from '../../utils/util.js'
import { request, } from '../../request/request.js'
Page({
  data: {
    goodsList: [],
    total: 0,
    allCheck: false,
    checkNum: 0
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
  async handleChooseAddress() {
    try {
      /* 获取收货地址 */
      const { authSetting: {['scope.address']:res} } = await getSetting()
      if (res === false) {
        /* 获取不到就，引导开权限 */
        await openSetting()
      }
      const address = await chooseAddress()

      wx.setStorageSync('address', address);
    } catch (err) {
      console.log(err);
    }
  },
  getGoodsList() {
    const goodsList = wx.getStorageSync('cart') || []
    goodsList.forEach(item => {
      if (!item.hasOwnProperty('isCheck')) {
        item.isCheck = true
      }
    })
    this.setData({
      goodsList,
    })
    this.updateGoodsList()
  },
  updateGoodsList() {
    const goodsList = this.data.goodsList
    let checkNum = 0
    /* 全选 */
    let allCheck = goodsList.length ? goodsList.every(item => item.isCheck) : false
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
      allCheck,
      checkNum
    })
    console.log(this.data.goodsList);
    wx.setStorageSync('cart', this.data.goodsList)
  },
  /* 商品选中 */
  handleItemChange(e) {
    const { index } = e.currentTarget.dataset
    const goodsList = this.data.goodsList
    goodsList[index].isCheck = !goodsList[index].isCheck
    this.setData({
      goodsList
    })
    this.updateGoodsList()
  },
  /* 商品全选 */
  handleAllCheck() {
    const goodsList = this.data.goodsList
    const res = goodsList.every(item => item.isCheck === true)
    if (res) {
      goodsList.map(item => item.isCheck = false)
    } else {
      goodsList.map(item => item.isCheck = true)
    }
    this.setData({
      goodsList
    })
    this.updateGoodsList()
  },
  handleItemClick(e) {
    const { index, opeartion } = e.currentTarget.dataset
    const goodsList = this.data.goodsList
    goodsList.forEach(async (item, i, arr) => {
      if (index === i) {
        /* 判定删除商品 */
        if (arr[index].num === 1 && opeartion === '-1') {
          try {
            const res = await showModal('是否删除该商品')
            if (res) {
              arr.splice(index, 1)
            }
          } catch (err) {
            console.log(err);
          }
          /* 判定+- */
        } else {
          arr[index].num += Number(opeartion)
        }
        this.setData({
          goodsList
        })
        this.updateGoodsList()
      }
    })
  },
  async toPay() {
    const address = wx.getStorageSync('address')
    const { checkNum } = this.data
    console.log(address);
    console.log(checkNum);
    if (!address) {
      await showToast({ 'title':'请选择地址' })
      return;
    }
    if (checkNum === 0) {
      await showToast({ 'title':'请选择商品' })
      return;
    }
    wx.navigateTo({
      url: '/pages/pay/index',
    });
  }
});