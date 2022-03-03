import icons from "../../../../utils/icons";
import { User } from "../../../../utils/interfaces";

export interface UserComment {
  comment: string;
  user: User;
  ownStream?: boolean;
}

export const comments: UserComment[] = [];
