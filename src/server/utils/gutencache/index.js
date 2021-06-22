var aws = require("aws-sdk");

var s3 = new aws.S3({
  accessKeyId: process.env.AWSS3KEY,
  secretAccessKey: process.env.AWSS3SECRET,
  region: process.env.AWSS3REGION,
  signatureVersion: "v4",
});

const gutencache = (ctx) =>{

    if (ctx.body) {
        var statusCode = ctx.status;
        console.log("check status code", statusCode);
        if (statusCode == 200) {
          var url = ctx.url;
          var path = ctx.path;
          var querystring = ctx.querystring;
          var key = url;
          console.log('check url', url);
          console.log('check path', path);
          console.log('check key', key);
          console.log('check querystring', querystring);
         if (key=="/") {
            key += "index.cache";
          }
          var body = ctx.body;
       
          var bufBody = Buffer.from(body);
          var bufLength = bufBody.length;
          if(bufLength < 1048576){
            
        
        var contentType = ctx.response.header['content-type'];
          var bufBodyString = bufBody.toString("base64");
          var s3response = {
            'body': bufBodyString,
            'headers': {
              "content-type": contentType,
            },
            'statusCode': statusCode,
            isBase64Encoded: true,
            'length':bufBody.length
          };
         // console.log('all set');
    
          s3set(key, s3response, 1000 * 60 * 60);
        }
        }
      }
    
      return;
    };
    export default gutencache;
    
    const s3set = (key, val, ttl)=>{
        console.log('Setting', key, 'in s3 cache');
        val.expires_at = Date.now() + ttl;
        s3.putObject({
            'ACL': 'private',
            'Bucket': process.env.AWSS3BUCKET,
            'Key': key,
            'Body': JSON.stringify(val)
        }, function(err, data){
            if(err){
                console.log('err', err);
            }
            
            return;
    
        });
    
    }
    