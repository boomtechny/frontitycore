
const redirection = (ctx) =>{

    if(ctx['response'].status ==404){
        console.log('error found');
        var originalURL = ctx['url'];
        console.log('check original url', originalURL);
        let baseurl = `${process.env.LOCALSITE}/js/redirects.json`;
        const request_data = {
          url: baseurl,
          method: "GET",
        };
      
        fetch(request_data.url,{
          method: request_data.method}
        ).then((resp) => resp.json()).then((response) => {

            var redirects =response.redirects;
            var count = redirects.length; 
           
            var redirectURL = "";
           let compareLink = originalURL.toLowerCase();
          // console.log('check compare link', compareLink);
            for(let i=0; i<redirects.length;i++){
              //console.log(compareLink.startsWith(redirects[i].match_url));
             if(compareLink.includes(redirects[i].match_url)==true){
               
          
             
               //if(redirects[i].match_url== compareLink){
                 redirectURL = redirects[i].action_data.url;
                 ctx.redirect(redirectURL);
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
    
    