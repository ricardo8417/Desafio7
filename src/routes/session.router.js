import { Router } from "express";
import passport from "passport";
import UserModel from "../Dao/models/user.model.js"
import { createHash, isValidPassword } from "../utils.js";

const router = Router();

router.post("/login",passport.authenticate("login", "/login"),async (req, res) => {
   
    if (!req.user) return res.status(400).send("Invalid Credentials");

    req.session.user = req.user;
    return res.redirect("/profile");
  });


router.post("/register",passport.authenticate("register", { failureRedirect: "/register" }),async (req, res) => {
    
      const user = req.body;
    
        if (
          user.email === "adminCoder@coder.com" &&
          user.password === "adminCod3r123"
        ) {
          user.rol = "admin";
        } else {
          user.rol = "usuario";
        }
        
        res.redirect("/");
    
   }
);

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.json({ message: err });
    }
    res.redirect("/");
  });
});


//GITHUB
router.get(
  "/login-github",
  passport.authenticate("github", { scope: ["user:email"] }),
  async (req, res) => {}
);

router.get(
  "/githubcallback",
  passport.authenticate("github", { failureRedirect: "/" }),
  async (req, res) => {
    console.log("Callback: ", req.user);
    req.session.user = req.user;
    console.log(req.session);
    res.redirect("/profile");
  }
);

export default router;
