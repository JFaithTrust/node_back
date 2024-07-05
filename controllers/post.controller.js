const postService = require("../services/post.service");

class PostController{
  async getAll(req, res, next){
    try{
      const posts = await postService.getAll();
      res.status(200).json(posts);
    }catch (error) {
      next(error);
    }
  }

  async create(req, res, next){
    try {
      const post = await postService.create(req.body, req.files.picture, req.user.id);
      res.status(200).json(post);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next){
    try {
      const {id} = req.params;
      const deletedPost = await postService.delete(id);
      res.status(200).json(deletedPost);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next){
    try {
      const {id} = req.params;
      const updatedPost = await postService.update(id, req.body);
      res.status(200).json(updatedPost);
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next){
    try {
      const {id} = req.params;
      const post = await postService.getById(id);
      res.status(200).json(post);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new PostController();