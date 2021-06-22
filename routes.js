const shortid = require('short-id')
const ipfsCliente =require('ipfs-http-client')
const ipfs = ipfsCliente.create({ host: 'ipfs.infura.io',port: 5001,protocol: 'https'})


function routes(app, dbe, lms, accounts){
    const db= dbe.collection('music-users')
    const music = dbe.collection('music-store')

    

    
    app.post('/register', (req,res)=>{
        let email = req.body.email
        let idd = shortid.generate()
        if(email){
            db.findOne({email}, (err, doc)=>{
                if(doc){
                    res.status(400).json({"status":"Failed", "reason":"Already registered"})
                }else{
                    db.insertOne({email, idd})
                    res.json({"status":"success","id":idd})
                }
            })
        }else{
            res.status(400).json({"status":"Failed", "reason":"wrong input"})
        }
    })

    app.post('/login', (req,res)=>{
        let email = req.body.email
        if(email){
            db.findOne({email}, (err, doc)=>{
                if(doc){
                    res.json({"status":"success","id":doc.id})
                }else{
                    res.status(400).json({"status":"Failed", "reason":"Not recognised"})
                }
            })
        }else{
            res.status(400).json({"status":"Failed", "reason":"wrong input"})
        }
    })

    app.post('/upload', async (req,res)=>{
        let buffer = req.body.buffer
        let name = req.body.name
        let title = req.body.title
        let id = shortid.generate() + shortid.generate()

        if(buffer && title){
            let ipfsHash = await ipfs.add(buffer);
            
            console.log(ipfsHash)

            // let hash = ipfsHash[0].hash
            let hash = ipfsHash.path;

            lms.sendIPFS(id, hash, {from: accounts[0]})
            .then((_hash, _address)=>{
                music.insertOne({id,hash, title,name})
                res.json({"status":"success", id})
            })
            .catch(err=>{
                res.status(500).json({"status":"Failed", "reason":"Upload error occured"})
            })
        }else{
            res.status(400).json({"status":"Failed", "reason":"wrong input"})
        }
    })

    app.get('/access/:email', (req,res)=>{
        if(req.params.email){
            db.findOne({email: req.body.email}).then(data => {
                res.json({"status":"success", data})
            }).catch((error) => {
                console.log(error);
                res.json({"status":"error", error})
            })
        }else{
            res.status(400).json({"status":"Failed", "reason":"wrong input"})
        }
    })

    app.get('/access/:email/:id', (req,res)=>{
      const id = req.params.id
      const email = req.params.email;

        if(id && email){
            db.findOne({email: email}).then(data => {
                console.log(accounts);

                lms
                .getHash(id, {from: accounts[0]})
                .then(async(hash)=>{
                    console.log('hash: ' + hash)
                    let info = await ipfs.files.read(hash)
                    res.json({"status":"success", info})
                }).catch((error) => {
                    res.json({"status":"error", error})
                })
            }).catch(error => {
                res.status(400).json({"status":"Failed", "reason":"wrong input"})
            })
        }else{
            res.status(400).json({"status":"Failed", "reason":"wrong input"})
        }
    })
}

module.exports = routes
