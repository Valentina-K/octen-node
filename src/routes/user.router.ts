import { Router } from "express";

import { userController } from "../controllers/user.controller";
import { apiMiddleware } from "../middlewares/common.middleware";
import { UserValidator } from "../validators/user.validator";

const router = Router();

router.get("/", userController.getAll);
router.post(
    "/",
    apiMiddleware.validateBody(UserValidator.create),
    userController.create,
);
router.get("/:id", apiMiddleware.isValidate("id"), userController.getById);
router.put(
    "/:id",
    apiMiddleware.isValidate("id"),
    apiMiddleware.validateBody(UserValidator.update),
    userController.updateById,
);
router.delete(
    "/:id",
    apiMiddleware.isValidate("id"),
    userController.deleteById,
);

export const userRouter = router;
