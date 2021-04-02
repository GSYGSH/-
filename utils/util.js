export const getSetting = () => {
  return new Promise((res, rej) => {
    wx.getSetting({
      success: (result) => {
        res(result)
      },
      fail: (err) => {
        rej(err)
      }
    });
  })
}
export const openSetting = () => {
  return new Promise((res, rej) => {
    wx.openSetting({
      success: (result) => {
        res(result)
      },
      fail: (err) => {
        rej(err)
      },
    });
  })
}
export const chooseAddress = () => {
  return new Promise((res, rej) => {
    wx.chooseAddress({
      success: (result) => {
        res(result)
      },
      fail: (err) => {
        rej(err)
      },
    });
  })
}
export const showModal = (title) => {
  return new Promise((ret, rej) => {
    wx.showModal({
      title: '提示',
      content: title,
      success(res) {
        if (res.confirm) {
          ret('确认删除')
        } else if (res.cancel) {
          rej('取消删除')
        }
      }
    })
  })
}
export const showToast = ({ title,icon='none' }) => {
  return new Promise((ret, rej) => {
    wx.showToast({
      title: title,
      duration: 1500,
      icon: icon,
      success: (result) => {
        ret(result)
      },

    });
  })
}
export const login = () => {
  return new Promise((ret, rej) => {
    wx.login({
      timeout: 10000,
      success: (result) => {
        ret(result)
      },
    });
  })
}
export const requestPayment = (pay) => {
  return new Promise((ret, rej) => {
    wx.requestPayment({
      ...pay,
      success(res) {
        ret(res)
      },
      fail(err) {
        rej(err)
      }
    })
  })
}