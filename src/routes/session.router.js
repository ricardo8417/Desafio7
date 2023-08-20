import { Router } from "express";
import UserModel from "../Dao/models/user.model.js"

const router = Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email, password });
  if (!user) return res.redirect("login");

  req.session.user = user;

  return res.redirect("/profile");
});

router.post("/register", async (req, res) => {
  try{
  const user = req.body;
const email = user.email
const  userRol= await UserModel.findOne({email}).lean().exec();

if(!userRol){

  if (
    user.email === "adminCoder@coder.com" &&
    user.password === "adminCod3r123"
  ) {
    user.rol = "admin";
  }else{
    user.rol="usuario"
  }
  await UserModel.create(user);
  return res.redirect("/");
}else{
  res.send('El usuario ya existe, favor de agregar otro')
}
}catch(e){
  console.log(e)
}
});

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.json({ message: err });
    }
    res.redirect("/");
  });
});

export default router;
