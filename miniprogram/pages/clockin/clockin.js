// miniprogram/pages/clockin/clockin.js

const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgList: [],
    fileIDs: [],
    input1_value: "",
    input2_value: "",
    input3_value: "",
    ani: "",
    opacity_id: 0,
    user_state:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    this.setData({
      user_state: options.user_state
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


  //选择图片
  ChooseImage() {
    wx.chooseImage({
      // count: 8 - this.data.imgList.length, //默认9,我们这里最多选择8张
      count: 1 - this.data.imgList.length,
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], //从相册选择
      success: (res) => {
        console.log("选择图片成功", res)
        if (this.data.imgList.length != 0) {
          this.setData({
            imgList: this.data.imgList.concat(res.tempFilePaths)
          })
        } else {
          this.setData({
            imgList: res.tempFilePaths
          })
        }
      }
    });
  },
  //删除图片
  DeleteImg(e) {
    wx.showModal({
      title: '要删除这张照片吗？',
      content: '',
      cancelText: '取消',
      confirmText: '确定',
      success: res => {
        if (res.confirm) {
          this.data.imgList.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            imgList: this.data.imgList
          })
        }
      }
    })
  },


  // 预览图片
  previewImage(e) {
    let imgData = e.currentTarget.dataset.img;
    // console.log("eeee", imgData[0])
    wx.previewImage({
      //当前显示图片
      current: imgData[0],
      //所有图片
      urls: imgData[0]
    })
  },




  //上传数据
  upload() {
    let input1 = this.data.input1_value
    let input2 = this.data.input2_value
    let input3 = this.data.input3_value
    let imgList = this.data.imgList
    if (input1 && input2 && imgList.length!=0) {

      wx.showLoading({
        title: '发布中...',
      })

      const promiseArr = []
      //只能一张张上传 遍历临时的图片数组
      for (let i = 0; i < this.data.imgList.length; i++) {
        let filePath = this.data.imgList[i]
        let suffix = /\.[^\.]+$/.exec(filePath)[0]; // 正则表达式，获取文件扩展名
        //在每次上传的时候，就往promiseArr里存一个promise，只有当所有的都返回结果时，才可以继续往下执行
        promiseArr.push(new Promise((reslove, reject) => {
          wx.cloud.uploadFile({
            cloudPath: new Date().getTime() + suffix,
            filePath: filePath, // 文件路径
          }).then(res => {
            // get resource ID
            console.log("上传结果", res.fileID)
            this.setData({
              fileIDs: this.data.fileIDs.concat(res.fileID)
            })
            reslove()
          }).catch(error => {
            console.log("上传失败", error)
          })
        }))
      }


      //获取当前时间戳  
      var timestamp = Date.parse(new Date());
      timestamp = timestamp / 1000;
      console.log("当前时间戳为：" + timestamp);
      var n = timestamp * 1000;
      var date = new Date(n);
      //年  
      var Y = date.getFullYear();
      //月  
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
      //日  
      var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
      //时  
      var h = date.getHours();
      //分  
      var m = date.getMinutes();
      //秒  
      var s = date.getSeconds();


      if (!input3) {
        //保证所有图片都上传成功
        Promise.all(promiseArr).then(res => {


          wx.cloud.database().collection('clockin').add({
            data: {

              user_info: app.globalData.userInfo,
              // date: Y + M + D ,
              date: M + "月" + D + "日",
              createTime: h + ":" + m + ":" + s,

              images: this.data.imgList,


              sport_time: input1,
              sport_distance: input2,

              fileIDs: this.data.fileIDs,
            },
            success: res => {
              wx.hideLoading()
              wx.showToast({
                title: '发布成功',
              })
              console.log('发布成功', res)

              var pages = getCurrentPages(); // 当前页面
              var beforePage = pages[pages.length - 2]; // 前一个页面

              wx.navigateBack({
                delta: 1, // 返回上一级页面 
                success: function() {
                  beforePage.load(); // 执行前一个页面的onLoad方法
                }
              })
            },
            fail: err => {
              wx.hideLoading()
              wx.showToast({
                icon: 'none',
                title: '网络不给力....'
              })
              console.error('发布失败', err)
            }
          })
        })

      } else if (this.data.imgList && this.data.user_state==2) {
        //保证所有图片都上传成功
        Promise.all(promiseArr).then(res => {


          wx.cloud.database().collection('clockin_team').add({
            data: {

              user_info: app.globalData.userInfo,
              // date: Y + M + D ,
              date: M + "月" + D + "日",
              createTime: h + ":" + m + ":" + s,

              images: this.data.imgList,

              sport_time: input1,
              sport_distance: input2,
              sport_team_id: input3,

              fileIDs: this.data.fileIDs,
            },
            success: res => {
              wx.hideLoading()
              wx.showToast({
                title: '发布成功',
              })
              console.log('发布成功', res)

              var pages = getCurrentPages(); // 当前页面
              var beforePage = pages[pages.length - 2]; // 前一个页面

              wx.navigateBack({
                delta: 1, // 返回上一级页面 
                success: function() {
                  beforePage.load(); // 执行前一个页面的onLoad方法
                }
              })
            },
            fail: err => {
              wx.hideLoading()
              wx.showToast({
                icon: 'none',
                title: '网络不给力....'
              })
              console.error('发布失败', err)
            }
          })
        })

      }
    } 
    else{
      wx.hideLoading()
      wx.showToast({
        icon: "none",
        title: '请补全信息'
      })
      return
    }


  },


  input1: function(e) {
    console.log(e)
    this.setData({
      input1_value: e.detail.value
    })
  },

  input2: function(e) {
    console.log(e)
    this.setData({
      input2_value: e.detail.value
    })
  },

  input3: function(e) {
    console.log(e.detail.value)
    this.setData({
      input3_value: e.detail.value
    })
    if (e.detail.value.length == 4) {
      var animation = wx.createAnimation({
        duration: 1000,
        timingFunction: 'ease',
        delay: 0
      });
      animation.opacity(1).translate(0, 0).step()
      this.setData({
        ani: animation.export()
      })
    }


  },
})