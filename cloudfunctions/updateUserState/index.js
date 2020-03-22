

const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
const _ = db.command

exports.main = async (event, context) => {
  try {
    return await db.collection('User').where({
      _openid: event.openid
    })
      .update({
        data: {
          team_name_id: _.push(event.team_id)
        }
      }).then(res => {

        console.log(res)

      })

  } catch (e) {
    console.error(e)
  }
}