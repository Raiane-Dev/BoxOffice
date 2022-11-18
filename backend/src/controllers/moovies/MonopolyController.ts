import { Request, Response } from "express";
import { v4 as uuid } from "uuid";
import MonopolyProperties from "../../types/MonopolyProperties";
import MonopolyModel from "../../models/MonopolyModel";

class MonopolyController
{

    private model;

    constructor()
    {
        this.model = new MonopolyModel();
    }

    public async post( req: Request, res: Response )
    {
        let id = uuid();
        let mount_response: any = {};
        let status: number = 200;

        let
        {
            title,
            director,
            cast,
            description,
            duration_min,

            auditorium_id,
            screening_start
        } : MonopolyProperties = req.body;

        const banner = req.file?.originalname;

        await this.model.insertAll(
            {
                Title: title,
                Banner: banner,
                Director: director,
                Cast: cast,
                Description: description,
                DurationMin: parseInt(`${duration_min}`),
                ScreeningStart: screening_start,
                AuditoriumID: auditorium_id,
            }
        )
        .then( async res => 
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

    public async getAll( _: Request, res: Response )
    {
        let mount_response: any = {};
        let status = 200;
        
        await this.model.hasMany()
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

export default MonopolyController;