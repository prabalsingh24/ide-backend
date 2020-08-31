const Hubspot = require('hubspot');
const moment = require('moment');
const config = require('../config/config.json')[process.env.NODE_ENV || "development"];

class HubspotService {
  constructor(API_KEY) {
    this._client = new Hubspot({
      apiKey: API_KEY,
      checkLimit: false
    })
  }

  createOrUpdateUser(user) {
    const contactObj = [
      { "property": "firstname", "value": user.firstname + ' ' + user.lastname },
      { "property": "oneauth_id", "value": user.oneauthId },
      { "property": "platform", "value": 'ide' },
      { "property": "signupdate", "value": +moment.utc(user.createdAt).startOf('day') }
    ]
    return this._client.contacts.createOrUpdate(user.email, { properties: contactObj })
  }
}

module.exports = new HubspotService(config.hubspot.apiKey)
