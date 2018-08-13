const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const Video = mongoose.model('video');

module.exports= app=>{
    app.post('/api/addVideo',async (req,res)=>{
        console.log(req.body);
      const  {Question , Time , url } = req.body
      const video = new Video({
          Question,
          Time,
          url
      })

      const data = await video.save();
      res.send(data);
    });

    app.get('/api/fetchVideo/:id',async (req,res)=>{
       const video =  await Video.findById(req.params.id);
       res.send(video);
    })
}
