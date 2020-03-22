const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
const _ = db.command

exports.main = async (event, context) => {
  try {
    return await db.collection('join').where({
      plan: {
        plan_id: event.plan_id
      }
    }).remove()
  } catch (e) {
    console.error(e)
  }
}