import dotenv from "dotenv";
import {app} from "./app.js";


dotenv.config({
    path : './.env'
})

const PORT =process.env.PORT || 3000;
try {
    app.listen(PORT, () => {
        console.log(`Server is running at port : ${process.env.PORT}`);
    });
} catch (error) {
    console.log(`Server connection failed : `);
}
