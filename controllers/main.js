// Controllers

exports.getPosts = (req, res, next) => {
  //some logic here
  console.log('Hello World!');
  res.status(200).json({
    posts: [{ title: 'First Post', content: 'This is the first post!' }],
  });
};

exports.postCreatePost = (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;
  // Create post in DB
  res.status(201).json({
    message: 'Post created successfully!',
    post: { id: new Date().toISOString(), title: title, content: content },
  });
};
