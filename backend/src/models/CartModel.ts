import dynamoose from "dynamoose";
import { Reservation, Auditoriums } from "../../Schema";

class CartModel
{

    constructor()
    {
    }

    public async insertAll( data: any )
    {
        try
        {
            return await dynamoose.transaction([
                Reservation.transaction.create(data),
                Auditoriums.transaction.update({"Id": data.AuditoriumID}, {"$ADD": {"SeatsNo": -1}}),
            ]);
        }
        catch( err: any )
        {
            return new Error(err.message);
        }
    }


    public async hasMany( userId: any )
    {
        let body: any = {};
        try
        {
            body.reservation = await Reservation.scan({
                "CustomerReservedID":
                {
                    "eq": userId
                }
            }).exec();

            return body;
        }
        catch( err: any )
        {
            return new Error(err.message);
        }
    }

}

export default CartModel;