import dynamoose from "dynamoose";
import AWS from "aws-sdk";
import {v4 as uuid} from 'uuid';

AWS.config.update({
    "region": process.env.AWS_REGION,
    "accessKeyId": process.env.AWS_ACCESS_KEY_ID,
    "secretAccessKey": process.env.AWS_SECRET_ACCESS_KEY
});

const db = new dynamoose.aws.ddb.DynamoDB({
        "region": "us-east-1",
        // "endpoint": "http://localhost:8000"
    });

    if( process.env.DEBUG )
    {
        dynamoose.aws.ddb.local("http://localhost:8000");
    }
    else
    {
        dynamoose.aws.ddb.set(db);
    }

const Schema = 
{
    Auditoriums: 
        dynamoose.model("Auditoriums", 
            new dynamoose.Schema({
                Id: {
                    type: String,
                    hashKey: true,
                    default: uuid(),
                    },
                Name: {
                    type: String,
                    required: true
                    },
                SeatsNo: {
                    type: Number,
                    required: true,
                    }
            },
            {
                validate: (obj: any) => 
                {
                    if(obj.SeatsNo === 0)
                    {
                        throw new Error("Tickets Sold Out.");
                    }
                    return true;
                }
            })
        ),

    Customers: 
        dynamoose.model("Customers", 
            new dynamoose.Schema({
                id: {
                    type: String,
                    hashKey: true,
                    default: uuid(),
                    },
                Name: {
                    type: String,
                    required: true
                    },
                Email:{
                    type: String,
                    required: true,
                    },
                Password:{
                    type: String,
                    required: true,
                    },
                Role: {
                    type: String,
                    default: "User",
                },
                CPF:{
                    type: String,
                    required: true,
                    }
            })
        ),

    Moovies: 
        dynamoose.model("Moovies", 
            new dynamoose.Schema({
                id: {
                    type: String,
                    hashKey: true,
                    default: uuid(),
                    },
                Title: {
                    type: String,
                    },
                Banner:{
                    type: String,
                    required: false,
                    },
                Director:{
                    type: String,
                    required: true,
                    },
                Cast: {
                    type: String,
                    required: true
                    },
                Description: {
                    type: String,
                    },
                DurationMin:{
                    type: Number,
                    required: false,
                    },
                ScreeningStart: {
                    type: String,
                    required: true
                },
                AuditoriumID: {
                    type: String,
                    required: false
                }
            })
        ),

    Reservation:
        dynamoose.model("Reservation", 
            new dynamoose.Schema({
                id: {
                    type: String,
                    hashKey: true,
                    default: uuid(),
                    },
                MoovieID: {
                    type: String,
                    required: true,
                    },
                CustomerReservedID:{
                    type: String,
                    required: true,
                    },
                ReservationContact:{
                    type: String,
                    required: false,
                    },
                Reserved: {
                    type: Boolean,
                    required: true
                    },
                Active:{
                    type: Number,
                    required: false,
                    }, 
            })
        ),

    
};

const Auditoriums = Schema.Auditoriums;
const Customers = Schema.Customers;
const Moovies = Schema.Moovies;
const Reservation = Schema.Reservation;

function createSchemas()
{
const DynamoDB_Table = [ 
    new dynamoose.Table("Auditoriums", [ Auditoriums ]),
    new dynamoose.Table("Customers", [ Customers ]),
    new dynamoose.Table("Moovies", [ Moovies ]),
    new dynamoose.Table("Reservation", [ Reservation ]),
];

    try {
        DynamoDB_Table.forEach( (value, index) =>
        {
            value.create();
        });
    } catch (error) {
        console.error(error);
    }
}

export {
    Auditoriums,
    Customers,
    Moovies,
    Reservation
};