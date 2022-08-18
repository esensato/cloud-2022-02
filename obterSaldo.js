
function main(params) {
    
    var auth = require('ibm-watson/auth');
    var Cloudant = require('@ibm-cloud/cloudant');
    
    const authenticator = new auth.IamAuthenticator({apikey: 'cBmlW3by0F7Bt8CffByrPhGamibE76Al7itQ0WBR_KEK'});

    var cloudant = Cloudant.CloudantV1.newInstance( {authenticator: authenticator });
    cloudant.setServiceUrl('https://636e6945-34c2-4ece-8060-eb5dc7f92f5b-bluemix.cloudantnosqldb.appdomain.cloud');
    

    return new Promise((ok, erro) => {
        
        cloudant.postSearch({ db: 'saldo', ddoc: "buscaUsername", query: "username:" + params.username, index: "username", includeDocs: true})
        .then(data => {
            ok( { body: {saldo: data.result.rows[0].doc.saldo } } )
        })
        .catch(error => {
            erro(error)
        }); 

    });
    
}
