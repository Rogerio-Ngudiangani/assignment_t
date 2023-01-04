const router = require("express").Router()
const Category = require("../models/Category")

//CREATE CATEGORY
router.post("/", async (req, res) => {
    const newcat = new Category(req.body)
    try {
        const savedCat =  await newcat.save()
        res.status(200).json(savedCat)
    }
    catch(err) {
        res.status(500).json(err)
    }
}
)

//GET ALL CATEGORIES
router.get("/", async (req, res) => {
    try {
        const cats =  await Category.find()
        res.status(200).json(cats)
    }
    catch(err) {
        res.status(500).json(err)
    }
}
)

router.put("/:id", async (req, res) => {
        try{ 
                const updatedPost = await Category.findByIdAndUpdate(req.params.id,{$set: req.body,}, {new: true})
                res.status(200).json(updatedPost)
        } catch(err) {
            res.status(500).json(err)
        }
  
})

module.exports = router