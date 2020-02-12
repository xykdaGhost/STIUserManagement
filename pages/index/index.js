//index.js
//获取应用实例
const app = getApp()
wx.cloud.init()
const db = wx.cloud.database()

Page({

  onClick: function() {
    console.log(data)
    wx.redirectTo({
      url: '../apply/apply',
    })
  },

  onLoad: function (options) {

    db.collection('userInfo').where({
    }).get({
      success: function(res) {
        console.log(res)
      }
    })
  }
})
