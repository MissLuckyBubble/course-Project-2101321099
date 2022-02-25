import {User} from "../auth/models/user.model";

export interface Ad{
  likes: number;
  likesUserId: number[];
  id: number;
  title: string;
  organizationName: string;
  more: string;
  userid: number;
  status:string;
  applays: User[];
  ApprovedUser: User;
  category: String;
  type: String;
}
