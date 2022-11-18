import { Request, Response } from "express";
import UserModel from "../../models/UserModel";
import CustomerProperties from "../../types/CustomerProperties";

class UserController
{
    private model;

    constructor()
    {
        this.model = new UserModel();
    }

    public post( req: Request, res: Response )
    {
        let id = req.params.id ?? null;
        let mount_response: any = {};
        let status: number = 200;

        let 
        {
            name,
            email,
            password,
            cpf
        }: CustomerProperties = req.body; 

        this.model.insert({ Name: name, Email: email, Password: password, CPF: cpf, ID: id })
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

    public search( req: Request, res: Response )
    {
        let mount_response: any = {};
        let status: number = 200;
        let { email, password } = req.body;

        this.model.search({
            email, password
        })
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

export default UserController;