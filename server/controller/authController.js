const bcrypt = require("bcryptjs")

module.exports ={

    signupUser:(req, res)=>{
        const {name, password,email,image } = req.body
        
        const db = req.app.get("db")
        db.verify_User(email).then(userEmail =>{
            

            if(userEmail[0]){
                res.status(403).json("Looks like You Already Got An Account")
            } else{
                bcrypt.hash(password,10).then(newPassword =>{
                    db.signup(name, newPassword, email).then((newUser)=>{
                        req.session.user ={
                            name, email, image 
                        }
                        res.status(200).json(req.session.user)
                    }).catch(err => console.log(err))
                }).catch(err => console.log(err))

            }
        }).catch(err => console.log(err))
    },

    login:(req,res) =>{
        
        const {email, password} = req.body
        const db = req.app.get("db")
        db.verify_User(email).then(user =>{
             if(user[0]){
                bcrypt.compare(password, user[0].password).then(matchedPassword =>{
                    if(matchedPassword){
                        
                        req.session.user ={
                            name: user[0].name,
                            email:user[0].email,
                            image: user[0].image,
                            user_id:user[0].user_id
                        }
                        
                        res.status(200).json(req.session.user)
                    }else{
                        res.status(403).json("Email Or Password Is Incorrect")
                    }
                })
             }else {
                 res.status(404).json("You Don't Have An Account")
             }
        })

    },

    addItem:(req, res) =>{
        const {name, picture,price,description,location} =req.body
        const {user_id} = req.session.user
        
        
        const db = req.app.get("db")
        db.insert_item([name, picture,price,description,location, user_id])
        .then((items =>{
            res.status(200).json(items)
        })).catch((err=>{
            console.log(err);
            res.status(500).send("can't load the data")
        }))


    },

    getItems:(req, res) =>{
        const db = req.app.get("db")

        db.get_items().then((responce)=>{

            res.status(200).json(responce)
        })
    },

    getItem:(req,res)=>{
        const db = req.app.get("db")
       
        db.getting_one(+req.params.id).then(responce =>{
            res.status(200).json(responce)
            
        })


    },

    checkUser: (req, res,next )=>{
        
            const {session} = req
            res.status(200).json(session.user)
            

    },
    logout:(req, res) =>{
        
        req.session.destroy()
          res.sendStatus(200)

    },

    searchedItems:(req, res)=>{
        const {item} = req.params
        const db = req.app.get("db") 
        db.search("%"+item+"%").then( responce =>{
            res.status(200).json(responce)
        })

    },
    getPost:(req,res) =>{
        const {user_id} = req.session.user
        const db = req.app.get("db")
        db.getpost(user_id).then(responce =>{
            res.status(200).json(responce)
        })
    },
    changePrice:(req, res) =>{
        const {item_id, price} = req.params
        const db = req.app.get("db")
        db.changePrice([price,item_id])

    },
    deleteItem:(req, res) =>{
        const db = req.app.get("db")
        db.deleteItem(+req.params.id)
       
    },
    getSaller:(req, res) =>{
        
        const db = req.app.get("db");
            db.gettingUserId(+req.params.id).then(responce =>{
                
               

            db.gettingSeller(responce[0].user_id).then(responce =>{
                
            res.status(200).json(responce)
            })
        })
        
    },
    changePicture:(req,res) =>{
        
        
        const {user_id} = req.session.user
        const db = req.app.get("db");
        db.changePicture([req.body.image, user_id]).then(responce =>{
            
            res.status(200).json(responce)
        })
        
        

    }

}