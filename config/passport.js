const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const User = require("../models/User");

module.exports = function (passport) {
  passport.use(
    "google-signup",
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google-signup/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        //get the user data from google
        const newUser = {
          googleId: profile.id,
          displayName: profile.displayName,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          image: profile.photos[0].value,
          email: profile.emails[0].value,
        };

        try {
          //find the user in our database
          let user = await User.findOne({ googleId: profile.id });

          if (user) {
            //If user present in our database.
            done(null, user);
          } else {
            // if user is not preset in our database save user data to database.
            user = await User.create(newUser);
            
            done(null, user);
          }


          req.session.googleId

        } catch (err) {
          console.error(err);
        }
      }
    )
  );

  passport.use(
    "google-signin",
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google-signin/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        //get the user data from google
        // const newUser = {
        //   googleId: profile.id,
        //   displayName: profile.displayName,
        //   firstName: profile.name.givenName,
        //   lastName: profile.name.familyName,
        //   image: profile.photos[0].value,
        //   email: profile.emails[0].value,
        // };

        try {
          //find the user in our database
          let user = await User.findOne({ googleId: profile.id });

          if (user) {
            //If user present in our database.
            done(null, user);
          } else {
            // if user is not preset in our database save user data to database.
            user = await User.create(newUser);
            done(null, user);
          }
        } catch (err) {
          console.error(err);
        }
      }
    )
  );

  // used to serialize the user for the session
  passport.serializeUser(async (user, done) => {
    if(user){
      return done(null, user.id);
    } 
      return done(null, false);
  
  });

  // used to deserialize the user
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById({ _id: id });
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  });
};

// module.exports = function (passport) {
//   passport.use(
//     "google-signin",
//     new GoogleStrategy(
//       {
//         clientID: process.env.GOOGLE_CLIENT_ID,
//         clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//         callbackURL: "/auth/google-signin/callback",
//       },
//       async (accessToken, refreshToken, profile, done) => {
//         //get the user data from google
//         const newUser = {
//           googleId: profile.id,
//           displayName: profile.displayName,
//           firstName: profile.name.givenName,
//           lastName: profile.name.familyName,
//           image: profile.photos[0].value,
//           email: profile.emails[0].value,
//         };

//         try {
//           //find the user in our database
//           let user = await User.findOne({ googleId: profile.id });

//           if (user) {
//             //If user present in our database.
//             done(null, user);
//           } else {
//             // if user is not preset in our database save user data to database.
//             user = await User.create(newUser);
//             done(null, user);
//           }
//         } catch (err) {
//           console.error(err);
//         }
//       }
//     )
//   );

//   // used to serialize the user for the session
//   passport.serializeUser(async (user, done) => {
//     try {
//       return done(null, user.id);
//     } catch (error) {
//       return done(error);
//     }
//   });

//   // used to deserialize the user
//   passport.deserializeUser(async (id, done) => {
//     try {
//       const user = await User.findById({ _id: id });
//       return done(null, user);
//     } catch (error) {
//       return done(error);
//     }
//   });
// };
