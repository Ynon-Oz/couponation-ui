class UserModel {
    public userId?:number;
    public userName?:string;
    public password?:string;
    public companyId?: string;   // Should be an Object
    public type?: string;    // Should be enum
    // public isActivated? : boolean;  //does need it here?
}

export default UserModel;