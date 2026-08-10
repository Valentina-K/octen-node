import { Router } from "express";

import { userController } from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { apiMiddleware } from "../middlewares/common.middleware";
import { UserValidator } from "../validators/user.validator";

const router = Router();

router.get("/", userController.getAll);
router.get("/:id", apiMiddleware.isValidate("id"), userController.getById);
router.put(
    "/:id",
    authMiddleware.checkAccessToken,
    apiMiddleware.isValidate("id"),
    apiMiddleware.validateBody(UserValidator.update),
    userController.updateById,
);
router.put(
    "/:id/isActive",
    authMiddleware.checkAccessToken,
    apiMiddleware.isValidate("id"),
    apiMiddleware.checkAdmin,
    apiMiddleware.validateBody(UserValidator.setActive),
    userController.setActive,
);
router.delete(
    "/:id",
    authMiddleware.checkAccessToken,
    apiMiddleware.isValidate("id"),
    userController.deleteById,
);

export const userRouter = router;
