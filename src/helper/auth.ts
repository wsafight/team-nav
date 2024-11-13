import { AuthUser } from "wasp/auth";
import { HttpError } from "wasp/server";

// TODO user 设定
export const getCheckedUser = ({user}: {
    user: AuthUser | undefined
}): AuthUser => {
  if (!user) {
    throw new HttpError(401);
  }

  // TODO 权限
  return user
};
