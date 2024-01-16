export class UserEntity {
    public readonly name: string; 
    public readonly email: string;
    public readonly password: string;
    public readonly id?: string;

    
    constructor(id: string, name: string, email: string,password:string) {
      this.id = id;
      this.name = name;
      this.email = email;
      this.password=password
    }
  }