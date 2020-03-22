// pages/planmanage/planmanage.js

const app = getApp();
const db = wx.cloud.database();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    page_state: 0,
    //0是初始计划的状态，1是计划填写后点击确定的状态,2是从群里的分享进来的！

    userInfo: "",
    
    "value": "", // 文本的内容
    "placeholder": "请输入内容",
    "maxlength": 321, // 最大输入长度，设置为 -1 的时候不限制最大长度
    // "focus": true,
    "auto-height": true, // 是否自动增高，设置auto-height时，style.height不生效
    "adjust-position": true, // 键盘弹起时，是否自动上推页面

    plan_id: '',
    join_data: [],
    plan_content: '',
    plan_type: '',
    plan_speed: '',
    plan_place: '',
    plan_mileage: '',
    plan_time: '',
    userInfo_nickName: '',
    userInfo_id: 0,
    manager_openid: "",


  },




  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log("options:", options)
    if (options.page_state == 2) {
      //page_state--3为可以参加该训练，4为已参加过
      this.setData({
        page_state: 3,
        plan_id: options.plan_id,
        plan_content: decodeURIComponent(options.plan_content),
        plan_type: decodeURIComponent(options.plan_type),
        plan_speed: decodeURIComponent(options.plan_speed),
        plan_place: decodeURIComponent(options.plan_place),
        plan_mileage: decodeURIComponent(options.plan_mileage),
        plan_time: decodeURIComponent(options.plan_time),
        manager_openid: decodeURIComponent(options.manager_openid),
        userInfo_nickName: options.userInfo_nickName,
        userInfo_id: options.userInfo_id,
      })
      this.getJoin_data(this.data.plan_id)
    }

  },




  getJoin_data: function(plan_id) {

    var that = this
    const db = wx.cloud.database()
    const _ = db.command
    db.collection('join').where({
        plan: ({
          plan_id: plan_id
        })
        //对数组中的某个字段查询判断
      })
      .get({
        success: function(res) {
          console.log('join:', res.data)

          that.setData({
            join_data: res.data,
          })
        }
      })
  },



  // 判断是否已经点击参加该训练
  // checkJoin: function(plan_id, user_id) {
  //   var that = this
  // },


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
    // console.log(this.data)
    // var str = '来' + this.data.plan_place + '!' + this.data.plan_type
    // return {
    //   title: str,
    //   path: '/pages/planmanage/planmanage?plan_id=' + this.data.plan_id +
    //     '&plan_content=' + this.data.plan_content +
    //     '&plan_type=' + this.data.plan_type +
    //     '&plan_speed=' + this.data.plan_speed +
    //     '&plan_place=' + this.data.plan_place +
    //     '&plan_mileage=' + this.data.plan_mileage +
    //     '&plan_time=' + this.data.plan_time +
    //     '&manager_openid=' + this.data.manager_openid +
    //     '&userInfo_nickName=' + this.data.userInfo_nickName +
    //     '&userInfo_id=' + this.data.userInfo_id +
    //     '&page_state=2',
    //   imageUrl: 'http://static.e-mallchina.com/pic/product/brand/detail/hgds.jpg', //自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径。支持PNG及JPG。显示图片长宽比是 5:4。
    //   success: function(res) {
    //     // 转发成功
    //     console.log("转发成功:" + JSON.stringify(res));
    //   },
    //   fail: function(res) {
    //     // 转发失败
    //     console.log("转发失败:" + JSON.stringify(res));
    //   }
    // }
  },

  share_plan: function() {
    
  },

  save_plan: function() {

    console.log(app.globalData.userInfo.nickName, app.globalData.openid)
    var that = this
    if (this.data.plan_content != "" && this.data.plan_type != "" && this.data.plan_speed != "" && this.data.plan_place != "" && this.data.plan_mileage != "") {
      // console.log('jhhhhh')


      const db = wx.cloud.database()
      //往名为counters的集合中添加数据(需先在工具栏云开发里的数据库里创建集合counters)
      db.collection('plan').add({
        data: {
          content: that.data.plan_content,
          mileage: that.data.plan_mileage,
          manager: app.globalData.userInfo.nickName,
          manager_openid: app.globalData.openid,
          speed: that.data.plan_speed,
          time: that.data.plan_time,
          type: that.data.plan_type,
          place: that.data.plan_place,
          creatime: new Date(),
        },
        success: res => {
          // 在返回结果中会包含新创建的记录的 _id

          wx.showToast({
            title: '保存成功',
            duration: 1000,
          })

          setTimeout(function() {
            wx.showToast({
              title: '正在跳转...',
              icon: 'loading',
              duration: 1000,
              mask: true
            })
          }, 1000)

          setTimeout(function() {
            // wx.switchTab({
            //   url: '/pages/two/two',
            // })
            wx.redirectTo({
              url: '/pages/planmanage/history',
            })
          }, 1500)

          console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '新增记录失败'
          })
          console.error('[数据库] [新增记录] 失败：', err)
        }
      })



      // db.collection('plan').add({
      //   // data 字段表示需新增的 JSON 数据
      //   data: {


      //   },
      //   success: function(res) {
      //     // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
      //     console.log(res)
      //   }
      // })


    } else {
      wx.showToast({
        title: '请补全信息！',
        icon: 'none',
        duration: 1000
      })
    }

  },

  plan_content_Input: function(e) {
    var plan_content = e.detail.value
    this.setData({
      plan_content: plan_content
    })
    console.log('plan_content:', this.data.plan_content)
  },

  plan_type_Input: function(e) {
    var plan_type = e.detail.value
    this.setData({
      plan_type: plan_type
    })
    console.log('plan_type:', this.data.plan_type)
  },


  plan_speed_Input: function(e) {
    var plan_speed = e.detail.value
    this.setData({
      plan_speed: plan_speed
    })
    console.log('plan_speed:', this.data.plan_speed)
  },


  plan_place_Input: function(e) {
    var plan_place = e.detail.value
    this.setData({
      plan_place: plan_place
    })
    console.log('plan_place:', this.data.plan_place)
  },

  plan_mileage_Input: function(e) {
    var plan_mileage = e.detail.value
    this.setData({
      plan_mileage: plan_mileage
    })
    console.log('plan_mileage:', this.data.plan_mileage)
  },

  plan_time_Input: function(e) {
    var plan_time = e.detail.value
    this.setData({
      plan_time: plan_time
    })
    console.log('plan_time:', this.data.plan_time)
  },


  //创建一条加入训练的记录
  joinPlan: function () {
    //差一个已参与监测  function()

    var that = this

    const db = wx.cloud.database()
    //往名为counters的集合中添加数据(需先在工具栏云开发里的数据库里创建集合counters)
    db.collection('join').add({
      data: {
        // detail: that.data.walletPsd,
        // plan_id: that.data.plan_id,
        creatime: new Date(),
        joiner_nickName: app.globalData.userInfo.nickName,
        joiner_avatarUrl: app.globalData.userInfo.avatarUrl,
        // manager_openid: that.data.manager_openid,
        plan: that.data,
      },
      success: res => {
        // 在返回结果中会包含新创建的记录的 _id

        wx.showToast({
          title: '保存成功',
          duration: 1000,
        })

        setTimeout(function () {
          wx.showToast({
            title: '正在跳转...',
            icon: 'loading',
            duration: 1000,
            mask: true
          })
        }, 1000)

        setTimeout(function () {
          wx.switchTab({
            url: '/pages/two/two',
          })
        }, 1500)

        console.log('[数据库] [新增记录] 成功，记录: ', res)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '新增记录失败'
        })
        console.error('[数据库] [新增记录] 失败：', err)
      }
    })
  },

})