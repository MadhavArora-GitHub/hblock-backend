import jwt from "jsonwebtoken";

const tokenExtractor = function(req){
    return (req && req.headers.authorization ? req.headers.authorization : null);
}

export async function authenticate(req, res, next){
    const token = tokenExtractor(req);
    if (!token){
        return res.status(401).json({
            error: `Token could not be resolved`
        });
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);

        if (payload.MSP_ID===process.env.MSP_ID && payload.ORG_NAME===process.env.ORG_NAME && payload.ORG_ID===process.env.ORG_ID){
            next();
        }
        else {
            return res.status(401).json({
                error: `Token could not be resolved`
            });
        }
    }
    catch (err){
        return res.status(500).json({ err });
    }
}

// import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
// import * as passport from "passport";

// // const cookieExtractor = function(req) {
// //     let token = null;
// //     if (req && req.headers.cookie){
// //         const cookie = req.headers.cookie;
// //         token = cookie.split("=")[1];
// //     }
// //     return token;
// // };

// const strategyOptions = {
//     jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//     secretOrKey: process.env.JWT_SECRET
// };

// export const jwtStrategy = new JwtStrategy(strategyOptions, (payload, done)=>{

//     if (process.env.MSP_ID===payload.MSP_ID && process.env.ORG_ID===payload.ORG_ID && process.env.ORG_NAME===payload.ORG_NAME){
//         return done(null, user);
//     }
//     else {
//         return done(null, false);
//     }

// });

// const authenticate = (req, res, next)=>{

//     const customAuthenticationHandler = passport.authenticate("jwt", {session: false}, (err, user)=>{
//         if (err){
//             return res.status(401).json(err);
//         }
//         if (!user){
//             return res.status(401).json({
//                 error: `JWT token could not be verified`
//             });
//         }
//         next();
//     });
//     customAuthenticationHandler(req, res, next);
    
// };