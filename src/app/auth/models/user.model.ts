import {Ad} from "../../models/ad.model";

export interface User{
  id?: number;
  username: string;
  email: string;
  name:string;
  password?: string;
  role: string;
  applays: Ad[];
}
