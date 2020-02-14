// pages/apply/apply.js
var dataObj = require("../../data/data.js");
wx.cloud.init()
const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,//控制下拉列表的显示隐藏，false隐藏、true显示
    selectData: ['电气学院', '光电学院', '自动化学院', '电信学院', '西边其他学院', '东边其他学院'],//下拉列表的数据
    index: 0,//选择的下拉列表下标
    // personDataCache: dataObj.personData
    items: [
      { name: 'male', value: '男'},
      { name: 'female', value: '女'},
    ]
  },

  // 点击下拉显示框
  selectTap() {
    this.setData({
      show: !this.data.show
    });
  },

  optionTap(e) {
    let Index = e.currentTarget.dataset.index;//获取点击的下拉列表的下标

    this.setData({
      index: Index,
      show: !this.data.show,
      'personData.department': Index
    });
  },

  //性别单选 回调
  radioChange(e) {
    console.log(e.detail.value)
    var that = this
    if (e.detail.value == "male") {
      that.setData({
        'personData.sex': "男"
      })
    } else if (e.detail.value == "female") {
      that.setData({
        'personData.sex': "女"
      })
    }
  },

  //姓名输入框回调
  nameTap(e) {
    this.setData({
      'personData.name': e.detail.value
    })
  },

  //电话输入框 回调
  phoneTap(e) {
    this.setData({
      'personData.phone': e.detail.value
    })
  },

  //简述输入框 输入回调
  overviewTap(e) {
    this.setData({
      'personData.overview': e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    console.log("apply onLOad ok")
    var that = this
    this.setData({
      personData: wx.getStorageSync('userData')
    }) 
    try {
      var value = wx.getStorageSync('userData')
      if (value.sex == '男') {
        that.setData({
          items: [
            { name: 'male', value: '男', checked: true },
            { name: 'female', value: '女', checked: false},
          ]
        })

      } else if (value.sex == '女') {
        that.setData({
          items: [
            { name: 'male', value: '男'},
            { name: 'female', value: '女', checked: true },
          ]
        })

      } 
    } catch (e) {
      throw (e)
    }
  },

  //提交申请按钮回调
  submitTap(e) {
    var that = this

    var check = true

    if (that.data.personData.phone.length != 11) {
      wx.showToast({
        title: '电话填写不正确',
        image: '../../pictures/wrong.png',
      })
      check = false
    }

    if (check) {
      wx.setStorageSync('userData', that.data.personData)
      db.collection('userInfo').add({
        data: that.data.personData
      })

      db.collection('userInfo').where({
        userId: that.data.userId
      }).get({
        success: function (res) {
          wx.showToast({
            title: '提交成功',
          })
        }
      })

    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})