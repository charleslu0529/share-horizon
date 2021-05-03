const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const Users = require("./models/users");

function initialize(passport) {
    passport.use(
        new LocalStrategy((email, password, done) => {
            Users.findOne((email, password), (error, user) => {
                if (error) throw error;
                if (!user) return done(null, false);
                bcrypt.compare(password, user.password, (error, result) => {
                    if (error) throw error;
                    result ? done(null, user) : done(null, false);
                });
            });
        })
    );
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    passport.deSerializeUser((id, done) => {
        Users.findOne({ _id: id }, (error, user) => {
            const userInformation = {
                email: user.email,
            };
            done(error, userInformation);
        });
    });
}

module.exports = initialize;
