import * as expressive from "https://raw.githubusercontent.com/NMathar/deno-express/master/mod.ts";
import { MongoClient } from "https://deno.land/x/mongo@v0.8.0/mod.ts"; 
const client = new MongoClient();
client.connectWithUri("mongodb+srv://root:73883632Alex@server-w0liq.mongodb.net/server?retryWrites=true&w=majority");

const db = client.database("server");
const users = db.collection("denos");
const port = 3000;
const app = new expressive.App();

app.use(expressive.simpleLog());
app.use(expressive.bodyParser.json());

app.get("/api/denos", async (req, res) => {
  const denos = await users.find({ name: { $ne: null } });
  await res.json(denos);
});
app.post("/api/denos", async (req, res) => { 
  const insertId = await users.insertOne(req.data);
  await res.json(insertId);
});
app.put("/api/denos", async (req, res) => { 
  const { matchedCount, modifiedCount, upsertedId } = await users.updateMany(
    { name: { $ne: null } },
    { $set: { name: "todos son iguales ahora" } }
  );
  return res.json({ matchedCount, modifiedCount, upsertedId });
});

app.delete("/api/denos", async(req,res)=>{ 
  const deleteCount = await users.deleteOne({ name:req.data.name });
  console.log(deleteCount);
  await res.json(deleteCount)
})
 
const server = await app.listen(port);
console.log("app listening on port " + server.port);

 