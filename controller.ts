import { MongoClient } from "https://deno.land/x/mongo@v0.8.0/mod.ts";
const client = new MongoClient();
client.connectWithUri("mongodb+srv://root:73883632Alex@server-w0liq.mongodb.net/server?retryWrites=true&w=majority");

const db = client.database("server");
const users = db.collection("usersDeno");

export const addUser = async (context: any) => {
    try {
        let body: any = await context.request.body();
        const { name, email } = body.value;
        console.log(body);
        
        const user = await users.insertOne({
            name: name,
            email: email
        });
        console.log(user);
        
        context.response.body = user;
        context.response.status = 201;
    }
    catch (e) {
        context.response.body = { "Error": "error consulta" };
        context.response.status = 500;
        console.log(e);
    }
}

export const getUser: any = async (context: any) => {
    try {
        let id: string = context.params.id;

        const data: any = await users.findOne({ _id: { "$oid": id } });
        if (data) {
            context.response.body = data;
            context.response.status = 200;
        } else {
            context.response.body = "not found";
            context.response.status = 204;
        }
    }
    // if some error occured while searching the db
    catch (e) {
        context.response.body = { "Error": "error consulta" };
        context.response.status = 500
        console.log(e);
    }
}
export const getUsers: any = async (context: any) => {
    try { 
        const data: any = await users.find();
        if (data) {
            context.response.body = data;
            context.response.status = 200;
        } else {
            context.response.body = "not found";
            context.response.status = 204;
        }
    }
    // if some error occured while searching the db
    catch (e) {
        context.response.body = { "Error": "error consulta" };
        context.response.status = 500
        console.log(e);
    }
}


export const deleteUser: any = async (context: any) => {
    try {
        let id: string = context.params.id;

        const result = await users.deleteOne({ _id: { "$oid": id } });
        context.response.body = { result };
        context.response.status = 200;
    }
    catch (e) {
        context.response.body = { "Error": "error consulta" };
        context.response.status = 500
        console.log(e);
    }
}
export const updateUsers: any = async (context: any) => {
    try { 
        const id: string = context.params.id; 
        let body: any = await context.request.body()
 
        let data: { email?: String, name?: String } = {};
        if (body.value.email) { 
            data["email"] = body.value.email;
        }
        if (body.value.name) { 
            data["name"] = body.value.name;
        }
 
        const result = await users.updateOne({ _id: { "$oid": id } }, { $set: data });

        context.response.body = result;
        context.response.status = 200;
    } 
    catch (e) {
        context.response.body = { "Error": "error consulta" };
        context.response.status = 500
        console.log(e);
    }
}