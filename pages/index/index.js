//index.js
//获取应用实例
const app = getApp()

wx.cloud.init()
const db = wx.cloud.database()


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
  },


  // 登录密码不分，暂时移除
  // passwordInput: function (e) {
  //   var that = this
  //   that.setData({
  //     password: e.detail.value
  //   })
  // },  

  onClick: function() {
    
    var lastId = wx.getStorageSync('userData').userId

    var string = this.data.username
    if (string.length == 9) {
      
      var cloudFlag = false

      db.collection('userInfo').where({
        userId: string
      }).get({
        success: function (res) {
          console.log(res.data[0])
          cloudFlag = true
          try {
            var value = wx.getStorageSync('userData')
            if (value) {
              value.name = res.data[0].name
              value.department = res.data[0].department
              value.overview = res.data[0].overview
              value.phone = res.data[0].phone
              value.sex = res.data[0].sex
              wx.setStorageSync('userData', value)
            }
          } catch (e) {
            throw (e)
          }
        }
      })

      try {
        var value = wx.getStorageSync('userData')
        if (value) {
          value.userId = string
          wx.setStorageSync('userData', value)
        }
      } catch (e) {
        throw(e)
      }

      var that = this
      if (that.data.username != lastId) {
        console.log("clear")
        var dataObj = require("../../data/data.js")
        wx.clearStorageSync();
        dataObj.personData.userId = that.data.username

        wx.setStorageSync('userData', dataObj.personData)
      }

      wx.redirectTo({
        url: '../apply/apply',
      })

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
