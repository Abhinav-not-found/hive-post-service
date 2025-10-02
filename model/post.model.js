import mongoose from 'mongoose'

const postSchema = mongoose.Schema({
  description: {
    type: String,
    required: true,
    trim: true,
    maxlength: [150, "Name cannot exceed 30 characters"],
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  image: {
    type: [String],
    default: [],
    validate: [arr => arr.length <= 5, 'Maximum 5 images allowed'],
  },
},
  { timestamps: true }
);

const Post = mongoose.model('Post', postSchema)

export default Post
