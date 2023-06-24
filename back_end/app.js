const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https");
const app=express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.render("https://newsletter-dwfv.vercel.app/signup.html");
});

app.post("/", function(req,res){
    const firstName=req.body.fname;
    const lastName=req.body.lname;
    const email=req.body.email;
    const data={
        members:[
            {
        email_address: email,
        status: "subscribed",
        merge_field:{
            FNAME: firstName,
            LNAME: lastName,
        }
    }
    ]
    };
    const jsonData=JSON.stringify(data);
    const url="https://us21.api.mailchimp.com/3.0/lists/c77396654a";
    const options={
        method: "POST",
        auth:"rao1:573452b6b96ed5479ed8f88ee331ef4d-us21"
    }
    const request=https.request(url, options, function(response){
        if(response.statusCode===200){
            res.render("https://newsletter-dwfv.vercel.app/success.html");
        }
        else{
            res.sendFile(__dirname+"/failure.html");
        }
     response.on("data", function(data){
        console.log(JSON.parse(data));//isse console me javascript data aajaega
     })
    })
    request.write(jsonData);
    request.end();

});
app.post("/failure", function(req,res){
    res.redirect("/");
});



app.listen(process.env.PORT || 3500, function(){
    console.log("server is running");
});



// apikey=573452b6b96ed5479ed8f88ee331ef4d-us21
//listid=c77396654a
