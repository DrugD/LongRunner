// pages/one/detail.js
var WxParse = require('../../../wxParse/wxParse.js');

const db = wx.cloud.database({});
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: [],
    table_type: '',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)

    // var bean = JSON.parse(unescape(options.data));
    var id = "1"
    if (options.race_id) {
      this.getRaceInfo(options.race_id)
    } else {
      this.getRaceInfo(id)
    }

    console.log(this.data.content)




  },

  getRaceInfo: function(id) {
    // var that =this
    // db.collection('table_1').doc(id).remove({
    //   success: function (res) {
    //     console.log(res)
    //     that.setData({
    //       // content: ,
    //       // table_type:bean.table_type
    //     })
    //   }
    // })

    // const _ = db.command

    // db.collection('table_1').where({
    //   _id: id
    // }).get({
    //   success: function (res) {
    //     console.log(res)
    //   }
    // })

    const db = wx.cloud.database()
    db.collection('table_1').doc(id).get().then(res => {
      console.log("比赛详情：", res.data)
      var temp = res.data
      temp.booking_start_date = temp.booking_start_date.toLocaleDateString()
      temp.booking_end_date = temp.booking_end_date.toLocaleDateString()
      temp.draw_time = temp.draw_time.toLocaleDateString()
      temp.malasong_time = temp.malasong_time.toLocaleDateString()
      this.setData({
        content: temp,
      })
      var article = res.data.rule_text;
       
      /**
       * WxParse.wxParse(bindName , type, data, target,imagePadding)
       * 1.bindName绑定的数据名(必填)
       * 2.type可以为html或者md(必填)
       * 3.data为传入的具体数据(必填)
       * 4.target为Page对象,一般为this(必填)
       * 5.imagePadding为当图片自适应是左右的单一padding(默认为0,可选)
       */
      var that = this;
      WxParse.wxParse('article', 'html', article, that, 3);
      
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


  wxParseTagATap: function(res) {
    console.log(
      res, "ss"
    )

    wx.setClipboardData({
      //去找上面的数据
      data: res.currentTarget.dataset.src,
      success: function(res) {
        wx.showToast({
          title: '已复制该文本',
        });
      }
    });


  },

  down2:function(){
    
  },

  down: function() {
    var that = this
    var url = this.data.content.malasong_word_url

    wx.showModal({
      title: '下载提示',
      content: '手机端的小程序中仅作预览，如若想下载文件请打开浏览器粘贴已复制的文件链接。',
      cancelText: '取消',
      confirmText: '预览',
      success(res) {
        if (res.cancel) {
          // var that = this;
          wx.setClipboardData({
            //去找上面的数据
            data: url,
            success: function(res) {
              wx.showToast({
                title: '已复制文件网址链接',
              });
            }
          });
        } else if (res.confirm) {
          // 用户点击了确定属性的按钮


          // var that = this
          that.downloadfile(url)

          wx.setClipboardData({
            //去找上面的数据
            data: url,
            success: function(res) {
              wx.showToast({
                title: '已复制文件网址链接',
              });
            }
          });
        }
      }
    })



    // wx.downloadFile({
    //   url: "https://7275-runner-xei7u-1301166162.tcb.qcloud.la/ld%20runner%E8%A1%A5%E5%85%85%E4%BB%8B%E7%BB%8D.docx?sign=bae6f5f237af2adb2820c1326284ff7b&t=1583942354",
    //   filePath: '',
    //   success(res) {
    //     console.log('下载成功')
    //     console.log('存放路径:', res.tempFilePath)
    //     console.log('状态码:', res.statusCode)
    //     // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
    //     if (res.statusCode === 200) {
    //       wx.playVoice({
    //         filePath: res.tempFilePath
    //       })
    //     }
    //   }
    // })


    // wx.navigateTo({
    //   url: 'web',
    // })


    // wx.cloud.downloadFile({
    //   fileID: 'cloud://runner-xei7u.7275-runner-xei7u-1301166162/ld runner补充介绍.docx', // 文件 ID
    //   success: res => {
    //     // 返回临时文件路径
    //     console.log(res.tempFilePath)

    //   },
    //   fail: console.error
    // })






  },


  downloadfile: function(url) {
    var url = url;
    //下载文件，生成临时地址
    wx.downloadFile({
      url: url,
      success(res) {
        // console.log(res)
        //保存到本地
        wx.saveFile({
          tempFilePath: res.tempFilePath,
          success: function(res) {
            const savedFilePath = res.savedFilePath;
            // 打开文件
            console.log(savedFilePath)
            wx.openDocument({
              filePath: savedFilePath,
              success: function(res) {
                console.log('打开文档成功')
              },
            });
          },
          fail: function(err) {
            console.log('保存失败：', err)
          }
        });
      }
    })
  },

})