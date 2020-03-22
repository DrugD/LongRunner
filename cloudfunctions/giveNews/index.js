// const cloud = require('wx-server-sdk')
// cloud.init()
// exports.main = async (event, context) => {
//   try {
//     const result = await cloud.openapi.customerServiceMessage.send({
//       touser: "obWjn5S_XMlxps8hP9FDLciuHgbQ",
//       msgtype: 'text',
//       text: {
//         content: 'Hello World'
//       }
//     })
//     console.log(result)
//     return result
//   } catch (err) {
//     console.log(err)
//     return err
//   }
// }

// page: '/pages/planmanage/history', // 订阅消息卡片点击后会打开小程序的哪个页面
// data: [], // 订阅消息的数据
// templateId: "M7yCio8lxhDSZwzaLFI1QmYSh0XSof5hgOe7fz64WUo", // 订阅消息模板ID
// done: false, // 消息发送状态设置为 false
// templateId: 'M7yCio8lxhDSZwzaLFI1QmYSh0XSof5hgOe7fz64WUo',



const cloud = require('wx-server-sdk')
cloud.init()
exports.main = async (event, context) => {
  console.log("event:", event)
  var info = event.plan_time + event.plan_place + event.plan_type
  try {
    const result = await cloud.openapi.subscribeMessage.send({
      touser: event.touser,
      page: '/pages/two/two',
      data: {
        thing1: {
          value: '训练参与提示'
        },
        thing2: {
          value: event.userInfo_nickName + '加入了您的训练'
        },
        // date3: {
        //   value: 'TIT创意园'
        // },
        thing5: {
          value: info
        }
        // phrase5: {
        //   value: '广州市新港中路397号'
        // }
      },
      templateId: event.templateId
    })
    console.log(result)
    return result
  } catch (err) {
    console.log(err)
    return err
  }
}

// const cloud = require('wx-server-sdk')
// cloud.init()
// exports.main = async (event, context) => {
//   try {
//     const result = await cloud.openapi.customerServiceMessage.send({
//       touser: 'obWjn5S_XMlxps8hP9FDLciuHgbQ',
//       msgtype: 'text',
//       text: {
//         content: 'Hello World'
//       }
//     })
//     console.log(result)
//     return result
//   } catch (err) {
//     console.log(err)
//     return err
//   }
// }

// const cloud = require('wx-server-sdk')
// cloud.init()

// exports.main = async (event, context) => {
//   try {
//     const result = await cloud.openapi.templateMessage.send({
//       touser: 'obWjn5S_XMlxps8hP9FDLciuHgbQ',
//       msgtype: 'text',
//       text: {
//         content: 'Hello World'
//       }
//     })
//     // result 结构
//     // { errCode: 0, errMsg: 'openapi.templateMessage.send:ok' }
//     return result
//   } catch (err) {
//     // 错误处理
//     // err.errCode !== 0
//     throw err
//   }
// }