import http from "http";
import express from "express";
import session from "express-session";
import ejs from "ejs";

import path from "path";

import mongoose from "mongoose";
import connectmongo from "connect-mongo";
const mongooseSession = connectmongo(session);

import driver from "../database/driver";

import passport from "passport";
import { Strategy as DiscordStrategy } from "passport-discord";

import config from "../config.json";

const app = express();

const server = http.createServer(app);

const store = new mongooseSession({
    mongooseConnection: driver.getConnection()
});

app.engine("ejs", ejs.renderFile);
app.set("views", `${__dirname}/views`);
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

const scopes = ["identify", "email", "guilds"];

module.exports = {
    start: (bot, callback) => {
        driver.getConnection().on("connected", function() {
            console.log("Mongoose Connected");
        });

        function checkAuthenticated(req, res, next) {
            if(req.user) {
                next();
            } else {
                res.redirect("/");
            }
        }

        function getAuthUser(user) {
            return {
                username: user.username,
                discriminator: user.discriminator,
                id: user.id,
                avatar: user.avatar ? (`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.jpg`) : "https://discordapp.com/assets/6debd47ed13483642cf09e832ed0bc1b.png",
                guilds: user.guilds
            };
        }

        function botInGuild(guild) {
            return bot.guilds.get(guild.id) != null;
        }

        function getGuildInfo(guild) {
            return {
              name: guild.name,
              id: guild.id,
              icon: guild.icon ? (`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.jpg`) : "https://discordapp.com/assets/6debd47ed13483642cf09e832ed0bc1b.png"
            };
        }

        passport.use(new DiscordStrategy({
            clientID: config.client_id,
            clientSecret: config.client_secret,
            callbackURL: `${config.hosting_url}/login/callback`,
            scope: scopes
        }, (accessToken, refreshToken, profile, done) => {
            process.nextTick(() => {
                return done(null, profile);
            });
        }));

        passport.serializeUser((user, done) => {
            done(null, user);
        });

        passport.deserializeUser((id, done) => {
            done(null, id);
        });

        app.use(session({
            secret: "cIGxEWj4PwbnasdurJzS",
            resave: false,
            saveUninitialized: false,
            store
        }));

        app.use(passport.initialize());
        app.use(passport.session());

        app.use((error, req, res, next) => {
            res.status(500).send(error);
            console.error(error);
        });

        app.get("/", (req, res) => {
            res.render("home.ejs", {
                authUser: req.isAuthenticated() ? getAuthUser(req.user) : null,
                bot,
                getGuildInfo,
                botInGuild,
                inviteLink: `https://discordapp.com/oauth2/authorize?client_id=${bot.user.id}&scope=bot&permissions=2146958591`,
                config
            });
        });

        app.get("/login", passport.authenticate("discord", {
            scope: scopes
        }));

        app.get("/login/callback", passport.authenticate("discord", {
            failureRedirect: "/"
        }), (req, res) => {
            if(req.user.id === config.owner_id || bot.guilds.find("id", config.server_id).members.find("id", req.user.id).roles.find("name", config.wrm_rolename)) {
                res.redirect("/");
            } else {
                req.logout();
                res.redirect("/error");
            }
        });

        app.get("/logout", (req, res) => {
            req.logout();
            res.redirect("/");
        });

        app.get("/error", (req, res) => {
            res.render("error.ejs");
        });

        app.get("/reports", checkAuthenticated, (req, res) => {
            res.render("reports.ejs", {
                authUser: req.isAuthenticated() ? getAuthUser(req.user) : null,
                config
            });
        });

        callback(server);
        server.listen(config.server_port, config.server_ip);
    }
}