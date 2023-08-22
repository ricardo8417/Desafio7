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
    // try {
      const user = req.body;
      // const email = user.email;
    //   user.password = createHash(user.password); //Hasheamos el password
      // const userRol = await UserModel.findOne({ email }).lean().exec();

      // if (!userRol) {
        if (
          user.email === "adminCoder@coder.com" &&
          user.password === "adminCod3r123"
        ) {
          user.rol = "admin";
        } else {
          user.rol = "usuario";
        }
        // const result = await UserModel.create(user);
        // console.log(result);
        res.redirect("/");
      // }
      // } else {
      //   res.send("El usuario ya existe, favor de agregar otro");
      // }
  //   } catch (e) {
  //     console.log(e);
  //   }
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

export default router;
