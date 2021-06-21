
var aws = require('aws-sdk');

var s3 = new aws.S3({
	'accessKeyId': process.env.AWSS3KEY,
	'secretAccessKey': process.env.AWSS3SECRET,
	'region': process.env.AWSS3REGION,
	'signatureVersion': 'v4'
});

const gutencache = (ctx) =>{
console.log('check server ctx', ctx.body);

    return;
};
export default gutencache;

const s3set = (key, val, ttl, cb)=>{
	console.log('Setting', key, 'in s3 cache');
	val.expires_at = Date.now() + ttl;
	s3.putObject({
		'ACL': 'private',
		'Bucket': process.env.AWSS3BUCKET,
		'Key': key,
		'Body': json.stringify(val)
	}, cb);
}
/*
module.exports.s3set = function(key, val, ttl, cb) {
	console.log('Setting', key, 'in s3 cache');
	val.expires_at = _.now() + ttl;
	s3.putObject({
		'ACL': 'private',
		'Bucket': 'ndr-frontity-cache',
		'Key': key,
		'Body': json.stringify(val)
	}, cb);
};
*/
/*exports.handler = async (event) => {
    // TODO implement
    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!'),
    };
    return response;
};
*/