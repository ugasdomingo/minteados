import { Router } from "express";
import { UserModel } from "../models/User";
import { userAuth } from "../middleware/userAuth";

//Define router
const userRouter = Router();

//Routes
userRouter.get("/:id", async (req: any, res: any) => {
	try {
		const user = await UserModel.findById(req.params.id);
		return res.json({ name: user?.name, email: user?.email });
	} catch (error: any) {
		return res.status(500).json({ message: error.message });
	}
});

userRouter.get("/", userAuth, async (req: any, res: any) => {
	try {
		const user = await UserModel.findById(req.uid);
		return res.json({
			name: user?.name,
			role: user?.role,
		});
	} catch (error: any) {
		return res.status(500).json({ message: error.message });
	}
});

//Export routes
export default userRouter;
