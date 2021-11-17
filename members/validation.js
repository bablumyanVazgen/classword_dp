const { body } = require('express-validator');
const { db } = require('../database/connection');

const create = [ 
    body('first_name').notEmpty().isLength({min : 3, max : 6}).trim().isString(),
    body('last_name').notEmpty().isLength({min : 4, max : 255}).trim().isString(),
    body('user_name').isString().isLength({min : 3, max : 100}).notEmpty().trim() 
    .custom(async (value) => {
        let sql = `SELECT user_name FROM members where user_name='${value}'`;
        let data =  new Promise((resolve, reject)=>{
          db.query(sql,(err, result ) => {
         
          if(err) reject(err);
          resolve(result)
  });
})

  let result = await data;

  if(result.length){
    return Promise.reject("This username already exists please enter another username.")

}

return true;
}),
    body('email').isEmail().notEmpty().trim().normalizeEmail().withMessage('incorrect email.').isLength({max : 100})
    .custom(async (value) => {
            let sql = `SELECT email FROM members where email='${value}'`;
            let data =  new Promise((resolve, reject)=>{
              db.query(sql,(err, result ) => {

              if(err) reject(err);

              resolve(result)
  
      });
  })

    let result = await data;
  
    if(result.length){
        return Promise.reject("This email is already in use.")
    
    }

    return true;
}),
//
     body('date_of_birthday').isDate({format: 'YYYY/MM/DD'}).withMessage("please enter your birthday in this format 'YYYY/MM/DD'")
     .isAfter("1900-01-01").withMessage("date of birthday must be above 1900").isBefore("2000-01-01").withMessage("date of birthday must be before 2000"),
 //  body('created_at').isDate([2002-07-15, new Date()])

];

const update = [
  
];

module.exports = {
    create,
    update
}