//index.js
//获取应用实例
const app = getApp()
var that
Page({
  data: {
    username: "",
    password: ""
  },

  usernameInput: function (e) {
    var that = this
    that.setData({
      username: e.detail.value
    })
    console.log(e)
  },

  onClick: function() {
    
    wx.redirectTo({
      url: '../apply/apply',
    })


  },

  onLoad: function (options) {
    that = this

  }
})
