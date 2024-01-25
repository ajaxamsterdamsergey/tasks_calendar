import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    start: Number,
    duration: Number,
    title: String,
  }, {
    collection: 'Tasks'
  });

const TaskModel = mongoose.models.Task || mongoose.model('Task', taskSchema);

export default TaskModel;
