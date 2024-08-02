const responseUtils = require("utils/responseUtils")
const ownerService = require("modules/owner/services/ownerService")
const ownerController = {
    index: (req, res) => {
        // Implement your logic
        return responseUtils.ok(res, {
            'a': result
        })
    },
   createPost:async(req, res) => {
    console.log({hehe:"sdf"});
    try {
            
        const { user_id,
            title,
            content,
            image,
            author,
            category_id,
            status,
            is_stock}=req.body
        const result= await ownerService.create({ user_id,
            title,
            content,
            image,
            author,
            category_id,
            status,
            is_stock,})
        console.log({result});
        return responseUtils.ok(res,result)
    } catch (error) {
        console.log({error});
        return responseUtils.error(res,"That bai")
        
    }
   }
    
}
module.exports = ownerController