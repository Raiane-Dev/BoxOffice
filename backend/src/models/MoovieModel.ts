import { Moovies } from "../../Schema";

class MoovieModel
{

    constructor()
    {

    }

    public async insert( data: any )
    {
        try
        {
            return await Moovies.create( data );            
        }
        catch( err: any )
        {
            return new Error(err.message);
        }
    }

    public async update( data: any )
    {
        try
        {
            return await Moovies.update( data.id, data );            
        }
        catch( err: any )
        {
            return new Error(err.message);
        }
    }

    public async delete( data: any )
    {
        try
        {
            return await Moovies.delete( data.id );
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
            const body = await Moovies.get( id );

            return body;
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
            const body = await Moovies.scan();

            return body;
        }
        catch( err: any )
        {
            return new Error(err.message);
        }
    }
}

export default MoovieModel;