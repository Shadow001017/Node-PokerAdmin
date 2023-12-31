const bcrypt = require("bcrypt");
import { AuthRegisterReq } from "../../../interfaces/auth/register";
import { signToken } from "../../../middlewares/auth";

const cosmos = require("../../../utils/cosmos"); // Cosmos DB

const databaseID = "poker_admin";
const containerID = "admin_user";

const user: AuthRegisterReq = {
  email: "yutahamaguchi@nadja.biz",
  password: "123qwe!@#QWE",
};

export async function createUser(user: AuthRegisterReq) {

    const { container } = await cosmos.client
      .database(databaseID)
      .container(containerID);

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);

    user.password = hashedPassword;
    // const newUser = new User({ email: username, password: hashedPassword, email: email, role: role });

    const { resource } = await container.items.create(user);

    const token = signToken({ email: user.email, password: user.password });

  }
