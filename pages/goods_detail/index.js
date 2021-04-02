import { request } from '../../request/request.js'
import { showToast } from '../../utils/util.js'
Page({
  data: {
    detailList: [],
    isCollect: false
  },
  goodInfo: [],
  onShow: function () {
    const pages = getCurrentPages();
    let currentPage = pages[pages.length - 1]
    let options = currentPage.options

    const { goods_id } = options
    this.getGoodsDetail(goods_id)

  },
  async getGoodsDetail(goods_id) {
    const res = await request({
      url: "/goods/detail",
      data: { goods_id }
    })

    this.goodInfo = res.data.message
    /* 获取缓存中的商品收藏数组 */
    let collect = wx.getStorageSync('collect') || []
    let isCollect = collect.some(item => item.goods_id === goods_id)

    this.setData({
      detailList: {
        goods_introduce: this.goodInfo.goods_introduce.replace(/webp/g, 'jpg'),
        pics: this.goodInfo.pics,
        goods_name: this.goodInfo.goods_name,
        goods_price: this.goodInfo.goods_price,
        goods_id: goods_id,
        goods_small_logo:this.goodInfo.goods_small_logo
      },
      isCollect
    })
  },
  handleAddGood() {
    const cart = wx.getStorageSync('cart') || []
    const index = cart.findIndex(i => i.goods_id === this.goodInfo.goods_id)
    if (index == -1) {
      /* 没找到商品 */
      this.goodInfo.num = 1
      cart.push(this.goodInfo)
    } else {
      /* 找到商品 */
      cart[index].num++
    }
    wx.setStorageSync('cart', cart);
    wx.showToast({
      title: '添加成功',
      icon: 'success',
      mask: true,
    });
  },
  /* 处理收藏 */
  handleCollect() {
    let collect = wx.getStorageSync('collect') || []
    let isCollect = false
    let index = collect.findIndex(item => item.goods_id === this.data.detailList.goods_id)

    if (index != -1) {
      collect.splice(index, 1)
      isCollect = false
      showToast({ title: "取消收藏" })
    } else {
      collect.push(this.data.detailList)
      isCollect = true
      showToast({ title: "收藏成功" })
    }

    /* collect上传，更改isCollect图标显示 */
    wx.setStorageSync('collect', collect)
    this.setData({
      isCollect
    })
  },
  /* 轮播图点击 */
  swiperItemClick(e) {
    const { currentTarget: { dataset: { index } } } = e
    let imageList = this.data.detailList.pics.map(item => item.pics_mid)
    wx.previewImage({
      current: imageList[index],
      urls: imageList,
    });
  }
});