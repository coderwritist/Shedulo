function updatetable(users)
{
    const tb = document.getElementById("tbody");
    for(let i = 0; i<users.length; i++)
    {
        let tr = document.createElement("tr");
        tr.style.cursor = "pointer";
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        let td3 = document.createElement("td");
        td1.innerHTML = users[i].username;
        td2.innerHTML = users[i].email;
        td3.innerHTML = users[i].phone;
        tr.addEventListener("click", function(){
            const tablemodal = document.getElementById("tablemodal");
            tablemodal.style.display = "block";
            const modform = document.getElementById("modform");
            const modtitle = document.getElementById("modtitle");
            modtitle.innerHTML = `Book a meeting with ${users[i].username}`;
            const label = document.createElement("label");
            label.innerHTML = "Available slots";
            label.for = "slot";
            const drpmenu = document.createElement("select");
            drpmenu.id = "drpmenu";
            drpmenu.name = "slot";
            const slots = users[i].slots;
            for(let key in slots)
            {
                if(slots[key] == null)
                {
                    const option = document.createElement("option");
                    option.value = key;
                    option.innerHTML = key;
                    drpmenu.appendChild(option);
                }
            }
            const label2 = document.createElement("label");
            label2.innerHTML = "Meeting subject";
            label2.for = "subject";
            const input2 = document.createElement("input");
            input2.type = "text";
            input2.id = "input2";
            input2.name = "subject";
            const button = document.createElement("button");
            button.type = "submit";
            button.innerHTML = "Send meeting request";
            const button2 = document.createElement("button");
            button2.type = "button";
            button2.innerHTML = "Cancel";
            modform.appendChild(label);
            modform.appendChild(drpmenu);
            modform.appendChild(label2);
            modform.appendChild(input2);
            modform.appendChild(button);
            modform.appendChild(button2);
            const inputtemp = document.createElement("input");
            inputtemp.type = "hidden";
            inputtemp.name = "recmail";
            inputtemp.value = users[i].email;
            inputtemp.style.display = "none";
            modform.appendChild(inputtemp);
            button2.addEventListener("click", function(){
                tablemodal.style.display = "none";
                modform.removeChild(label);
                modform.removeChild(drpmenu);
                modform.removeChild(label2);
                modform.removeChild(input2);
                modform.removeChild(button);
                modform.removeChild(button2);
            });
        });
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tb.appendChild(tr);
    }
}


window.onload = async function()
{
    try{
        const res = await fetch("/getalluser");
        users = await res.json();
        updatetable(users);

    }
    catch(err)
    {
        console.log(err);
    }
}


