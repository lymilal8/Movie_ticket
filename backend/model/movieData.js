const mongoose= require('mongoose');
const movieSchema=mongoose.Schema({
    movie_name:String,
    img_url:String,
    category:String,
    languages:String,
    cast:String,
    description:String,
    ticket_rate:String,
    no_seats:String,
   
});
const movieModel=mongoose.model('moviedata',movieSchema);
module.exports=movieModel;