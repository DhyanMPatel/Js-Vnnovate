
import {MongoClient} from 'mongodb';


const mongoConnect = (callback) => {
MongoClient.connect(
  "mongodb+srv://dhyan2004vnnovate_db_user:TfoR5zfHyO2o6Dkp@cluster0.e0srjvp.mongodb.net/"
)
  .then((client) => {
    console.log("Connected to MongoDB");
    callback(client);
  })
  .catch((err) => {
    console.log(err);
  });
}

export default mongoConnect;
