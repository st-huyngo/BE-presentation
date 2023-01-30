export const typeDefs = () => {
  return `#graphql
    type User {
        user_id: String!,
        user_name: String!,
        age: Int!,
        gender: String!,
        nationality: Nationality
    }

    enum Nationality {
        VIETNAM,
        LAOS,
        THAI,
        USA,
        JAPAN
    }

    input CreateUserInput {
        user_name: String!,
        age: Int!,
        gender: String!,
    }

    input UpdateUserInput {
        user_id: String!,
        user_name: String,
        age: Int,
        gender: String,
        nationality: Nationality
    }

    type Query {
        users: [User!]!,
        user(id: String!): User
    }

    type Mutation {
        addUser(input: CreateUserInput): User!
        updateUser(input: UpdateUserInput): User!
        deleteUser(user_id: String!): User!
    }
`;
};
