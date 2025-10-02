import Post from '../model/post.model.js'
import { imagekit } from '../config/imagekit.js'

export const createPost = async (req, res, next) => {
  try {
    const { description } = req.body || {}
    const { id } = req.params

    if (!description) {
      return res.status(400).json({
        code: "MISSING_FIELDS",
        message: "All fields are required"
      })
    }

    // if (req.files.length === 0) return res.status(400).json({ code: "MISSING_FILE", message: "No file uploaded" });

    const uploadedUrls = [];
    for (const file of req.files) {
      const uploadResponse = await imagekit.upload({
        file: file.buffer,
        fileName: `${Date.now()}_${file.originalname}`,
        folder: "/Hive/Posts_Images",
      });
      uploadedUrls.push(uploadResponse.url);
    }


    const newPost = await Post.create({
      description, userId:id, image: uploadedUrls
    })

    res.status(201).json({ message: "Post Created!!!" })
  } catch (error) {
    next(error)
  }
}

export const getProfilePosts = async (req, res, next) => {

  const { id } = req.params
  try {
    const profilePosts = await Post.find({ userId: id }).sort({ createdAt: -1 })

    if (profilePosts.length === 0) {
      res.status(404).json({
        message: 'No posts yet'
      })
    }
    res.status(200).json({
      message: 'Fetched Successfully',
      data: profilePosts,
    });

  } catch (error) {
    next(error)
  }
}

export const deletePost = async (req, res, next) => {
  try {
    const { postId } = req.params
    if (!postId) {
      res.status(400).json({
        message: 'postId required'
      })
    }
    const deletePost = await Post.findByIdAndDelete(postId)
    if (!deletePost) {
      res.status(404).json({
        message: 'Post not found'
      })
    }
    res.status(200).json({
      message: 'Post Deleted'
    })
  } catch (error) {
    next(error)
  }
}

export const getFeed = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Post.countDocuments();

    res.status(200).json({
      page,
      limit,
      total,
      data: posts,
    });
  } catch (error) {
    next(error);
  }
};

