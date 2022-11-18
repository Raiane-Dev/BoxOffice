import { Request, Response } from "express";
import ReservationModel from "../../models/ReservationModel";
import ReservationProperties from "../../types/ReservationProperties";
import { v4 as uuid } from "uuid"; 

class ReservationController
{

    private model;

    constructor()
    {
        this.model = new ReservationModel();
    }

    public post( req: Request, res: Response )
    {
        const id = uuid();
        let mount_response: any = {};
        let status: number = 200;

        let
        {
            auditorium_id,
            moovie_id,
            customer_reserved_id,

            reservation_contact,
            reserved,
            active
        }: ReservationProperties = req.body;

        this.model.insert({ auditorium_id, moovie_id, customer_reserved_id, reservation_contact, reserved, active, id })
        .then( res => 
            {
                console.log(res);
                mount_response.message = "Success";
            })
        .catch( err => 
            {
                status = 500;
                mount_response.message = "Error";
            });

            res
                .json(mount_response)
                .status(status);
    }


    public put( req: Request, res: Response )
    {
        const id = req.params.id;
        let mount_response: any = {};
        let status: number = 200;

        let
        {
            auditorium_id,
            moovie_id,
            customer_reserved_id,
            reservation_contact,
            reserved,
            active
        }: ReservationProperties = req.body;

        this.model.insert({ auditorium_id, moovie_id, customer_reserved_id, reservation_contact, reserved, active, id })
        .then( res => 
            {
                console.log(res);
                mount_response.message = "Success";
            })
        .catch( err => 
            {
                status = 500;
                mount_response.message = "Error";
            });

            res
                .json(mount_response)
                .status(status);
    }

    public delete( req: Request, res: Response )
    {
        let mount_response: any = {};
        let status: any = 200;
        let id = req.params.id;

        this.model.delete(id)
        .then( res => 
            {
                console.log(res);
                mount_response.message = "Success";
            })
        .catch( err => 
            {
                console.log(err);
                mount_response.message = "Error";
            });
    }

    public get( req: Request, res: Response )
    {
        let id = req.params.id;
        let mount_response: any = {};
        let status: number = 200;

        this.model.hasOne(id)
        .then( res => 
            {
                console.log(res);
                mount_response.body = res;
            })
        .catch( err => 
            {
                console.log(err);
                mount_response.message = "Error";
                status = 500;
            });

            res
                .json(mount_response)
                .status(status);
    }

    public getAll( req: Request, res: Response )
    {
        let mount_response: any = {};
        let status: number = 200;

        this.model.hasMany()
        .then( res => 
            {
                console.log(res);
                mount_response.body = { res };
            })
        .catch( err =>
            {
                console.log(err);
                mount_response.message = "Error!";
            });

            res
                .json(mount_response)
                .status(status);
    }

}