import { DB } from "../common/db";
import { v4 as uuidv4 } from "uuid";

export const resolvers = {
  Query: {
    users: async () => {
      return await DB.scan("Users");
    },
    user: async (_: any, args: any) => {
      return await DB.findOne("Users", args.id);
    },
  },

  Mutation: {
    addUser: async (parent: any, args: any) => {
      const user_id = uuidv4();
      const { user_name, gender, age } = args.input;
      const data = {
        user_id,
        user_name,
        gender,
        age,
      };

      return await DB.createOrUpdate("Users", data);
    },
    updateUser: async (parent: any, args: any) => {
      const { user_id, user_name, gender, age } = args.input;
      const data = {
        user_id,
        user_name,
        gender,
        age,
      };

      return await DB.createOrUpdate("Users", data);
    },

    deleteUser: async (parent: any, args: any) => {
      const id = args.user_id;
      const user = await DB.findOne("Users", id);
      const res = await DB.delete("Users", id);
      if (res?.status === 200 ) return user;
    },
  },
};
