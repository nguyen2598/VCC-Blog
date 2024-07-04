const responseUtils = require("utils/responseUtils")
const authService = require("modules/auth/services/authService")
const authController = {
    index: (req, res) => {
        // Implement your logic
        return responseUtils.ok(res, {
            'a': result
        })
    },
    register:async(req,res)=>{
        try {
            
            const {username, password, email}=req.body
            const result= await authService.create({username, password, email})
            return responseUtils.ok(res,result)
        } catch (error) {
            return responseUtils.error(res,"That bai")
            
        }
    },
    login:async(req,res)=>{
        try {
            
            const { password, email}=req.body
            const result= await authService.login({ password, email})
            if(result){
            return responseUtils.ok(res,result)}
            else{
                responseUtils.error
            }
        } catch (error) {
            return responseUtils.error(res)
            
        }
    }
    
}
module.exports = authController