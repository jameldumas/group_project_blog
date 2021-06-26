const mongoose = require('mongoose');
const db_name = process.env.DB_NAME;
 
mongoose.connect('mongodb://localhost/' + db_name, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("You are connected to the " + db_name + " database!"))
    .catch((err) => console.log("Found an error connecting to the database. Sorry!"));