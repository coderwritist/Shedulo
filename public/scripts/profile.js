var user;

function updatereq(user)
{
    var req = user.requests;
    const tb = document.getElementById("tbody1");
    if(req.length == 0)
    {
        document.getElementById("noup").style.display = "block";
        document.getElementById("reqtable").style.display = "none";
    }
    else
    {
    for(let i = 0; i<req.length; i++)
    {
        let tr = document.createElement("tr");
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        let td3 = document.createElement("td");
        let td4 = document.createElement("td");
        td1.innerHTML = req[i].username;
        td2.innerHTML = req[i].subject;
        td3.innerHTML = req[i].slot;
        // two buttons inside td4
        let but1 = document.createElement("button");
        but1.innerHTML = "Accept";
        but1.type = "button";
        but1.id = "accept";
        let but2 = document.createElement("button");
        but2.innerHTML = "Reject";
        but2.type = "button";
        but2.id = "reject";
        td4.appendChild(but1);
        td4.appendChild(but2);

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        if(user.slots[req[i].slot] != null)
        {
            but1.disabled = true;
            but1.style.backgroundColor = "grey";
            but1.style.cursor = "not-allowed";
        }
        but1.addEventListener("click", async function(){
        
            // fetch post call
            const res = await fetch("/acceptreq", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    sender: req[i].email,
                    sendername: req[i].username,
                    subject: req[i].subject,
                    slot: req[i].slot,
                })  
        });
        window.location.reload();
        });
        but2.addEventListener("click", async function(){
        
            // fetch post call
            const res = await fetch("/rejectreq", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    sender: req[i].email,
                    sendername: req[i].username,
                    subject: req[i].subject,
                    slot: req[i].slot,
                })  
        });
        window.location.reload();
        });



        tb.appendChild(tr);
    }
    }
}



window.onload = async function()
{
        const queryString = window.location.search;
        console.log(queryString); 
      
        const urlParams = new URLSearchParams(queryString);
        const error= urlParams.get('error');
        console.log(error)
        console.log(typeof error); 
        if(error === "Mail ID already exists")
        {
            alert("Mail ID already exists")
        }
        else if(error === "invalid email")
        {
            alert("invalid email")
        }
      
    try{
        const res = await fetch("/getuser");
        user = await res.json();
        const {username, email, phone, slots} = user;
        document.getElementById("name").innerHTML = `Name: ${username}`;
        document.getElementById("email").innerHTML = `Email: ${email}`;
        document.getElementById("phone").innerHTML = `Phone: ${phone}`;   

        tb = document.getElementById("tbody");
        for(let key in slots)
        {
            let tr = document.createElement("tr");
            let td1 = document.createElement("td");
            let td2 = document.createElement("td");
            td1.innerHTML = key;
            if(slots[key] != null)
            {
                td2.innerHTML = slots[key];
                if(slots[key].includes("Rejected"))
                td2.style.color = "red";
            }

            else
            {
                td2.innerHTML = "Available";
                td2.style.color = "green";
            }
            
            tr.appendChild(td1);
            tr.appendChild(td2);
            tb.appendChild(tr);
        }


        const edittable = document.getElementById("edittable");
        edittable.addEventListener("click", function(){
            const tablemodal = document.getElementById("tablemodal");
            const tableform = document.getElementById("tableform");
            var slots = user.slots;
            for(let key in slots)
            {
                var label = document.createElement("label");
                label.innerHTML = key;
                label.for = key;
                label.id = key+"label";
                var input = document.createElement("input");
                input.type = "text";
                input.name = key;
                input.id = key;
                input.name = key;
                if(slots[key] != null)
                {
                    input.value = slots[key];
                }
                else
                {
                    input.value = "Available";
                }
                tableform.appendChild(label);
                tableform.appendChild(input);
            }
            const but1 = document.createElement("button");
            but1.type = "submit";
            but1.innerHTML = "Update slots";
            tableform.appendChild(but1);
            const but2 = document.createElement("button");
            but2.type = "button";
            but2.innerHTML = "Cancel";
            tableform.appendChild(but2);
            tablemodal.style.display = "block";
            but2.addEventListener("click", function(){
                tablemodal.style.display = "none";
                tableform.removeChild(but1);
                tableform.removeChild(but2);
                for(let key in slots)
                {
                    tableform.removeChild(document.getElementById(key));
                    tableform.removeChild(document.getElementById(key+"label"));
                }

            });


        }); 
        updatereq(user);

    }
    catch(err){
        console.log(err);
    }
    
}

const edit = document.getElementById("edit")

edit.addEventListener("click", function(){

    const modal = document.getElementById("myModal");
    modal.style.display = "block";
    const subbut = document.getElementById("subbut");
    const canbut = document.getElementById("canbut");
    const {username, email, phone, slots} = user;
    document.getElementById("name1").value = `${username}`;
    document.getElementById("email1").value = `${email}`;
    document.getElementById("ph1").value = `${phone}`;
    document.getElementById("name1").placeholder = `${username}`;
    document.getElementById("email1").placeholder = `${email}`;
    document.getElementById("ph1").placeholder = `${phone}`; 
    canbut.addEventListener("click", function(){
        modal.style.display = "none";
    });
    subbut.addEventListener("click", async function(){
        console.log("clicked");
        modal.style.display = "none";
    });
});