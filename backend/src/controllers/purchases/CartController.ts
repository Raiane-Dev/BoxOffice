import { Request, Response } from "express";
import { Queues } from "../../configs/Queues";
import CartModel from "../../models/CartModel";

class CartController
{

    private model;

    constructor()
    {
      this.model = new CartModel();
    }

    public async add( req: Request, res: Response )
    {
        let mount_response: any = {};
        let statusCode: number = 200;
        const producer = new Queues();

        producer.params.MessageBody = JSON.stringify( req.body );
        await producer.put()
        .then( async res_put => 
          {
            console.log(res_put);
            await new Queues().get(
              this.process
            )
            .then( async res_get => 
              {
                mount_response.response = "Success";
              })
              .catch(err_get =>
              {
                mount_response.response = "Error during request.";
                mount_response.data = err_get;
                statusCode = 500;
              });
          })
          .catch( err => 
          {
              console.log(err);
              mount_response.response = "Error during upload.";
              statusCode = 500;
          });

          console.log(mount_response);
          res
            .send(mount_response)
            .status(statusCode);
    }

    /**
     * 
     */
    public async process( data: any = {} )
    {
      let mount_response: any = {};
      
      const {
        auditorium_id,
        moovie_id,
        customer_reserved_id,
        reservation_contact,
        reserved,
        active,
      } = JSON.parse(data);

      const model = new CartModel();
      await model.insertAll(
        {
            AuditoriumID: auditorium_id,
            MoovieID: moovie_id,
            CustomerReservedID: customer_reserved_id,
            ReservationContact: reservation_contact,
            Reserved: reserved,
            Active: active
        }
      )
      .then( res => 
        {
            console.log(res);
            mount_response.message = "Success";
        })
      .catch( err => 
        {
            console.log(err.message);
            mount_response.message = "Error";
        });
    }

    /**
     * Returns user purchase
     */
    public async get( req: any, res: Response )
    {
      let body: any = {};
      let statusCode = 200;
      try
      {
        body.data = await this.model.hasMany( req.userId );
      }
      catch(err: any)
      {
        body.data = err.message;
      }

      res
        .json(body)
        .status(statusCode);
    }
}

export default CartController;
