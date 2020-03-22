// pages/one/one.js
const app = getApp();

const db = wx.cloud.database({});
const cont1 = db.collection('table_1');
// const cont2 = db.collection('table_2');
// const cont3 = db.collection('table_3');
// const cont4 = db.collection('table_4');

// //引入图片预加载组件
// const ImgLoader = require('../img-loader/img-loader.js')


Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),

    inputValue: '', //搜索的内容
    navbar: ['马拉松赛事', "不步止社区"],
    currentTab: 0,
    block_index:1,
    // total_data: [],
    table_1: [],
    table_2: [],
    table_3: [],
    table_4: [],
    showLoading: true,
    // queryResult: [],
    dataList: [],
    input_content:"", //搜索框的内容


    // title: 'LD Runner',
    title:'',
    barBg: '#3c64d0',//#ff6600
    color: '#000000'//#ffffff


  },


  // 导航切换监听
  navbarTap: function (e) {
    console.log(e.currentTarget.dataset.idx);
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },

  // //搜索框文本内容显示
  // inputBind: function(event) {
  //   this.setData({
  //     inputValue: event.detail.value
  //   })
  //   console.log('bindInput：' + this.data.inputValue)

  // },

  load: function () {
    var that = this
    wx.cloud.callFunction({
      name: "getTable"
    }).then(res => {
      console.log("getTable获取",res)


      that.setData({
        table_1: res.result.data,
        showLoading: false,
      })

    }).catch(err => {
      console.error(err)
    })

    // wx.cloud.callFunction({
    //   name: "getTable2"
    // }).then(res => {
    //   // console.log("获取", res)
    //   that.setData({
    //     table_2: res.result.data
    //   })
    // }).catch(err => {
    //   console.error(err)
    // })


    // wx.cloud.callFunction({
    //   name: "getTable3"
    // }).then(res => {
    //   // console.log("获取", res)
    //   that.setData({
    //     table_3: res.result.data
    //   })
    // }).catch(err => {
    //   console.error(err)
    // })


    // wx.cloud.callFunction({
    //   name: "getTable4"
    // }).then(res => {
    //   // console.log("获取", res)
    //   that.setData({
    //     table_4: res.result.data
    //   })
    // }).catch(err => {
    //   console.error(err)
    // })


 

  },

  reload: function () {
    wx.showLoading({
      title: '刷新中...',
    })
    var that = this;
    console.log("点击成功")
    wx.cloud.database().collection('timeline')
      .orderBy('createTime', 'desc') //按发布视频排序
      .get({
        success(res) {
          console.log("请求成功", res)
          that.setData({
            dataList: null
          })

          that.setData({
            dataList: res.data
          })
          wx.hideLoading()
        },
        fail(res) {
          console.log("请求失败", res)
        }
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // //初始化图片预加载组件，并指定统一的加载完成回调
    // this.imgLoader = new ImgLoader(this, this.imageOnLoad.bind(this))

    this.load()


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

  },



  lookin: function (e) {
    // var data = JSON.stringify(this.data.table_1[e.currentTarget.dataset.detail])
    // console.log("detail:", e.currentTarget.dataset.detail)
    // console.log("data:", data)
    var race_id = this.data.table_1[e.currentTarget.dataset.detail]._id
    // console.log(this.data.table_1[e.currentTarget.dataset.detail])
    wx.navigateTo({
      // url: '/pages/one/detail/detail?data=' + escape(data),
      url: '/pages/one/detail/detail?race_id=' + race_id
    })

    // switch (this.data.currentTab){
    //   case 0:
    //     var data = JSON.stringify(this.data.table_1[e.currentTarget.dataset.detail])
    //     wx.navigateTo({
    //       url: '/pages/one/detail?data=' + data,
    //       // url: '/pages/one/detail'
    //     })
    //     break;
    //   case 1:
    //     var data = JSON.stringify(this.data.table_2[e.currentTarget.dataset.detail])
    //     wx.navigateTo({
    //       url: '/pages/one/detail?data=' + data,
    //       // url: '/pages/one/detail'
    //     })
    //     break;
    //   case 2:
    //     var data = JSON.stringify(this.data.table_3[e.currentTarget.dataset.detail])
    //     wx.navigateTo({
    //       url: '/pages/one/detail?data=' + data,
    //       // url: '/pages/one/detail'
    //     })
    //     break;
    //   case 3:
    //     var data = JSON.stringify(this.data.table_4[e.currentTarget.dataset.detail])
    //     wx.navigateTo({
    //       url: '/pages/one/detail?data=' + data,
    //       // url: '/pages/one/detail'
    //     })
    //     break;
    // }

  },


  table_5_add: function () {
    // wx.showToast({
    //   icon: 'none',
    //   title: '正在跳转...',
    // })
    if (app.globalData.userInfo) {
      wx.navigateTo({
        url: '/pages/one/tiezi/tiezi',
      })
    } else {
      wx.showModal({
        title: '未登录',
        content: '请先登陆，谢谢',
        success: function (res) {
          if (res.confirm) {
            wx.switchTab({
              url: '/pages/me/me',
            })
          } else if (res.cancel) {
            console.log('用户点击取消')

          }
        }
      })
    }

  },

  calender: function () {
    // wx.showToast({
    //   icon: 'none',
    //   title: '正在跳转...',
    // })
    wx.navigateTo({
      url: '/pages/calendar2/calendar2',
    })
  },


  query: function () {
    // console.log(' 成功')
    // wx.showToast({
    //   icon: 'none',
    //   title: '正在跳转...',
    // })
    wx.navigateTo({
      url: '/pages/one/search/search',
    })

  },




  // 选项卡
  filterTab: function (e) {
    var data = [true, true, true],
      index = e.currentTarget.dataset.index;
    data[index] = !this.data.tab[index];
    this.setData({
      tab: data
    })

  },

  //筛选项点击操作
  filter: function (e) {
    var self = this,
      id = e.currentTarget.dataset.id,
      txt = e.currentTarget.dataset.txt,
      tabTxt = this.data.tabTxt;
    switch (e.currentTarget.dataset.index) {
      case '0':
        tabTxt[0] = txt;
        self.setData({
          tab: [true, true, true],
          tabTxt: tabTxt,
          pinpai_id: id,
          pinpai_txt: txt
        });
        break;
      case '1':
        tabTxt[1] = txt;
        self.setData({
          tab: [true, true, true],
          tabTxt: tabTxt,
          jiage_id: id,
          jiage_txt: txt
        });
        break;
      case '2':
        tabTxt[2] = txt;
        self.setData({
          tab: [true, true, true],
          tabTxt: tabTxt,
          xiaoliang_id: id,
          xiaoliang_txt: txt
        });
        break;
    }
    //数据筛选
    self.getDataList();
  },

  //加载数据
  getDataList: function () {
    //调用数据接口，获取数据


  },


  // 预览图片
  previewImg: function (e) {
    let imgData = e.currentTarget.dataset.img;
    console.log("eeee", imgData[0])
    console.log("图片s", imgData[1])
    wx.previewImage({
      //当前显示图片
      current: imgData[0],
      //所有图片
      urls: imgData[1]
    })
  },


  onImageLoad: function (e) {
    // console.log(e)
  },


  mytiezi: function () {
    // wx.showToast({
    //   icon:'none',
    //   title: '正在跳转...',
    // })


    if (app.globalData.userInfo) {
      wx.navigateTo({
        url: '/pages/one/mytiezi/mytiezi',
      })
    } else {
      wx.showModal({
        title: '未登录',
        content: '请先登陆，谢谢',
        success: function (res) {
          if (res.confirm) {
            wx.switchTab({
              url: '/pages/me/me',
            })
          } else if (res.cancel) {
            console.log('用户点击取消')

          }
        }
      })
    }
  },

  look_detail: function () {
    wx.navigateTo({
      url: '/pages/one/detail2/detail2',
    })
  },


  gotoCommunity:function(){
    // this.setData({
    //   block_index:3
    // })

    wx.navigateTo({
      url: '/pages/one/community/community',
    })
  },

  gotoSearch:function(){
    wx.navigateTo({
      url: '/pages/one/search/search',
    })
  },

  toSearch: function () {
    console.log(this.data.input_content)
    if (this.data.input_content =='color'){

      wx.navigateTo({
        url: '/pages/forme/forme',
      })

    }else{
      
      wx.navigateTo({
        url: '/pages/one/search/search?input_content=' + this.data.input_content,
      })
    }
   
  },

  gotoCalendar:function(){
    wx.navigateTo({
      url: '/pages/calendar2/calendar2',
    })
  },


  input_to_search:function(e){
    console.log(e.detail.value)
    this.setData({
      input_content: e.detail.value
    })
  },
})