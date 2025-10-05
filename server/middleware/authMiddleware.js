import User from '../models/User.js' ;

//Middleware to check if user is authentication 
export const protect = async (req, res, next) =>{
    
    const {userId} = req.auth() ;
    if (!userId) {
        res.json({success: false, message: 'not Authenticated'})
    
    } else {
        const user = await User.findById(userId) ;
        req.user = user ;
        next();
    }
};


// export const protect = async (req, res, next) => {
//     try {
//         const token = req.header('Authorization')?.replace('Bearer ', '');
        
//         if (!token) {
//             return res.status(401).json({ message: 'No token, authorization denied' });
//         }

//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = decoded; // This should contain the user data including _id
//         next();
//     } catch (error) {
//         console.error('Auth middleware error:', error);
//         res.status(401).json({ message: 'Token is not valid' });
//     }
// };