import { Request, Response, Router } from "express";
const router = Router();


router.get("/test",async(req: Request, res: Response)=>
{
    res.send("Hello")
})


module.exports = router