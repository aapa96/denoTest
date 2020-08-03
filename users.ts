export interface User {
    id: string;
    username: string;
    password: string;
  }
  
  const users: Array<User> = [
    {
      id: "root",
      username: "root",
      password: "123",
    }, 
  ]
  
  export default users;