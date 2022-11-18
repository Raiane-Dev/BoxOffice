import { Moovies, Auditoriums } from "../../Schema";

class MonopolyModel
{

    constructor()
    {

    }

    public async insertAll( data: any )
    {
        try
        {
            const act = await Moovies.create(data);
   
            return act;
        }
        catch( err: any )
        {
            return new Error(err.message);
        }
    }


    public async hasMany()
    {
        let body: any = {};
        try
        {
            body.moovies = await Moovies.scan().exec();
            return body;
        }
        catch( err: any )
        {
            return new Error(err.message);
        }
    }

}

export default MonopolyModel;