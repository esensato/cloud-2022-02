
function main(params) {
    
    var auth = require('ibm-watson/auth');
    var Cloudant = require('@ibm-cloud/cloudant');
    
    const authenticator = new auth.IamAuthenticator({apikey: ''});

    var cloudant = Cloudant.CloudantV1.newInstance( {authenticator: authenticator });
    cloudant.setServiceUrl('');
    

    return new Promise((ok, erro) => {
        
cloudant.postAllDocs({
  db: 'pacotes',
  includeDocs: true,
  limit: 10
}).then(data => {

        let ret = '<ul>';
        
        data.result.rows.forEach((valor) => {
            
            if (valor.doc.id) {
                ret += '<li>' + valor.doc.id + ', ' + valor.doc.destino + ', ' + valor.doc.preco + '</li>';
                
            }


        })
        
        ret += "</ul>"
            
        console.log(ret)
            ok( { body: {resultado: ret } } )
        })
        .catch(error => {
            erro(error)
        }); 

    });
    
}
