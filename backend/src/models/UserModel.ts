import { Customers } from "../../Schema";

class UserModel
{

    constructor()
    {

    }


    public async insert( data: any )
    {
        try
        {
            return await Customers.create( data );
        }
        catch( err: any )
        {
            return new Error(err.message);
        }
    }

    public async delete( id: number | string )
    {
        try
        {
            return await Customers.delete( id );
        }
        catch( err: any )
        {
            return new Error(err.message);
        }
    }

    public async hasOne( id: number | string )
    {
        try
        {
            const body = await Customers.get( id );

            return body;
        }
        catch( err: any )
        {
            return new Error(err.message);
        }
    }

    public async search( data: any )
    {
        try
        {
            const credential = await Customers.scan({
                "Email":
                {
                    "eq": data.email
                },
                "Password":
                {
                    "eq": data.password
                }
            }).exec();


            if(credential.count === 0)
            {
                return Promise.reject("Username or Password is incorrect!");
            }
            else
            {
                console.log(credential[0]);
                return credential[0];
            }
        }
        catch( err: any )
        {
            return new Error(err.message);
        }
    }

    public async hasMany()
    {
        try
        {
            const body = await Customers.scan();

            return body;
        }
        catch( err: any )
        {
            return new Error(err.message);
        }
    }


}

export default UserModel;