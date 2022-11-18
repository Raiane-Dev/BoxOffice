import { Request, Response } from "express";
import MoovieModel from "../../models/MoovieModel";
import MoovieProperties from "../../types/MoovieProperties";
import { v4 as uuid } from "uuid"; 

class MoovieController
{

    private model;

    constructor()
    {
        this.model = new MoovieModel();
    }

    public post( req: Request, res: Response )
    {
        let id = uuid();
        let mount_response: any = {};
        let status: number = 200;

        let
        {
            title,
            banner,
            director,
            cast,
            description,
            duration_min,
            screening_start
        } : MoovieProperties = req.body;

        this.model.insert({ 
            Title: title, 
            Banner: banner, 
            Director: director, 
            Cast: cast, 
            Description: description, 
            DurationMin: duration_min,
            ScreeningStart: screening_start,
            ID: id 
        })
        .then( res => 
            {
                console.log(res);
                mount_response.message = "Success!";
            })
        .catch( err => 
            {
                console.log(err)
                mount_response.message = "Error!"
                status = 500;
            });

            res
                .json(mount_response)
                .status(status);
    }

    public put( req: Request, res: Response )
    {
        let id = req.params.id;
        let mount_response: any = {};
        let status: number = 200;

        let
        {
            title,
            banner,
            director,
            cast,
            description,
            duration_min
        } : MoovieProperties = req.body;

        this.model.update({ title, banner, director, cast, description, duration_min, id })
        .then( res => 
            {
                console.log(res);
                mount_response.message = "Success!";
            })
        .catch( err => 
            {
                console.log(err)
                mount_response.message = "Error!"
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
                mount_response.message = "Success";
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
                mount_response.message = "Error!";
                status = 500;
            });

            res
            .json(mount_response)
            .status(status);
    }

    public getAll( _: Request, res: Response )
    {
        let mount_response: any = {};
        let status = 200;
        
        this.model.hasMany()
        .then( res => 
            {
                console.log(res);
                mount_response.body = res;
            })
        .catch( err => 
            {
                console.log(err);
                mount_response.message = err;
                status = 500;
            });

            res
                .json(mount_response)
                .status(status);
    }
}

export default MoovieController;