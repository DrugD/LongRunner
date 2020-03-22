// var that;
// Page({
//   data: {
//     images: [],
//     uploadedImages: [],
//     //imageWidth: getApp().screenWidth / 4 - 10
//   },
//   onLoad: function (options) {
//     that = this; var objectId = options.objectId; console.log(objectId);
//   },
//   chooseImage: function () {
//     // 选择图片
//     wx.chooseImage({
//       count: 3, // 默认9
//       sizeType: ['compressed'],
//       sourceType: ['album', 'camera'],
//       // 可以指定来源是相册还是相机，默认二者都有
//       success: function (res) {
//         // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
//         var tempFilePaths = res.tempFilePaths;
//         console.log(tempFilePaths);
//         that.setData({
//           images: that.data.images.concat(tempFilePaths)
//         });
//       }
//     })
//   },
//   // 图片预览
//   previewImage: function (e) {
//     //console.log(this.data.images);
//     var current = e.target.dataset.src
//     wx.previewImage({
//       current: current,
//       urls: this.data.images
//     })
//   },
//   submit: function () { 

//     console.log(that.data.images)  

//     // // 提交图片，事先遍历图集数组
//     // that.data.images.forEach(function (tempFilePath) {
//     //   new AV.File('file-name', {
//     //     blob: {
//     //       uri: tempFilePath,
//     //     },
//     //   }).save().then(                
//     //     // file => console.log(file.url())
//     //   function (file) {                    
//     //     // 先读取
//     //     var uploadedImages = that.data.uploadedImages;
//     //     uploadedImages.push(file.url());                    
//     //     // 再写入
//     //     that.setData({
//     //       uploadedImages: uploadedImages
//     //     }); console.log(uploadedImages);
//     //   }
//     //   ).catch(console.error);
//     // });
//     // wx.showToast({
//     //   title: '评价成功', success: function () {
//     //     wx.navigateBack();
//     //   }
//     // });
//   }, 

//   delete: function (e) {
//     var index = e.currentTarget.dataset.index; var images = that.data.images;
//     images.splice(index, 1);
//     that.setData({
//       images: images
//     });
//   },



// })


var util = require('../../../utils/util.js')


let app = getApp();
Page({
  data: {
    imgList: [],
    fileIDs: [],
    desc: '',
    text_height: 0,
    currentWordNumber: 0,
  },

  onLoad: function() {
    var height = wx.getSystemInfoSync().windowHeight
    height = height - 175 - 20
    this.setData({
      text_height: height,
    })




  },



  //获取输入内容
  getInput(event) {

    var value = event.detail.value;
    var len = parseInt(value.length);
    if (len > this.data.max) return;

    this.setData({
      currentWordNumber: len
    });
    if (this.data.currentWordNumber == 1000) {
      wx.showModal({
        title: '提示',
        content: '您输入的字数已达上限',
      })
    }


    // console.log("输入的内容", event.detail.value)
    this.setData({
      desc: event.detail.value
    })
  },


  msgSecCheck: function(text) {
    var pass
    console.log(text)
    wx.request({
      url: 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx53f2e571f7ceee9b&secret=8b680c2a34f722559bbcfd55f838e799',
      method: 'GET',
      success: res => {
        var access_token = res.data.access_token;
        wx.request({
          method: 'POST',
          url: `https://api.weixin.qq.com/wxa/msg_sec_check?access_token=${access_token}`,
          data: {
            content: text
          },
          success(res) {
            console.log(res.data.errcode)
            if (res.data.errcode != "87014") {
              // 合格
              // return "1"
              pass = true
            } else {
              pass = false
            }
          }
        })
      },
      fail() {
        console.log(res);
        pass = false
      }
    })
    return pass;
  },



  //选择图片
  ChooseImage() {
    wx.chooseImage({
      // count: 8 - this.data.imgList.length, //默认9,我们这里最多选择8张
      count: 3 - this.data.imgList.length,
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
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

  //上传数据
  publish() {
    let desc = this.data.desc
    let imgList = this.data.imgList
    if (!desc || desc.length < 1) {
      wx.showToast({
        icon: "none",
        title: '稍微写点啥吧'
      })
      return
    }
    // console.log("(desc):", desc)
    // // this.msgSecCheck(desc)
    // var temp = this.msgSecCheck(desc)
    // console.log("this.msgSecCheck(desc):", temp)
    // if (this.msgSecCheck(desc)){
    // if (!imgList || imgList.length < 1) {
    //   wx.showToast({
    //     icon: "none",
    //     title: '请选择图片'
    //   })
    //   return
    // }
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

    // console.log("当前时间：" + Y + M + D + h + ":" + m + ":" + s);  

    // let cloud = require('wx-server-sdk');

    // cloud.init();
    // let db = cloud.database();


    //保证所有图片都上传成功
    Promise.all(promiseArr).then(res => {
      wx.cloud.database().collection('timeline').add({
        data: {
          fileIDs: this.data.fileIDs,


          user_info: app.globalData.userInfo,
          // date: Y + M + D ,
          date: M + "月" + D + "日",
          createTime: h + ":" + m + ":" + s,
          desc: this.data.desc,
          images: this.data.imgList
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

          // wx.switchTab({
          //   url: '/pages/one/one',
          // })

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

    // }else{
    //   wx.showToast({
    //     icon: "none",
    //     title: '嘴巴放干净！'
    //   })
    // }

  },
})