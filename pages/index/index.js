//index.js
//获取应用实例
const app = getApp()

Page({

  onClick: function() {
    wx.redirectTo({
      url: '../apply/apply',
    })
  }
})
