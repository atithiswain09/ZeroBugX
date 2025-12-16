 const aiservices=require("../services/ai.service");
 const ai = async(req,res) => {
	  
    const data=req.body;
    if(!data){
        res.status(409).json({
            message:"send data"
        });
    }
    const prompt=data.prompt;
    const response=await aiservices(prompt,);
    res.status(201).json({
        message:"It`s Your Prompt!!",response
    })
 }

 module.exports=ai;