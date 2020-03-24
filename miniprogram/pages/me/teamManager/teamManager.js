// miniprogram/pages/me/runnersSettle/runnersSettle.js

const app = getApp()
const db = wx.cloud.database()
const _ = db.command
Page({

  /**
   * 页面的初始数据
   */
  data: {
    team_data:"",
    team_clockin_data:"",
    show_data:"",
    showDialog: false,
   
    input_team_id:""
  },
  
  input_team_id:function(e){
    console.log(e.detail.value)
    this.setData({
      input_team_id: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getTeamInform()
    this.calculateTeamStatic()
  },

  show_inform:function(e){
    console.log(e.currentTarget.dataset.openid)
    // var openid ="oabev4n06g5a_NHuLypzhoGo2vig"
    this.search_inform(e.currentTarget.dataset.openid)
    // this.search_inform(openid)
  },

  closeModel:function(){
    this.setData({
      // show_data: this.data.team_data.member[i],
      showDialog: !this.data.showDialog
    })
  },

  search_inform:function(openid){
    for (var i = 0; i < this.data.team_data.member.length;i++){
      if (this.data.team_data.member[i].openid == openid){
        this.setData({
          show_data: this.data.team_data.member[i],
          showDialog: !this.data.showDialog
        })

        // input_name: "覃颖琪"
        // input_school: "哲学学院"
        // input_school_id: "2017300010010"
        // input_telephone: "18378036675"

        // wx.showModal({
        //   title: '成员信息',
        //   content: show_data,

        // })

        return
      }
    }
  },

  getTeamInform: function (id) {
    var that = this
    console.log(this.data.input_team_id)
    db.collection('team').where({
      // _id: that.data.input_team_id
      _id:"9a393e025e774f62001908836782f89f"
      // _id:id
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
      },

    })
   
    
    // db.collection('User').where({
    //   // _openid: app.globalData.openid,
    //   _openid:"oabev4n06g5a_NHuLypzhoGo2vig"
    // }).get({
    //   success: res => {
    //     if (res.data[0].team_name_id) {
    //       console.log("team_id:", res.data[0].team_name_id)
    //       var team_id = res.data[0].team_name_id[0]

    //       db.collection('team').where({
    //         _id: team_id
    //       }).get({
    //         success: res => {
    //           console.log("团队信息：", res.data[0])
    //           that.setData({
    //             team_data: res.data[0]
    //           })
    //           wx.hideLoading()
    //         },
    //         fail: res => {
    //           console.log(res)
    //         },

    //       })
    //     }//


    //   },
    //   fail: res => {
    //     console.log(res)
    //   },

    // })
  },

  calculateTeamStatic: function () {
    var that = this
    db.collection('clockin_team').where({
      sport_team_id: this.data.team_data.team_id
    }).get({
      success: res => {
        console.log("团队打卡信息：", res.data)
        this.setData({
          team_clockin_data: res.data
        })
      },
      fail: res => {
        console.log(res)
      },
    })
  },


  check:function(id){
    console.log(this.data.input_team_id)
    this.getTeamInform(this.data.input_team_id)
    this.calculateTeamStatic()
  },
})