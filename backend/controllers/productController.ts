import { Request, Response, Router, NextFunction } from "express";
const jwt = require('jsonwebtoken')
const Product = require('../models/product')
const User = require('../models/user')
const router = Router();

//auth middleware, check if its an authenticated user who send the request.
const authMiddleWare = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization; //get header jwt token
    if (authHeader) // if jwt token exist, verify jwt
    {
        const token = authHeader.split(" ")[1]; // remove bearer and get the token
        jwt.verify(token, process.env.JWTSECRET, (err: any, user: any) => { //verify jwt
            if (err) {
                //if error, tell user that their token is invalid
                return res.status(403).json({ Error: "Token is not valid!" });
            }
            //if token is valid, check for expiry time next
            if (user.exp * 1000 < new Date().getTime()) {
                // if the current date time is greater than the expiry time, tell frontend that their token is invalid
                return res.status(401).json({ Error: "Token is invalid" });
            }
            // if token is really valid at this stage, get the payload user email,then add the user email in the req body.
            req.user = user.email // req.user, define the type on custom.d.ts
            next();
        })
    } else {
        res.status(401).json("You are not authenticated!");
    }
}


// add product
router.post('/addProduct', authMiddleWare, async (req: Request, res: Response) => {

    const { SKU, title, imageURL } = req.body;
    // double check if the user exist in our DB to make sure he is authenticated
    const checkUser = await User.findOne({ email: req.user })

    if (checkUser) {
        try {
            // first check for existing sku and title
            const checkExistingSKU = await Product.findOne({ SKU: SKU });
            const checkExistingTitle = await Product.findOne({ title: title });
            const checkImageURL = await Product.findOne({ imageURL: imageURL });

            // if it exist, tell user that the product with that SKU exist
            if (checkExistingSKU || checkExistingTitle || checkImageURL) {
                return res.status(400).json({ Error: "Existing SKU/title/image in database!" });
            }

            //else create new product with the above request body

            const newProduct = new Product({
                SKU: SKU, title: title, imageURL: imageURL,
            });

            await newProduct.save();
            res.status(201).json({ Message: "Successfully created new product in database!" });

        } catch (err) {
            return res.status(500).json(err);
        }


    }
    else {
        // tell frontend that this guy don't exist in our DB, don't allow him to do request
        res.status(403).json("You are not allowed to do this request!");
    }

})

//edit
router.put('/editProduct/:oldSKU', authMiddleWare, async (req: Request, res: Response) => {
    const { newSKU, newTitle, newImageURL } = req.body
    const { oldSKU } = req.params;
    // double check if the user exist in our DB to make sure he is authenticated
    const checkUser = await User.findOne({ email: req.user })
    if (checkUser) {
        try {
            //search for the selected product to be updated in our db
            const selectedProduct = await Product.findOne({ SKU: oldSKU });
            //if found, most likely will always be found unless frontend send wrong data.
            if (selectedProduct) {
                //check if the req body contains empty string, else give error
                if (typeof newSKU === "string" && newSKU.trim().length === 0 ||
                    typeof newTitle === "string" && newSKU.trim().length === 0 ||
                    typeof newImageURL === "string" && newSKU.trim().length === 0) {
                    return res.status(400).json({ Error: "Invalid Request, check that it does not contain any empty strings" });
                }

                //check if the new sku/title and imageurl exist in DB
                const checkExistingSKU = await Product.findOne({ SKU: newSKU });
                const checkExistingTitle = await Product.findOne({ title: newTitle });
                const checkExistingImage = await Product.findOne({ imageURL: newImageURL })


                if (checkExistingImage || checkExistingSKU || checkExistingTitle) {

                    // if any of the above is true, next i check if the id of the existing product is not the same as the id of the user selected product.
                    // if not the same, it means that there is actually another product with the same sku/image/title in the db. If its the same,
                    // it means that the selected product and the new data has the same sku/image/title, we shouldn't block them if its coming from the same product id. 
                    if ((checkExistingImage?._id.toString() !== undefined && checkExistingImage?._id.toString() !== selectedProduct._id.toString())
                        || (checkExistingSKU?._id.toString() !== undefined && checkExistingSKU?._id.toString() !== selectedProduct._id.toString()) ||
                        (checkExistingTitle?._id.toString() !== undefined && checkExistingTitle?._id.toString() !== selectedProduct._id.toString())) {
                        return res.status(400).json({ Error: "Invalid Request, You have entered an existing image/sku/title" })
                    }

                }

                //after all checks, update the product and tell user update successfully
                await Product.findByIdAndUpdate(selectedProduct._id, { SKU: newSKU, title: newTitle, imageURL: newImageURL });

                return res.status(200).json({
                    Message: "Updated Sucessfully",
                })
            }
            else {
                //else if selected item not found, tell user that the item he selected doesn't exist in the database
                return res.status(400).json({ Error: "The item that you selected doesn't exist in the database!" })
            }
        } catch (err) {
            return res.status(500).json(err);
        }
    }
    else {
        // tell frontend that this guy don't exist in our DB, don't allow him to do request
        res.status(403).json("You are not allowed to do this request!");
    }
})


// delete an item
router.delete("/deleteProduct/:oldSKU", authMiddleWare, async (req: Request, res: Response) => {
    const { oldSKU } = req.params;
    // double check if the user exist in our DB to make sure he is authenticated
    const checkUser = await User.findOne({ email: req.user });
    if (checkUser) {
        try {
            //find the item and delete
            const deletedItem = await Product.findOneAndDelete({
                SKU: oldSKU,
            })
            //if successfully delete, tell user delete item sucess, else tell user that you cannot find the item that you delete.
            if (deletedItem) {
                res.status(200).json({ Message: "Delete item successfully" });
            }
            else {
                res.status(410).json({ Message: "Item cannot be found." });
            }

        } catch (err) {
            return res.status(500).json(err);
        }
    }
    else {
        res.status(403).json("You are not allowed to do this request!");
    }

})

// get all products

router.get("/getProducts",authMiddleWare,async (req: Request, res: Response) =>
{
       // double check if the user exist in our DB to make sure he is authenticated
    const checkUser = await User.findOne({ email: req.user });

    if(checkUser)
    {
        try {
            const allProducts = await Product.find({});
            res.status(200).json({Message:"Successfully retrived",allProducts});
        } catch (err) {
            return res.status(500).json(err);
        }
    }
    else {
        res.status(403).json("You are not allowed to do this request!");
    }
})

module.exports = router