const express = require('express');
const router = express.Router();
const Post = require('../models/post');


router.get('', (req, res, next) => {
  console.log('First  Middleware');
  // next();
  // const posts =[
  //   {
  //    id:'1',
  //   title : "title1",
  //   content: "content1"
  //   },
  //   {
  //     id:'2',
  //     title : "title2",
  //     content: "content2"
  //   }
  //
  // ];
  Post.find()
    .then(documents => {
      console.log(documents);
      res.status(200).json({
        message: 'sucess',
        status: 200,
        posts: documents
      });
    })
    .catch(err => {
      console.log(err)
    });
});
router.post("", (req, res, next) => {
  const post = new Post({
    id:req.body.id,
    title: req.body.title,
    content: req.body.content
  });
  post.save().then(createdPost => {
    res.status(201).json({
      message: "Post added successfully",
      postId: createdPost._id
    });
  });
});

router.get("/:id", (req, res, next) => {
  console.log('Inside get method ' + req.params.id);
  // console.log(Post.findById((moongoose.Types.ObjectId(req.params.id))));
  // res.status(404).json({message: 'Post not Found'});

  Post.findById(moongoose.Types.ObjectId(req.params.id))
    .then(post => {
      if (post) {

        res.status(200).json(post);
      } else {
        res.status(404).json({message: 'Post not Found'})
      }
    })
    .catch(err => {
      console.log(err);
    })
});


router.put("/:id", (req,res, next) =>{
  // console.log('Inside put method ' + id);
  // const post = new Post({
  //   title: req.body.title,
  //   content: req.body.content
  // });
  const post = ({
    title: req.body.title,
    content: req.body.content
  });

  Post.updateOne({_id: req.params.id},post)
    .then(result => {
      // console.log(result);
      res.status(200).json({
        message: 'Update Successful',
        object: post
      })
    })
    .catch( err =>{
      console.log(err);
    });
// res.send(post).json();
} );

router.delete('/:id',(req,res,next)=>{
  Post.deleteOne({_id : req.params.id })
    .then(result =>{
      res.status(200).json({
        message : 'Post deleted',
        result : result
      });
    });

});

module.exports = router;
