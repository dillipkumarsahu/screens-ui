import React,{ useState } from "react";
import Axios from 'axios';
import $ from 'jquery';
import loader from "../../../../assets/loader.gif";



const UserAcccessRole = () => {
    let ui;
    let [country, setCountry] = useState("");
    let [region, setRegion] = useState("");
    let [location, setLocation] = useState("");
    let [client, setClient] = useState("");
    let [department, setDepartment] = useState("");
    let [equipment, setEquipment] = useState("");
    let [username, setUsername] = useState("");
    let [useremail, setUseremail] = useState("");
    let [password, setPassword] = useState("");
    let [updateid, setUpdateid] = useState("");
    let [display_action_user, setDisplayActionUser] = useState("Add User");
    let [addUserbtntxt, setAddUserbtntxt] = useState("Add User");
    let [action, setAction] = useState("add");
    

    const add_user_btn = ()=>{
        $("#add-user-form")[0].reset();
        $("#popup").removeClass("d-none");
        setDisplayActionUser("Add User");
        setAddUserbtntxt("Add User");
        setAction("add");
        $("#usercountry").html(`<option value="none">Loading...</option>`);
        Axios.get("https://tega-screendash.herokuapp.com/fetch/country").then((res)=>{
            $("#usercountry").html(`<option value="all">All Country</option>`);
            for (let i = 0; i < res.data.length; i++) {
                const ui = `
                    <option>`+res.data[i].country+`</option>
                `;
                $("#usercountry").append(ui);
            }
        });
    }
    ////////close popup
    $("#close").click(()=>{
        $("#popup").addClass("d-none");
    });
    fetch_user_data();
    ///fetch users data
    function fetch_user_data(){
        Axios.get("https://tega-screendash.herokuapp.com/get/user").then((res)=>{
            $("#showAdderUser").html("");
            res.data.forEach((data,index)=>{
                ui = `
                    <tr>
                        <th scope="row">`+(index+1)+`</th>
                        <td class="text-capitalize">`+data.username+`</td>
                        <td>`+data.useremail+`</td>
                        <td class="text-capitalize">`+data.country+`</td>
                        <td class="text-capitalize">`+data.region+`</td>
                        <td class="text-capitalize">`+data.location+`</td>
                        <td class="text-capitalize">`+data.client+`</td>
                        <td class="text-capitalize">`+data.department+`</td>
                        <td class="text-capitalize">`+data.equipment+`</td>
                        <td>
                            <i class="fa fa-edit edit-user" country="`+data.country+`" region="`+data.region+`" location="`+data.location+`" client="`+data.client+`" department="`+data.department+`" equipment="`+data.equipment+`" id="`+data._id+`" useremail="`+data.useremail+`" username="`+data.username+`" password="`+data.password+`" style="cursor: pointer"></i>
                            &nbsp;&nbsp;
                            <i class="fa fa-trash delete-user" id="`+data._id+`" style="cursor: pointer"></i>
                        </td>
                    </tr>
                `;
                $("#showAdderUser").append(ui);
            });

            // delete user
            $(".delete-user").each(function(){
                $(this).click(function(){
                    const id = $(this).attr("id");
                    $(".alert-main").removeClass("d-none");
                    $("#delete_user").click(function(){
                        Axios.get("https://tega-screendash.herokuapp.com/delete/"+id).then((res)=>{
                            if(res.data === "success"){
                                $(".alert-main").addClass("d-none");
                                fetch_user_data();
                            }
                        });
                    });
                    $("#close_delete_user").click(function(){
                        $(".alert-main").addClass("d-none");
                    });
                });
            });

            // open popup for access role user
            $(".edit-user").each(function(){
                $(this).click(function(){
                    $("#add-user-form")[0].reset();
                    $("#popup").removeClass("d-none");
                    setDisplayActionUser("Edit User");
                    setAddUserbtntxt("Update User");
                    setAction("update");

                    setCountry($(this).attr("country"));
                    setRegion($(this).attr("region"));
                    setLocation($(this).attr("location"));
                    setClient($(this).attr("client"));
                    setDepartment($(this).attr("department"));
                    setEquipment($(this).attr("equipment"));
                    setUsername($(this).attr("username"));
                    setUseremail($(this).attr("useremail"));
                    setPassword($(this).attr("password"));
                    setUpdateid($(this).attr("id"));
                    Axios.get("https://tega-screendash.herokuapp.com/fetch/country").then((res)=>{
                        $("#usercountry").html(`<option value="all">All Country</option>`);
                        for (let i = 0; i < res.data.length; i++) {
                            const ui = `
                                <option>`+res.data[i].country+`</option>
                            `;
                            $("#usercountry").append(ui);
                        }
                        $("#usercountry").val($(this).attr("country"));
                        $("#username").val($(this).attr("username"));
                        $("#useremail").val($(this).attr("useremail"));
                        $("#userpassword").val($(this).attr("password"));
                        $("#userpassword").attr("type","text");
                    });
                });
            });


        });
    }


    const onchange_country =(e) => {
        setCountry(e.target.value);
        setRegion("all");
        setLocation("all");
        setClient("all");
        setDepartment("all");
        setEquipment("all");
        
        $("#region").html(`<option value="none">Loading...</option>`);
        Axios.post('https://tega-screendash.herokuapp.com/fetch/region',{
            country: e.target.value
        }).then((res)=>{
            $("#region").html(`<option value="none">Choose Region</option>`);
            if (res.data !== "no region") {
                $("#region").html('<option value="all">All Region</option>');
                for (let i = 0; i < res.data.length; i++) {
                    ui = `
                        <option>`+res.data[i].region+`</option>
                    `;
                    $("#region").append(ui);
                }
            }
            else{
                ui = `
                    <option>`+res.data+`</option>
                `;
                $("#region").html(ui);
            }
        });
    }
    const onchange_region =(e) => {
        setRegion(e.target.value);
        $("#location").html(`<option value="none">Loading...</option>`);
        Axios.post('https://tega-screendash.herokuapp.com/fetch/location',{
            region: e.target.value
        }).then((res)=>{
            if (res.data !== "no location") {
                $("#location").html('<option value="all">All Location</option>');
                for (let i = 0; i < res.data.length; i++) {
                    ui = `
                        <option>`+res.data[i].location+`</option>
                    `;
                    $("#location").append(ui);
                }
            }
            else{
                ui = `
                    <option>`+res.data+`</option>
                `;
                $("#location").html(ui);
            }
        });
    }
    const onchange_location = (e)=>{
        setLocation(e.target.value);
        $("#client").html(`<option value="none">Loading...</option>`);
        Axios.post('https://tega-screendash.herokuapp.com/fetch/client',{
            location: e.target.value
        }).then((res)=>{
            if (res.data !== "no client") {
                $("#client").html('<option value="all">All Client</option>');
                for (let i = 0; i < res.data.length; i++) {
                    ui = `
                        <option>`+res.data[i].client+`</option>
                    `;
                    $("#client").append(ui);
                }
            }
            else{
                ui = `
                    <option>`+res.data+`</option>
                `;
                $("#client").html(ui);
            }
        });
    }
    const onchange_client = (e)=>{
        setClient(e.target.value);
        $("#department").html(`<option value="none">Loading...</option>`);
        Axios.post('https://tega-screendash.herokuapp.com/fetch/department',{
            client: e.target.value
        }).then((res)=>{
            if (res.data !== "no department") {
                $("#department").html('<option value="all">All Department</option>');
                for (let i = 0; i < res.data.length; i++) {
                    ui = `
                        <option>`+res.data[i].department+`</option>
                    `;
                    $("#department").append(ui);
                }
            }
            else{
                ui = `
                    <option>`+res.data+`</option>
                `;
                $("#department").html(ui);
            }
        });
    }
    const onchange_department = (e)=>{
        setDepartment(e.target.value);
        $("#screens").html(`<option value="none">Loading...</option>`);
        Axios.post('https://tega-screendash.herokuapp.com/get/equipment',{
            key: e.target.value,
            type:'department'
        }).then((res)=>{
            if(res.data.length !== 0)
            {
                $("#screens").html('<option value="all">All Screens</option>');
                for (let i = 0; i < res.data.length; i++) {
                    ui = `
                        <option>`+res.data[i].name+`</option>
                    `;
                    $("#screens").append(ui);
                }
            }
            else{
                ui = `
                    <option>no screens</option>
                `;
                $("#screens").html(ui);
            }
        });
    }
    const onchange_equipment = (e)=>{
        setEquipment(e.target.value);
    }
    

    //// store user data on submit
    const add_user_form = (e)=>{
        e.preventDefault();
        const newEntry = {
            key:"user",
            country: country,
            region: region,
            location: location,
            client: client,
            department: department,
            equipment: equipment,
            username: username,
            useremail: useremail,
            userpassword: password
        };
        if(e.target.attributes.actiontype.value == "add"){
            setAddUserbtntxt("Adding...");
            Axios.post("https://tega-screendash.herokuapp.com/add/user",newEntry).then((res)=>{
                if(res.data === "success")
                {
                    $("#add-user-form")[0].reset();
                    fetch_user_data();
                    setAddUserbtntxt("Add User");
                    $("#popup").addClass("d-none");
                }
            });
        }
        else{
            newEntry["id"] = updateid;
            setAddUserbtntxt("Updating...");
            Axios.post("https://tega-screendash.herokuapp.com/update/access/role",newEntry).then((res)=>{
                if(res.data === "success")
                {
                    $("#add-user-form")[0].reset();
                    fetch_user_data();
                    setAddUserbtntxt("Add User");
                    $("#popup").addClass("d-none");
                }
            });
        }

    }






    return (
        <>
        <div className="col-12">
            <div className="card">
                <div className="card-body text-center">
                    <button className="btn btn-info w-50" onClick={add_user_btn}><i className="fa fa-plus"></i></button>
                    <h5 className="text-center my-4">Display Stored User</h5>
                    <div className="table-responsive">
                        <table className="table" style={{width:"120%"}}>
                            <thead className="thead-dark">
                                <tr>
                                <th scope="col">Sl. no.</th>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Country</th>
                                <th scope="col">Region</th>
                                <th scope="col">Location</th>
                                <th scope="col">Department</th>
                                <th scope="col">Client</th>
                                <th scope="col">Screen</th>
                                <th scope="col">Edit / Delete</th>
                                </tr>
                            </thead>
                            <tbody id="showAdderUser">
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td><img className="w-25 mx-auto" src={loader}/></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        {/* add user */}
        <div id="popup" className="pt-2 d-none">
            <div className="mt-2 card w-50 mx-auto">
                <div className="card-body">
                    <h5 id="close" className="float-right"><i className="fa fa-times"></i> </h5>
                    <h5 className="text-center mt-2">{ display_action_user }</h5>
                    <form onSubmit={add_user_form} actiontype={action} id="add-user-form" updateid={updateid} className="py-2" autoComplete="off">
                        <div className="input-group">
                            <div className="input-group-append">
                                <span className="input-group-text bg-info text-light"><i className="fa fa-flag"></i> </span>
                            </div>
                            <select id="usercountry" className="form-control" onChange={ onchange_country }>
                                <option value="none">Choose Country</option>
                            </select>
                        </div>
                        <div className="input-group mt-2">
                            <div className="input-group-append">
                                <span className="input-group-text bg-info text-light"><i className="fa fa-globe"></i> </span>
                            </div>
                            <select id="region" className="form-control" onChange={ onchange_region }>
                                <option value="none">Choose Region</option>
                            </select>
                        </div>
                        <div className="input-group mt-2">
                            <div className="input-group-append">
                                <span className="input-group-text bg-info text-light"><i className="fa fa-map-marker"></i> </span>
                            </div>
                            <select id="location" className="form-control" onChange={onchange_location}>
                                <option value="none">Choose Location</option>
                            </select>
                        </div>
                        <div className="input-group mt-2">
                            <div className="input-group-append">
                                <span className="input-group-text bg-info text-light"><i className="fa fa-users"></i> </span>
                            </div>
                            <select id="client" className="form-control" onChange={onchange_client}>
                                <option value="none">Choose Client</option>
                            </select>
                        </div>
                        <div className="input-group mt-2">
                            <div className="input-group-append">
                                <span className="input-group-text bg-info text-light"><i className="fa fa-building"></i> </span>
                            </div>
                            <select id="department" className="form-control" onChange={onchange_department}>
                                <option value="none">Choose Department</option>
                            </select>
                        </div>
                        <div className="input-group mt-2">
                            <div className="input-group-append">
                                <span className="input-group-text bg-info text-light"><i className="fa fa-desktop"></i> </span>
                            </div>
                            <select id="screens" className="form-control" onChange={onchange_equipment}>
                                <option value="none">Choose Screen</option>
                            </select>
                        </div>
                        <div className="input-group mt-2">
                            <div className="input-group-append">
                                <span className="input-group-text bg-info text-light"><i className="fa fa-user"></i> </span>
                            </div>
                            <input type="text" id="username" className="form-control" required placeholder="User Name" onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div className="input-group mt-2">
                            <div className="input-group-append">
                                <span className="input-group-text bg-info text-light"><i className="fa fa-envelope"></i> </span>
                            </div>
                            <input type="email" id="useremail" className="form-control" required placeholder="User Email" onChange={(e) => setUseremail(e.target.value)}  />
                        </div>
                        <div className="input-group mt-2">
                            <div className="input-group-append">
                                <span className="input-group-text bg-info text-light"><i className="fa fa-key"></i> </span>
                            </div>
                            <input type="password" id="userpassword" className="form-control" required placeholder="Password" onChange={(e) => setPassword(e.target.value)}  />
                        </div>
                        
                        <button className="form-control w-50 mx-auto btn-primary mt-3" type="submit">{ addUserbtntxt }</button>
                    </form>
                </div>
            </div>
        </div>
        <div className="alert-main d-none"
            style={{
                width:"100%",
                height:"100vh",
                position:"fixed",
                top:"0",
                left:"0",
                backgroundColor:"rgba(0,0,0,0.5)",
                zIndex:"9999"
            }}>
            <div
                style={{
                    width:"400px",
                    height:"160px",
                    backgroundColor:"#fff",
                    position:"absolute",
                    top:"50%",
                    left:"50%",
                    transform:"translate(-50%,-50%)",
                    borderRadius:"10px",
                    padding:"20px"
                }}
            >
                <div className="text-center">
                    <i className="fa fa-spinner text-danger fa-trash fa-2x"></i>
                    <h4>Are you sure ?</h4>
                </div>
                <div className="text-center mt-3">
                    <button className="btn btn-danger" id="delete_user">Yes</button>
                    <button className="btn btn-success ml-2" id="close_delete_user">No</button>
                </div>
            </div>
        </div>
        </>
    );
}
export default UserAcccessRole;