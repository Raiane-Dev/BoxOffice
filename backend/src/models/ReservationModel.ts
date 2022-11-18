import { Reservation } from "../../Schema";

class ReservationModel
{
    constructor()
    {
 
    }


    public async insert( data: any )
    { 

        try
        {
            return await Reservation.create( data );            
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
            return await Reservation.update( data, data.id );            
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
            return await Reservation.delete( id );            
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
            const body = await Reservation.get( id );
            
            return body;
        }
        catch( err: any )
        {
            return new Error(err.message);
        }
    }

    public async hasMany( )
    {
        try
        {
            const body = await Reservation.scan();
            
            return body;
        }
        catch( err: any )
        {
            return new Error(err.message);
        }

    }


}

export default ReservationModel;