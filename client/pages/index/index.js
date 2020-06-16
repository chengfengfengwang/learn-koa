//index.js
//获取应用实例
import { Base64 } from 'js-base64';
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  verify(){
    wx.request({
      url: 'http://localhost:3001/v1/token/verify',
      method: 'POST',
      data: {
        token: wx.getStorageSync('token')
        //token: 'qwe'
      },
      success(result) {
        console.log(result)
      }
    })
  },
  like(){
    wx.request({
      url: 'http://localhost:3001/v1/like',
      method: 'POST',
      data: {
        type:100,
        art_id: 1
      },
      header:{
        //token: wx.getStorageInfoSync('token')
        Authorization:this._encode()
      },  
      success(result) {
        console.log(result)
      }
    })
  },
  login(){
    wx.login({
      success(res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'http://localhost:3001/v1/token',
            method:'POST',
            data: {
              type:100,
              code: res.code
            },
            success(result){
              wx.setStorageSync("token", result.data.token)
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  _encode(){
    const token = wx.getStorageSync('token');
    console.log(token)
    const base64 = Base64.encode(token + ':asd');
    
    return 'Basic ' +  base64
  }
})
