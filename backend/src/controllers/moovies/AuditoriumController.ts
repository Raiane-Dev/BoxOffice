import { Request, Response } from "express";
import AuditoriumModel from "../../models/AuditoriumModel";
import AuditoriumProperties from "../../types/AuditoriumProperties";
import { v4 as uuid } from "uuid";

class AuditoriumController
{
    private model;

    constructor()
    {
        this.model = new AuditoriumModel();
    }

    public post( req: Request, res: Response )
    {
        let id = uuid();
        let mount_response: any = {};
        let status: number = 200;

        let 
        {
            name,
            seats_no
        }: AuditoriumProperties = req.body; 

        this.model.insert({
            Name: name, 
            SeatsNo: seats_no, 
            ID: id 
        })
        .then( res => 
            {
                console.log(res);
                mount_response.message = "Success!";
                mount_response.data = res;
            })
        .catch( err =>
            {
                console.log(err);
                mount_response.message = "Error!";
                mount_response.data = err.message;
                status = 500;
            });

            res
                .json(mount_response)
                .status(status);
    }

    public search( req: any )
    {
        let mount_response: any = {};
        let status: number = 200;
        const { key, value } = req;
        console.log(key, value);

        this.model.search( key, value )
        .then( res => 
            {
                console.log(res);
                mount_response.body = res;
            })
        .catch( err => 
            {
                console.log(err);
                mount_response.message = "Error!";
                status = 500;
            });

            // res
            //     .json(mount_response)
            //     .status(status);
    }

    public put( req: Request, res: Response )
    {
        let id = req.params.id;
        let mount_response: any = {};
        let status: number = 200;

        let 
        {
            name,
            seats_no
        }: AuditoriumProperties = req.body; 

        this.model.insert({ name, seats_no, id })
        .then( res => 
            {
                console.log(res);
                mount_response.message = "Success!";
            })
        .catch( err =>
            {
                console.log(err);
                mount_response.message = "Error!";
                status = 500;
            });

            res
                .json(mount_response)
                .status(status);
    }

    public delete( req: Request, res: Response )
    {
        let mount_response: any = {};
        let status: number = 200;
        let id = req.params.id;

        this.model.delete( id )
        .then( res => 
            {
                console.log(res);
                mount_response.message = "Success!";
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

    public get( req: Request, res: Response )
    {
        let id = req.params.id;
        let mount_response: any = {};
        let status: number = 200;

        this.model.hasOne( id )
        .then( res => 
            {
                console.log(res);
                mount_response.body = res;
            })
        .catch( err =>
            {
                console.log(err);
                mount_response = "Error!";
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

export default AuditoriumController;