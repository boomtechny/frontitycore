
const redirection = (ctx) =>{

  if(ctx['response'].status ==404){
      //console.log('error found');
      var originalURL = ctx['url'];
      console.log('check redirection original url', originalURL);
      let baseurl = `${process.env.LOCALSITE}/js/redirects.json`;
      const request_data = {
        url: baseurl,
        method: "GET",
      };
    var firstMatch =false;
      fetch(request_data.url,{
        method: request_data.method}
      ).then((resp) => resp.json()).then((response) => {

          var redirects =response.redirects;
          var count = redirects.length; 
         
          var redirectURL = "";

         let compareLink = originalURL.replace(/\/$/, '').toLowerCase();
         //console.log('check compare link', compareLink);
          for(let i=0; i<redirects.length;i++){
            //console.log(compareLink.startsWith(redirects[i].match_url));
            let redirectListURL = redirects[i].url.replace(/\/$/, '').toLowerCase();
            //console.log('check redirectList url', redirectListURL);
           if(redirectListURL === compareLink){
             
      
              if(firstMatch==false){

             
             //if(redirects[i].match_url== compareLink){
           
               redirectURL = redirects[i].action_data.url;
               
               if (redirectURL.indexOf('://') > 0 || redirectURL.indexOf('//') === 0 ) {
                   firstMatch=true;
                  ctx.redirect(redirectURL);
              } else {
              firstMatch=true;
               // console.log('check final redirect', `http://localhost:3000`+redirectURL);
                ctx.redirect(`${process.env.LOCALSITE}`+redirectURL);
                
              }
          }
            // }
      
             }
          }

      })
      .catch(() => false );
      }
    
    else
    return;
  };
  export default redirection;
  
  