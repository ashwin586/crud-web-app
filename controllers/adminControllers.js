const User = require("../models/user");

const adminInfo = {
  email: "admin@gmail.com",
  password: "admin123",
};

// AdminLogin
exports.adminLoginGet = (req, res) => {
  if (req.session.email) {
    res.redirect("/admin");
  } else {
    res.render("adminLogin", { title: "Admin Login" });
  }
};

exports.adminLoginPost = (req, res) => {
  if (
    req.body.email == adminInfo.email &&
    req.body.password == adminInfo.password
  ) {
    req.session.email = req.body.email;
    if (req.session.email) {
      res.redirect("/admin");
    }
  } else {
    res.render("adminLogin", { title: "Admin Login" });
  }
};

exports.adminSignedIn = async (req, res) => {
  if (req.session.email) {
    try {
      const users = await User.find().exec();
      res.render("admin", {
        users: users,
        user: req.session.email,
        title: "admin",
      });
    } catch (err) {
      console.log(err);
      res.status(500).send("Error retrieving users");
    }
  } else {
    res.redirect("/adminLogin");
  }
};

exports.adminAddUserGet = (req, res) => {
  if (req.session.email) {
    res.render("addUsers", {
      title: "AddUser",
    });
  } else {
    res.render("adminLogin");
  }
};

exports.adminAddUserPost = async (req, res) => {
  const data = {
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    password: req.body.password,
  };
  await User.insertMany([data]);
  req.session.message = {
    type: "success",
    message: "User added successfully",
  };
  res.redirect("/admin");
};

exports.adminSignedOut = (req, res) => {
  delete req.session.email;
  res.redirect("/adminLogin");
};

exports.userEditGet = async (req, res) => {
  if (req.session.email) {
    try {
      let id = req.params.id;
      let user = await User.findById(id).exec();
      if (user == null) {
        res.redirect("/admin");
      } else {
        res.render("edit", { title: "Edit_user", user: user });
      }
    } catch (err) {
      console.error(err);
      res.redirect("/admin");
    }
  } else {
    res.render("/adminLogin", { title: "Admin Login" });
  }
};

exports.userEditPost = async (req, res) => {
  try {
    let id = req.params.id;
    await User.findByIdAndUpdate(id, {
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
    }).exec();
    res.redirect("/admin");
  } catch (err) {
    console.error(err);
    res.redirect("/admin");
  }
};

exports.deleteUserGet = async (req, res) => {
  try {
    let id = req.params.id;
    await User.findByIdAndRemove(id).exec();
    res.redirect("/admin");
  } catch (err) {
    console.log(err);
    res.redirect("/admin");
  }
};
