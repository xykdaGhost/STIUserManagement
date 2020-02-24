//index.js
//获取应用实例
const app = getApp()

wx.cloud.init()
const db = wx.cloud.database()


var that
Page({
  data: {
    userId: "",
    password: ""
  },

  usernameInput: function (e) {
    var that = this
    that.setData({
      userId: e.detail.value
    })
  },


  // 登录密码不分，暂时移除
  // passwordInput: function (e) {
  //   var that = this
  //   that.setData({
  //     password: e.detail.value
  //   })
  // },  

  onClick: function () {

    var that = this
    //判断学号是否为9位
    if (that.data.userId.length == 9) {
      
      wx.setStorageSync('userId', that.data.userId)

      wx.showToast({
        title: 'Loading',
        icon: 'loading',
        duration: 300
      })

      //跳转延时执行
      setTimeout(function () {
        wx.redirectTo({
          url: '../apply/apply',
        })
      }, 15)
    } else {
      wx.showToast({
        title: '学号不正确',
        image: '../../pictures/wrong.png'
      })
    }

  },

  onLoad: function (options) {

  }
})