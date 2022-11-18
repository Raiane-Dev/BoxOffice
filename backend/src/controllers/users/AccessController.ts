import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import CustomerProperties from "../../types/CustomerProperties";
import UserModel from "../../models/UserModel";
class AccessController
{
    private model: any;
    private controller: any;

    constructor()
    {
        this.model = new UserModel();
    }

    public login( req: Request, res: Response )
    {
        const { email, password } = req.body;

        this.model.search({ email: email, password: password })
        .then( (user: any) => 
        {
            if(user)
            {
                const token = jwt.sign(
                    {
                        user: user.id
                    }, 
                    String(process.env.SECRET)
                );

                res
                .setHeader("x-access-token", token)
                .cookie("x-access-token", token)
                .setHeader("x-role", user.Role)
                .cookie("x-role", user.Role)
                .json({ auth: true, token: token });
            }
            else res.json({ auth: false });
        })
        .catch( (err: any) => 
        {
            res.json({ auth: false });
        });

    }

    public async register( req: Request, res: Response )
    {
        let mount_response: any = {};
        let status: number = 200;

        const 
        {
            name,
            email,
            password,
            cpf
        }: CustomerProperties = req.body;
        
        this.model.insert(
            {
                Name: name,
                Email: email,
                Password: password,
                CPF: cpf
        })
        .then( (res: any) => 
            {
                console.log(res);
                mount_response.message = "Success!";
            })
        .catch( (err: any) =>
            {
                console.log(err);
                mount_response.message = "Error!";
                status = 500;
            });
    
                res
                    .json(mount_response)
                    .status(status);
    }

    public logout( req: Request, res: Response )
    {
        res.json({ auth: false, token: null });
    }
}

export default AccessController;