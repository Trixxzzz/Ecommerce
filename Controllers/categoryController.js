import asyncHandler from '../Middlewares/asyncHandler.js';
import Category from '../Models/categoryModel.js';

const createCategory = asyncHandler(async (req, res) => {
    try {
        const { name } = req.body;

        if(!name){
            return res.json({error:"Name is required"})
        }
        const existingCategory = await Category.findOne({name})

        if(existingCategory){
            return res.json({error:"Already exists"});
        }
        const category = await new Category({name}).save()
        res.json(category)
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});

const updateCategory=asyncHandler(async(req,res)=>{
    try {
        const {name} = req.body;
        const {categoryId} = req.params;
        const category = await Category.findOne({_id:categoryId})
        if(!category){
            return res.status(400).json({error:"Category not found"})
        }
        category.name=name;
        const updatedCategory=await category.save()
        res.json(updatedCategory)
    }
    catch (err) {
        res.status(500).json({ msg: err.message });
    }
}) 
const removeCategory=asyncHandler(async(req,res)=>{
    try  {
        const removed=await Category.findByIdAndDelete(req.params.categoryId)
        res.json(removed)
    }
    catch (err) {
        res.status(500).json({ msg: err.message });
    }

})
const listCategory=asyncHandler(async(req,res)=>{
    try {
        const categories=await Category.find()
        res.json(categories)
    }
    catch (err) {
        res.status(500).json({ msg: err.message });
    }
})
const readCategory=asyncHandler(async(req,res)=>{
    try {
        const oneCategory=await Category.findOne({_id:req.params.id})
        res.json(oneCategory)
    }
    catch (err) {
        res.status(500).json({ msg: err.message });
    }
})
export { createCategory ,updateCategory,removeCategory,listCategory,readCategory};
