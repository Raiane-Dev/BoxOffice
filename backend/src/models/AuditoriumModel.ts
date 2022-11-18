import { Auditoriums } from "../../Schema";

class AuditoriumModel
{
    constructor()
    {

    }

    public async insert( data: any )
    {
        try
        {
            const auditorium = new Auditoriums( data );
            console.log("Insert success");

            return await auditorium.save();
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
            return await Auditoriums.update(data.id, data);            
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
            return await Auditoriums.delete( id );            
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
            return await Auditoriums.get( id );            
        }
        catch( err: any )
        {
            return new Error(err.message);
        }
    }

    public async search( key: string, value: string )
    {
        try
        {
            const body = await Auditoriums.scan().all();

            console.log(body);

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
            return await Auditoriums.scan();
        }
        catch( err: any )
        {
            return new Error(err.message);
        }

    }
}

const b = new AuditoriumModel()
b.insert({
    "Id": "1",
    "Name": "Raiane",
    "SeatsNo": 30
});

export default AuditoriumModel;