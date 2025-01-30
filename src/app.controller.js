import connection from "./DB/connection.js";
import authRoutes from "./modules/auth/auth.controller.js";
import messageRoutes from "./modules/message/message.controller.js";
import userRoutes from "./modules/user/user.controller.js";

const bootStrap = (app, express) => {
  
  app.use(express.json());

  app.get("/", (req, res) => {
    res.status(200).json({ message: "Welcome to Saraha APP!" });
  });


  app.use('/auth', authRoutes)
  app.use('/user', userRoutes)
  app.use('/message', messageRoutes)

  connection()

  app.all("*", (req, res) => {
    return res.status(404).json({ message: "API not Found" });
  });

  // app.use("/uploads", express.static("uploads"));

  app.use((error, req, res, next)=> {
    console.log(error);
    
    return res.status(500).json({message: error.message})
  }) 

};




export default bootStrap;
