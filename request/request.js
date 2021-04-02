let timer = 0
export const request = (params) => {
  wx.showLoading({
    title: '加载中',
    mask: true,
  });
  timer++
  

  return new Promise((res, rej) => {
    const baseurl = 'https://api-hmugo-web.itheima.net/api/public/v1'
    wx.request({
      ...params,
      url:baseurl + params.url, 
      success:(ret)=>{
        res(ret)
      },
      file:(err)=>{
        rej(err)
      },
      complete() {
        timer--
        if (timer == 0) {
          wx.hideLoading();
        }
      }
    })
  })
}