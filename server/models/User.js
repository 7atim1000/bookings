import mongoose from 'mongoose' ;

const userSchema = mongoose.Schema ({
    _id: { type: String, required: true },
    username : { type: String, required: true },
    email : { type: String, required: true },
    image : { type: String, default :'https://utfs.io/f/c61ec63c-42b1-4939-a7fb-ed04d43e23ee-2558r.png' },
    role : { type: String, enum :['user', 'hotelOwner'], default : 'user' },
    recentSearchedCities : [{type: String, required: true}],

}, {timestamps: true});

const User = mongoose.model('User', userSchema) ;
export default User ;