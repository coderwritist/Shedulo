const User = require("../models/user");
const express = require("express")
const app = express()
const bcrypt = require("bcrypt"); 
const bp = require("body-parser")
app.use(bp.urlencoded({extended: true}));



const regcon = async (req, res) => {
    const { username, email, password, phone} = req.body;
   
    let user = await User.findOne({ email });
    if (user) {
        req.session.error = "User already exists";
        return res.redirect("/register?error=user already exists");
      }
    const hasdPsw = await bcrypt.hash(password, 10);
    user = new User({
        username,
        email,
        password: hasdPsw,
        phone,
        slots: {"9-10": null, "10-11": null, "11-12": null, "12 - 1": "Lucnch", "1-2": null, "2-3": null, "3-4": null, "4-5": null},
        requests: [],
      });
      await user.save();
      res.redirect("/login");
}

const logincon = async (req, res) => {

    const { email, password } = req.body;

    const user = await User.findOne({ email });
  
    if (!user) {
        req.session.error = "invalid Credentials";
      return res.redirect("/login?error=invalid credentials");
    }
  
    const isMatch = await bcrypt.compare(password, user.password);
  
    if (!isMatch) {
        req.session.error = "nvalid Credentials";
        return res.redirect("/login?error=invalid credentials");
    }
  
    req.session.isAuth = true;
    req.session.username = user.username;
    req.session.email = user.email;
    res.redirect("/");

};


const getuser = async (req, res) => {

  const email = req.session.email;
  const user = await User.findOne({'email': email});
  res.send(user)

}

const getalluser = async (req, res) => {
  const users = await User.find({});
  res.send(users)
}


const updateuser = async (req, res) => {

  const preemail = req.session.email;
  const email = req.body.email;
  const username = req.body.username;
  const phone = req.body.phone;
  const password = req.body.password;
  const filter = { email: preemail};
  const update = { email: email, username: username, phone: phone, password: password};
  const options = { new: true };
  const updatedUser = await User.findOneAndUpdate(filter, update, options);
  req.session.username = updatedUser.username;
  req.session.email = updatedUser.email;
  console.log(updatedUser.username);
  res.redirect("/");
}


const updateslots = async (req, res) => {

  const email = req.session.email;
  const ar = req.body;
  for(let key in ar)
  {
    if(ar[key] == "Available")
    {
      ar[key] = null;
    }
  }
  const filter = { email: email};
  const update = {slots: ar};
  const options = { new: true };
  const updatedUser = await User.findOneAndUpdate(filter, update, options);
  console.log(updatedUser.slots)
  res.redirect("/");
}


const bookmeeting = async (req, res) => {

    const sender = req.session.email;
    const receiver = req.body.recmail;
    const slot = req.body.slot;
    const subject = req.body.subject;
    const filter = { email: receiver};
    const update = {$push: { requests: {"username": req.session.username, "email": sender, "subject": subject, "slot": slot}} };
    const options = { new: true };
    const updatedUser = await User.findOneAndUpdate(filter, update, options);
    console.log(updatedUser.requests);
    res.redirect("/");
}






const isAuth = (req, res, next) => {
    if (req.session.isAuth) {
      next();
    } else {
      req.session.error = "You have to Login first";
      res.redirect("/login?error=You have to Login first");
    }
  };

  const logout = (req, res) => {
    req.session.destroy((err) => {
      if (err) throw err;
      res.redirect("/login");
    });
  };



module.exports = {regcon, logincon, isAuth, getuser, updateuser, updateslots, getalluser, bookmeeting, logout}