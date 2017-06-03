import mongoose, { Schema } from 'mongoose';
import slug from 'slug';
import uniqueValidator from 'mongoose-unique-validator';
var timestamps = require('mongoose-timestamp');

const PostSchema = new Schema({
  title:{
    type: String,
    trim: true,
    required: [true, 'Title is required!'],
    minlength: [3, 'Title need to be longer!'],
    unique: true
  },
  text:{
    type: String,
    trim: true,
    required: [true, 'Text is required'],
    minlength: [10, 'Text need to be longer!']
  },
  slug:{
    type: String,
    trim: true,
    lowercase: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  favoriteCount:{
    type: Number,
    default: 0
  }
});

PostSchema.plugin(uniqueValidator,{
  message: '{VALUE} already taken!'
});
PostSchema.plugin(timestamps);

PostSchema.pre('validate', function (next) {
  this.slugify();
  next();
})
/*
http://mongoosejs.com/docs/2.7.x/docs/methods-statics.html
*/
PostSchema.methods ={
  slugify(){
    this.slug = slug(this.title);
  },
  toJSON(){
    return  {
      _id: this.id,
      title: this.title,
      text: this.text,
      createdAt: this.createdAt,
      slug: this.slug,
      user: this.user,
      favoriteCount: this.favoriteCount
    }
  }
};
/*
Statics are pretty much the same as methods but allow for defining functions that exist directly on your Model.
*/
PostSchema.statics = {
  createPost(args, user){//args es lo mismo que req.body

    return this.create({
      ...args,
      user
    });
  },
  list( { skip = 0, limit = 5 } = {} ){
    return this.find()
                .sort( { createdAt: -1} )//lo ordena de forma descendiente
                .skip( skip )
                .limit(limit)
                .populate( 'user' );
  },
}

export default mongoose.model('Post', PostSchema);
