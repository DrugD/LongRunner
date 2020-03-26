// miniprogram/pages/me/runnersSettle/runnersSettle.js

const app = getApp()
const db = wx.cloud.database()
const _ = db.command
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sex: ['男', '女'],
    sex_index: 0,
    team: [
      {
        name: "武汉大学长跑协会",
        team_id: 2233,
        _id: "9a393e025e774f62001908836782f89f",
        type: "student"
      },
      {
        name: "武汉大学乐跑团",
        team_id: 9999,
        _id: "61795c245e797c3e001b86ac4c698565",
        type: "society"
      },
    ],

    team_index: 0,
    input_name: "",
    input_school: "",
    input_school_id: "",
    input_telephone: "",
    team_data:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      title: '加载中...',
    })
    this.getTeamInform()
  },


  getTeamInform: function () {
    
    var that = this
    db.collection('User').where({
      _openid: app.globalData.openid,
    }).get({
      success: res => {
        if (res.data[0].team_name_id) {
          console.log("team_id:", res.data[0].team_name_id)
          var team_id = res.data[0].team_name_id[0]

          db.collection('team').where({
            _id: team_id
          }).get({
            success: res => {
              console.log("团队信息：", res.data[0])
              that.setData({
                team_data: res.data[0]
              })
              wx.hideLoading()
            },
            fail: res => {
              console.log(res)
              wx.hideLoading()
            },

          })
        }else{
          console.log("未绑定过组织")
          that.setData({
            team_data:null
          })
          wx.hideLoading()
        }


      },
      fail: res => {
        console.log(res)
      },

    })

  },

  

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },


  bindPickerChange1: function(e) {
    console.log(e)
    this.setData({
      team_index: e.detail.value
    })
  },

  bindPickerChange2: function(e) {
    console.log(e)
    this.setData({
      sex_index: e.detail.value
    })
  },

  input_name: function(e) {
    console.log(e.detail.value)
    this.setData({
      input_name: e.detail.value
    })
  },

  input_school: function(e) {
    console.log(e.detail.value)
    this.setData({
      input_school: e.detail.value
    })
  },

  input_school_id: function(e) {
    console.log(e.detail.value)
    this.setData({
      input_school_id: e.detail.value
    })
  },

  input_telephone: function(e) {
    console.log(e.detail.value)
    this.setData({
      input_telephone: e.detail.value
    })
  },

  joinTeam: function(id, user_info, openid, user_data) {
    wx.cloud.callFunction({
      // 要调用的云函数名称
      name: 'joinTeam',
      // 传递给云函数的event参数
      data: {
        _id: id,
        user_info: user_info,
        openid: openid,
        user_data: user_data,

      }
    }).then(res => {

      console.log("res--joinTeam", res)

    }).catch(err => {
      // handle error
    })


    wx.cloud.callFunction({
      // 要调用的云函数名称
      name: 'updateUserState',
      // 传递给云函数的event参数
      data: {
        team_id: id,
        openid: openid,
      }
    }).then(res => {
      console.log("res--updateUserState", res)
      // that.load()
      console.log("res--data", that.data)
      // wx.hideLoading()


    }).catch(err => {
      // handle error
    })



    setTimeout(function() {
      wx.hideLoading()
      var pages = getCurrentPages(); // 当前页面
      var beforePage = pages[pages.length - 2]; // 前一个页面

      wx.navigateBack({
        delta: 1, // 返回上一级页面 
        success: function () {
          beforePage.load(); // 执行前一个页面的onLoad方法
        }
      })
    }, 1500)

  },

  binding: function() {
    if (this.data.team_data){
      return 
    }
    console.log(this.data)
    var flag = false
    if (this.data.input_name && this.data.input_telephone.length == 11) {
      if (this.data.team[this.data.team_index].type == 'student' && this.data.input_school_id.length == 13 ) {
        console.log("ok了")
        wx.showLoading({
          title: '正在提交...',
        })
        var user_data = {
          input_name: this.data.input_name,
          input_school_id: this.data.input_school_id,
          input_school: this.data.input_school,
          input_telephone: this.data.input_telephone,
          sex: this.data.sex[this.data.sex_index],
        }
        console.log(user_data)
        this.joinTeam(this.data.team[this.data.team_index]._id, app.globalData.userInfo, app.globalData.openid, user_data)

      } else if (this.data.team[this.data.team_index].type == 'society') {
        console.log("ok了2")
        wx.showLoading({
          title: '正在提交...',
        })
        var user_data = {
          input_name: this.data.input_name,
          // input_school_id: this.data.input_school_id,
          // input_school: this.data.input_school,
          input_telephone: this.data.input_telephone,
          sex: this.data.sex[this.data.sex_index],
        }
        this.joinTeam(this.data.team[this.data.team_index]._id, app.globalData.userInfo, app.globalData.openid, user_data)



      } else {
        wx.showToast({
          title: '请完善信息',
          icon: "none",
        })
      }
    } else {
      wx.showToast({
        title: '请完善信息',
        icon: "none",
      })
    }
  },


  showRules:function(){
    wx.showModal({
      title: '跑团声明',
      content: '获取个人信息后，我们仅利用这些信息展示在个人信息这一栏以供检查。在获取你的报名信息后，有且仅有这些报名信息将对武汉大学长跑协会可见。我们将在处理你的个人信息前，征得你的明示同意。(用户申请表中的所有信息，四维跑库平台不会存储)',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else {
          console.log('用户点击取消')
        }

      }
    })
  }

})