import AWS, { SQS } from "aws-sdk";

class Queues
{
    public queue: any;
    public params: any = {};

    constructor()
    {
        AWS.config.update(
            {
                "accessKeyId": process.env.AWS_ACCESS_KEY_ID,
                "secretAccessKey": process.env.AWS_SECRET_KEY,
                "region": "us-east-1"
            }
        )
        
        this.queue = new SQS({ 
                "region": "us-east-1",
                "apiVersion": "2012-11-05",
        });

        const accountId = 922199593157; 
        const queueName = "Bxf";


        /**
         * When using, add in params
         */
        this.params = 
        {
            QueueUrl: `https://sqs.us-east-1.amazonaws.com/${accountId}/${queueName}`
        };
    }

    public async put()
    {
        await this.queue.sendMessage(
                        this.params, 
                        (err: any, data: any) =>
                        {
                            if(err)
                            {
                                throw new Error(err);  
                            } 
                            else
                            {
                                console.log(data);
                                return data;
                            }
                        }
                    ).promise();
    }

    public async get( callback: any )
    {
        await this.queue.receiveMessage( this.params, (err: any, data: any) => 
        {
            if(err) console.log(err, err.stack);

            else
            {
                /**
                 * Data received from the queue
                 * After processing the queue, it is deleted
                 */
                if(data.Messages)
                {
                    data.Messages.forEach( (message: any) => 
                    {
                        console.log("Received: ", message);
                        
                        // Call the function responsible for these messages (in this case, the cart);
                        callback( message.Body );
                        this.dell(message.ReceiptHandle);
                    });
                }
            }
        });

    }

    public dell( receipt: string )
    {
        this.queue.deleteMessage( {...this.params, ReceiptHandle: receipt }, (err: any, data: any) => 
        {
            if(err) console.log(err, err.stack);

            else
            {
                console.log("Message deleted from queue");
            }
        })
    }
}
  
export {
    Queues
};