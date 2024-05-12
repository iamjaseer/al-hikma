



import { Schema, model, models } from 'mongoose'

const teachersSchema = new Schema(
{
    name:String,

}, { timestamps: true })


const TeachersModel = models.post || model('teachers', teachersSchema)

export default TeachersModel;