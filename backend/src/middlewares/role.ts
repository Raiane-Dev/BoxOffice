import {  Request, Response, NextFunction } from "express"

async function seeRole( req: Request, res: Response, next: NextFunction )
{
    const func: any = req.headers["x-role"];
    let allow: any = {};

    if( func === "Root" )
    {
        allow = 
        {
            role: "Root",
            resources: [
                {
                    path: "/api/moovie", method: ["POST", "GET", "DELETE", "PUT"]
                },
                {
                    path: "/api/auditorium", method: ["POST", "GET", "DELETE", "PUT"]
                }
            ]
        };
    }
    else if( func === "User")
    {
        allow = 
        {
            role: "User",
            resources: [
                {
                    path: "/api/moovie", method: ["GET"] ,
                },
                {
                    path: "/api/purchase", method: ["GET", "POST"] 
                }
            ]
        };
    }

    let verify = false;
    allow.resources.map( (e: any): any=> 
    {
        if(
            req.baseUrl.includes(e.path) &&
            e.method.includes(req.method)
        )
        {
            verify = true;
            return;
        }
    });

    if(verify)
    {
            next();
    }
    else {
        res.status(401).json({ auth: false, message: "Operation not permitted." });
    }
}

export default seeRole;