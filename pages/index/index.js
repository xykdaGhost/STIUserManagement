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
      
      //sameId记录输入id是否与本地缓存一致
      var sameId = false
      if (that.data.userId == wx.getStorageSync('personData').userId) {
        sameId = true
      } else {
        var dataObj = require("../../data/data.js").personData
        dataObj.userId = that.data.userId
        wx.setStorageSync('personData', dataObj)
      }

      //检查服务器中是否有数据
      const db = wx.cloud.database()
      db.collection('userInfo').where({
        userId: that.data.userId
      }).get({
        success: function (res) {
          if (res.data[0].userId == that.data.userId) {
            console.log(res)
            dataObj = res.data[0]
            console.log(dataObj)
            wx.setStorageSync('personData', dataObj)
            console.log(res + "123")
          }
        }
      })
      
      
      //讲获取的dataObj放入缓存以便显示



      wx.showToast({
        title: 'Loading',
        icon: 'loading',
        duration: 300
      })

      // 跳转延时执行
      setTimeout(function () {
        wx.redirectTo({
          url: '../apply/apply',
        })
      }, 100)
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