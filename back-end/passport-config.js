const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const Users = require("./models/users");

function initialize(passport) {
    passport.use(
        new LocalStrategy((username, password, done) => {
            Users.findOne({ username: username }, (error, user) => {
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

    passport.deserializeUser((id, done) => {
        Users.findById(id, (error, user) => {
            done(error, user);
        });
    });
}

module.exports = initialize;
