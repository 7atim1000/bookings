import Hotel from '../models/Hotel.js' ;
import User from '../models/User.js' ;

export const registerHotel = async(req, res) => {
    try {
        const {name, address, contact, city} = req.body ;
        const owner = req.user._id

        if (!city) {
            return res.json({ success: false, message: 'Please specefied city'})
        }

        const hotelExisting = await Hotel.findOne({name})
        if(hotelExisting) {
            res.json({ success: false, message: `Sorry this hotel name (${name}) is already in use` })
        }

        await Hotel.create({name, address, contact, city, owner});
        await User.findByIdAndUpdate(owner, {role: 'hotelOwner'});

        res.json({success: true, message: 'Hotel Registered Successfully'})

    } catch (error) {
        res.json({success: false, message: error.message})
    }
};
