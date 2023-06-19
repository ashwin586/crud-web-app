const User = require("../models/user");

exports.userLoginGet = (req, res) => {
  if (req.session.name) {
    res.redirect("/dashboard");
  } else {
    let page = ejs.render("login", { title: "Login", error: false });
    res.send(page);
  }
};

exports.userLoginPost = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (user) {
      if (user.email == email && user.password == password) {
        req.session.name = user.name;
        res.redirect("/dashboard");
      } else {
        res.render("login", { error: "Invalid email or password" });
      }
    } else {
      res.render("login", { error: "User not found. Please sign up" });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.usersSignupGet = (req, res) => {
  if (req.session.name) {
    res.redirect("/dashboard");
  } else {
    res.render("signup", { title: "Sign up", error: false });
  }
};

exports.userSignupPost = async (req, res) => {
  const { email, phno } = req.body;
  const existingUser = await User.findOne({
    $or: [{ email: email }, { phone: phno }],
  });
  const data = {
    name: req.body.name,
    phone: req.body.phno,
    email: req.body.email,
    password: req.body.psswd,
  };
  if (existingUser) {
    if (existingUser.email == data.email) {
      res.render("signup", {
        title: "Sign up",
        error: "This email is already registered. Please login with the email.",
      });
    } else if (existingUser.phone == data.phone) {
      res.render("signup", {
        title: "Sign up",
        error:
          "This phone number is already registered. Please sign up with a different phone number.",
      });
    }
  } else {
    await User.create(data);
    res.redirect("/");
  }
};

exports.userSignedIn = (req, res) => {
  if (req.session.name) {
    res.render("dashboard", { user: req.session.name, title: "dashboard" });
  } else {
    res.render("invalid", { message: "Unauthorised User", title: "invalid" });
  }
};

exports.userLoggedOut = (req, res) => {
  try {
    delete req.session.name;
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};

exports.userSignedOutError = (req, res) => {
  const message = req.query.message || "";
  res.render("invalid", { message });
};
