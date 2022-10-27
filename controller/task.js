const Task = require('../model/task')

class TaskController {
    constructor() {}

    async create(req, res) {
        const task = await new Task(req.body).save();
        return res.status(200).json({ success: true, data: task, message: "New Task Created" });
    }

    async update(req, res, next) {
        // for delete (delete = true)  
        // for update status (status = 0 , 1, 2, 3)
        // for expiry (expiry = true)
        let task = await Task.findOne({ _id: req.body.id });
        let updates = Object.keys(req.body)
        updates.forEach((update) => task[update] = req.body[update])
        await task.save()
        res.status(200).send({ success: true, data: task, message: "Successfully Updated task Details " })
    }

    async list(req, res) {
        const limit = parseInt(req.body.limit)
        const page = parseInt(req.body.page)
        const skip = (page - 1) * limit
        let list = await Task.find({deleted: false}).sort({ _id: -1 }).skip(skip).limit(limit)
        let count = await await Task.find({deleted: false}).countDocuments();
        let output = {
            list,
            count,
        }
        return res.status(200).json({ success: true, data: output, message: "Task Listed !" });
    }

    async expirylist(req, res) {
        const limit = parseInt(req.body.limit)
        const page = parseInt(req.body.page)
        const skip = (page - 1) * limit
        let list = await Task.find({expiry: true}).sort({ _id: -1 }).skip(skip).limit(limit)
        let count = await await Task.find({deleted: false}).countDocuments();
        let output = {
            list,
            count,
        }
        return res.status(200).json({ success: true, data: output, message: "Task Listed !" });
    }
}

module.exports = TaskController