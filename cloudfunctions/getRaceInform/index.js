const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
exports.main = async (event, context) => {
  // try {
  //   return await db.collection('table_1').doc(event.id).get()
  // } catch (e) {
  //   console.error(e)
  // }

  db.collection('table_1').doc(event.id).get({
    success: function (res) {
      console.log(res.data)
    },
    fail: console.error
  })

}