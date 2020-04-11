const Minio = require('minio')
const v4 =  require('uuid/v4')
const axios = require('axios')
const config = require('../config/config.json')[process.env.NODE_ENV || 'development' ]

const client = new Minio.Client({
  endPoint: config.S3.endPoint,
  port: +config.S3.port,
  useSSL: !!config.S3.useSSL,
  accessKey: config.S3.accessKey,
  secretKey: config.S3.secretKey,
  region: config.S3.region
})

const urlForFilename = (bucket, filename) => `http${config.S3.ssl ? 's': ''}://${config.S3.endpoint}/${bucket}/${filename}`

/**
 * Uploads an object to s3 encoded as json
 * @param {object} object
 * @param {string} filename The filename (Default = randomized)
 * @param {string} bucket The bucket name (Default = picked from config.json)
 * @returns {Promise<savedFile>} The etag and url for the file saved
 */
const upload = function (object, filename = v4() + '.json' ,bucket = config.S3.bucket) {
  return new Promise((resolve, reject) => {
    client.putObject(bucket, filename, JSON.stringify(object), function(err, etag) {
      if (err) return reject(err)
      resolve({etag, url: urlForFilename(bucket, filename) })
    })
  })
}

/**
 * Downloads a file from url and encodes it 
 * @param {string} url
 * @param {string} enc (Default = 'base64')
 * @returns {Promise<string>} the downloaded file encoded as specified
 */
const download = async function (url, enc = 'base64') {
  if (!url) return ''
   
  const {data} = await axios.get(url)
  return Buffer.from(data).toString(enc)
}

module.exports = {
  urlForFilename,
  upload,
  download
}
