import React,{ useState } from "react";
import Axios from 'axios';
import $ from 'jquery';
import './ui.css';
// import GrapgUi from "./graph/graph";
import loader from "../../../../assets/loader.gif";

let ui;
let screensData;
let select_row;
let select_col;
let sensorid_val;
let sensorid_mongoID;

Axios.get("https://tega-screendash.herokuapp.com/fetch/country").then((res)=>{
    setInterval(()=>{
        if($("#country").html() === '<option>Select Country</option>'){
            for (let i = 0; i < res.data.length; i++) {
                ui = `
                    <option>`+res.data[i].country+`</option>
                `;
                $("#country").append(ui);
            }
        }
    },300);
});
//////



const LifeSenseUi = () => {
    let [screenName, setScreenName] = useState("");
    let [total_countries, setTotalcountry] = useState(0);
    let [total_regions, setTotalregion] = useState(0);
    let [total_locations, setTotallocation] = useState(0);
    let [total_clients, setTotalclient] = useState(0);
    let [total_department, setTotaldepartment] = useState(0);

    let [total_screen, setTotalscreen] = useState(0);
    let [total_active_screen, setTotalactivescreen] = useState(0);
    let [total_inactive_screen, setTotalinactivescreen] = useState(0);
    let [display_screen_id, setDisplayscreenid] = useState("");
    let [sensorid, setSensorid] = useState("");



    Axios.get('https://tega-screendash.herokuapp.com/count/location').then((res)=>{
        setTotalcountry(res.data.country);
        setTotalregion(res.data.region);
        setTotallocation(res.data.location);
        setTotalclient(res.data.client);
        setTotaldepartment(res.data.department);

        if(res)
        {
            Axios.get('https://tega-screendash.herokuapp.com/count/screen').then((res)=>{
                setTotalscreen(res.data);
            });
        }
    });

    const country = (e)=>{
        $("#region").html('<option>Loading...</option>');
        Axios.post('https://tega-screendash.herokuapp.com/fetch/region',{
            country: e.target.value
        }).then((res)=>{
            if (res.data !== "no region") {
                $("#region").html('<option>Select Region</option>');
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

    const region = (e)=>{
        $("#location").html('<option>Loading...</option>');
        Axios.post('https://tega-screendash.herokuapp.com/fetch/location',{
            region: e.target.value
        }).then((res)=>{
            if (res.data !== "no location") {
                $("#location").html('<option>Select Location</option>');
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

    const location = (e)=>{
        $("#client").html('<option>Loading...</option>');
        Axios.post('https://tega-screendash.herokuapp.com/fetch/client',{
            location: e.target.value
        }).then((res)=>{
            if (res.data !== "no client") {
                $("#client").html('<option>Select Client</option>');
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

    const client = (e)=>{
        $("#department").html('<option>Loading...</option>');
        Axios.post('https://tega-screendash.herokuapp.com/fetch/department',{
            client: e.target.value
        }).then((res)=>{
            if (res.data !== "no department") {
                $("#department").html('<option>Select Department</option>');
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

    const department = (e)=>{
        $("#screens").html('<option>Loading...</option>');
        Axios.post('https://tega-screendash.herokuapp.com/get/equipment',{
            key: e.target.value,
            type:'department'
        }).then((res)=>{
            // store data in a array for next use
            screensData = res.data;
            if(res.data.length !== 0)
            {
                $("#screens").html('<option>Select Screens</option>');
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

    const screens = (e)=>{
        setTotalactivescreen(0);
        setTotalinactivescreen(0);
        for (let i = 0; i < screensData.length; i++) 
        {
            if(e.target.value === screensData[i].name)
            {
                // append screengrid
                $("#display-screen").html(JSON.parse(screensData[i].screengrid));
                const screenName = e.target.value;
                setScreenName(screenName);
                sensorid_mongoID = screensData[i]._id;
                deleteScreen(sensorid_mongoID);
                ///remove the default fill color and fetch grid id from screen
                var gridIds = [];
                var col = $(".screen-col");
                for (let i = 0; i < col.length; i++) {
                    const element = col[i];
                    if($(element).attr("sensor_id") !== "")
                    {
                        gridIds.push($(element).attr("sensor_id"));
                        ///// call set screengrid's status function
                        stsRealtime(gridIds);
                        setInterval(function(){
                            stsRealtime(gridIds);
                        },10000);
                    }
                }
                
            }
        }
    }

    const scarchScreen = (e)=>{
        $(".loader").removeClass("d-none");
        $("#display-screen").html("");
        setScreenName("");
        setTotalactivescreen(0);
        setTotalinactivescreen(0);

        let inpValue = e.target.value;
        if(e.target.value.length !== 0)
        {
            Axios.post('https://tega-screendash.herokuapp.com/search/equipment',{
                key: inpValue.toUpperCase()
            }).then((res)=>{
                if(res.data.length !== 0)
                {
                    $(".loader").addClass("d-none");
                    $("#display-screen").html("");
                    for (let i = 0; i < res.data.length; i++) {
                        const element = res.data[i];
                        let Sdiv = document.createElement("DIV");
                        Sdiv.className = "w-100 bg-dark text-light px-2 py-2 rounded mb-1 clickScreen";
                        Sdiv.style.cursor = 'pointer';
                        Sdiv.innerHTML = element;
                        $("#display-screen").append(Sdiv);
                    }

                    $(".clickScreen").each(function(){
                        $(this).click(function(){
                            $(".loader").removeClass("d-none");
                            $("#display-screen").html("");
                            //////////////////
                            Axios.post('https://tega-screendash.herokuapp.com/get/equipment',{
                                key: $(this).html(),
                                type:'screen'
                            }).then((res)=>{
                                $(".loader").addClass("d-none");
                                setScreenName(res.data.name);
                                sensorid_mongoID = res.data._id;
                                deleteScreen(sensorid_mongoID);
                                // append screengrid
                                $("#display-screen").html(JSON.parse(res.data.screengrid));

                                ///fetch grid id from screen
                                var gridIds = [];
                                var col = $(".screen-col");
                                for (let i = 0; i < col.length; i++) {
                                    const element = col[i];
                                    if($(element).attr("sensor_id") !== "")
                                    {
                                        gridIds.push($(element).attr("sensor_id"));
                                        ///// call set screengrid's status function
                                        stsRealtime(gridIds);
                                        setInterval(function(){
                                            stsRealtime(gridIds);
                                        },10000);
                                    }
                                }
                                
                            });
                        });
                    });
                }
                else{
                    $(".loader").addClass("d-none");
                    $("#display-screen").html("");
                    let Sdiv = document.createElement("DIV");
                    Sdiv.className = "w-100 bg-warning text-light px-2 py-2 rounded mb-1 clickScreen";
                    Sdiv.innerHTML = "No screen found";
                    $("#display-screen").append(Sdiv);
                }
            });
        }
        else{
            setScreenName("");
            $(".loader").addClass("d-none");
            $("#display-screen").html("");
        }
    };

    // delete screen coding
    function deleteScreen(id){
        $("#screen_name").removeClass("d-none");
        $("#screen_name").click(function(){
            $(".delete-option").removeClass("d-none");
            $("#close-delete").click(function(){
                $(".delete-option").addClass("d-none");
            });
        });
    }
    const deleteS = ()=>{
        Axios.post('https://tega-screendash.herokuapp.com/delete/equipment',{
            id: sensorid_mongoID
        }).then((res)=>{
            if(res.data === "success")
            {
                $("#display-screen").html("");
                setScreenName("");
                setTotalactivescreen(0);
                setTotalinactivescreen(0);
                $(".delete-option").addClass("d-none");
            }
        });
    }
    //declearation of function to fetch status
    function stsRealtime(gridIds){
        for (let i = 0; i < gridIds.length; i++) 
        {
            const grid = gridIds[i];
            Axios.post('https://tega-screendash.herokuapp.com/get/grid/status',{
                key: grid
            }).then((res)=>{
                if(res.data.length !== 0)
                {
                    // set status by matching grid id
                    var col = $(".screen-col");
                    for (let i = 0; i < col.length; i++) {
                        const element = col[i];
                        if($(element).attr("sensor_id") ===res.data[0].gridid)
                        {
                            //////set status color as per sts - /*11,00,10,01*/
                            if(res.data[0].gridsts ==="11")
                            {
                                $(element).addClass("bg-success");
                                $(element).removeClass("bg-red");
                                $(element).removeClass("bg-dark");
                                $(element).removeClass("bg-info");
                                $(element).removeClass("inactivescreen");
                                $(element).addClass("activescreen");
                            }
                            else if(res.data[0].gridsts ==="00")
                            {
                                $(element).addClass("bg-red");
                                $(element).removeClass("bg-success");
                                $(element).removeClass("activescreen");
                                $(element).removeClass("bg-dark");
                                $(element).removeClass("bg-info");
                                $(element).addClass("inactivescreen");
                            }
                            else {
                                $(element).addClass("bg-info");
                                $(element).removeClass("bg-red");
                                $(element).removeClass("bg-dark");
                                $(element).removeClass("bg-success");
                                $(element).removeClass("inactivescreen");
                                $(element).addClass("activescreen");
                            }

                            
                        }
                    }
                    // count total active screen
                    setTotalactivescreen($(".activescreen").length);
                    setTotalinactivescreen($(".inactivescreen").length);
                }
            });
        }
        
    }

    $(document).ready(()=>{
        $(".screen-col").each(function(){
            $(this).click(function(e){
                $('tbody').html("");
                $(".loader-2").removeClass("d-none");
                select_row = e.target.attributes.row.value;
                select_col = e.target.attributes.col.value;
                sensorid_val = e.target.attributes.sensor_id.value;
                setDisplayscreenid(sensorid_val);
                $("#sensorid").val(sensorid_val);
                $("#popup").removeClass("d-none");
                $("#close").click(()=>{
                    $("#popup").addClass("d-none");
                });
                $("#heading-sensor").html("Set Sensor <b>("+select_row+","+select_col+")</b>'s ID VALUE");
                // fetch sensor data to display reports
                if(sensorid_val !== "")
                {
                    Axios.post('https://tega-screendash.herokuapp.com/get/grid/status/all',{
                        sensor_id: sensorid_val
                    }).then(function(res){
                        $('tbody').html("");
                        $(".loader-2").addClass("d-none");
                        for (let i = 0; i < res.data.length; i++) {
                            const data = res.data[i];
                            const ui_green = `
                                <tr>
                                    <td>`+(i+1)+`</td>
                                    <td>`+data.time.replace(/T/, ' ').replace(/\..+/, '')+`</td>
                                    <td class="bg-success"></td>
                                </tr>
                            `;
                            const ui_red = `
                                <tr>
                                    <td>`+(i+1)+`</td>
                                    <td>`+data.time.replace(/T/, ' ').replace(/\..+/, '')+`</td>
                                    <td class="bg-red"></td>
                                </tr>
                            `;
                            const ui_blue = `
                                <tr>
                                    <td>`+(i+1)+`</td>
                                    <td>`+data.time.replace(/T/, ' ').replace(/\..+/, '')+`</td>
                                    <td class="bg-primary"></td>
                                </tr>
                            `;
                            if(data.gridsts ==="11"){
                                $('tbody').append(ui_green);
                            }
                            else if(data.gridsts ==="10" || data.gridsts ==="01"){
                                $('tbody').append(ui_blue);
                            }
                            else if(data.gridsts ==="00"){
                                $('tbody').append(ui_red);
                            }
                        }
                    });
                }
                else{
                    const ui = `
                        <tr>
                            <td></td>
                            <td><h3 class="text-center mt-3">No Data Found !</h3></td>
                            <td></td>
                        </tr>
                    `;
                    $('tbody').append(ui);
                    $(".loader-2").addClass("d-none");
                }
            });
        });
    });
    const setSensoridVal = (e) => {
        e.preventDefault();
        ////////////////////////////////
        var col = $(".screen-col");
        for (let i = 0; i < col.length; i++) {
            const element = col[i];
            if(element.attributes.row.value === select_row && element.attributes.col.value === select_col)
            {   
                $(element).attr("sensor_id",sensorid);
                // set default status of grid
                if(element.attributes.sensor_id.value !== "")
                {
                    $(element).addClass("bg-dark");
                    $(element).addClass("text-light");
                    $(element).removeClass("bg-success");
                    $(element).removeClass("activescreen");
                    $(element).removeClass("bg-info");
                    $(element).removeClass("inactivescreen");
                    $(element).removeClass("bg-red");
                }
                else{
                    $(element).removeClass("bg-dark");
                    $(element).removeClass("text-light");
                    $(element).removeClass("bg-success");
                    $(element).removeClass("activescreen");
                    $(element).removeClass("bg-info");
                    $(element).removeClass("inactivescreen");
                    $(element).removeClass("bg-red");
                }
                // update screen
                Axios.post('https://tega-screendash.herokuapp.com/update/screen',{
                    id: sensorid_mongoID,
                    screen: $("#display-screen").html()
                }).then(function(res){
                    if(res){
                        // close popup 
                        setTimeout(function(){
                            $("#popup").addClass("d-none");
                        },2000);
                    }
                });
            }
        }
    }
    
  return (
    <>
        <div className="row" style={{overflowY:"auto"}}>
            <div className="col-md-2 px-2">
                <div className="card">
                    <div className="card-body">
                        <div className="w-100 d-flex justify-content-center">
                            <p className="p-0 m-0">Countries</p>
                            &nbsp;
                            <i className="fa fa-flag text-info" style={{fontSize:"20px"}}></i>
                        </div>
                        <hr/>
                        <p className="m-0 text-center">{ total_countries }</p>
                    </div>
                </div>
            </div>
            
            <div className="col-md-2 px-2">
                <div className="card">
                    <div className="card-body">
                        <div className="w-100 d-flex justify-content-center">
                            <p className="p-0 m-0">Regions</p>
                            &nbsp;
                            <i className="fa fa-globe text-info" style={{fontSize:"20px"}}></i>
                        </div>
                        <hr/>
                        <p className="m-0 text-center">{ total_regions }</p>
                    </div>
                </div>
            </div>
            <div className="col-md-2 px-2">
                <div className="card">
                    <div className="card-body">
                        <div className="w-100 d-flex justify-content-center">
                            <p className="p-0 m-0">Locations</p>
                            &nbsp;
                            <i className="fa fa-map-marker text-info" style={{fontSize:"20px"}}></i>
                        </div>
                        <hr/>
                        <p className="m-0 text-center">{ total_locations }</p>
                    </div>
                </div>
            </div>
            <div className="col-md-2 px-2">
                <div className="card">
                    <div className="card-body">
                        <div className="w-100 d-flex justify-content-center">
                            <p className="p-0 m-0">Clients</p>
                            &nbsp;
                            <i className="fa fa-users text-info" style={{fontSize:"20px"}}></i>
                        </div>
                        <hr/>
                        <p className="m-0 text-center">{ total_clients }</p>
                    </div>
                </div>
            </div>
            <div className="col-md-2 px-2">
                <div className="card">
                    <div className="card-body">
                        <div className="w-100 d-flex justify-content-center">
                            <p className="p-0 m-0">Dept.</p>
                            &nbsp;
                            <i className="fa fa-building text-info" style={{fontSize:"20px"}}></i>
                        </div>
                        <hr/>
                        <p className="m-0 text-center">{ total_department }</p>
                    </div>
                </div>
            </div>
            <div className="col-md-2 px-2">
                <div className="card">
                    <div className="card-body">
                        <div className="w-100 d-flex justify-content-center">
                            <p className="p-0 m-0">Screens</p>
                            &nbsp;
                            <i className="fa fa-desktop text-info" style={{fontSize:"20px"}}></i>
                        </div>
                        <hr/>
                        <p className="m-0 text-center">{ total_screen }</p>
                    </div>
                </div>
            </div>
            
        </div>
        
        <div className="row">

            <div className="col-md-3">
                <div className="card m-0">
                    <div className="card-body">
                        <select id="country" className="form-control my-1" onChange={country}>
                            <option>Select Country</option>
                        </select>
                        <select id="region" className="form-control my-1" onChange={region}>
                            <option>Select Region</option>
                        </select>
                        <select id="location" className="form-control my-1" onChange={location}>
                            <option>Select Location</option>
                        </select>
                        <select id="client" className="form-control my-1" onChange={client}>
                            <option>Select Client</option>
                        </select>
                        <select id="department" className="form-control my-1" onChange={department}>
                            <option>Select Deparment</option>
                        </select>
                        <select id="screens" className="form-control my-1" onChange={screens}>
                            <option>Select Screen</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="col-md-9 p-0"> 

                <div className="card m-0 p-0 mb-1">
                    <div className="card-body p-1">
                        <input id="searchScreen" type="search" autoComplete="off" onInput={scarchScreen} className="form-control" placeholder="Search screens here"/>
                    </div>
                </div>
                {/* display total active screen */}
                <div className="card w-50 mb-1" style={{float:"left"}}>
                    <div className="card-body pt-2 pb-1 px-4">
                        <div className="w-100 text-center">
                          <h6 className="p-0 m-0 text-success">Active screen panel</h6>
                        </div>
                        <p className="m-0 mt-1 text-center text-success">{ total_active_screen }</p>
                    </div>
                </div> 
                {/* display total inactive screen */}
                <div className="card w-50 mb-1" style={{float:"left"}}>
                    <div className="card-body pt-2 pb-1 px-4">
                        <div className="w-100 text-center">
                          <h6 className="p-0 m-0 text-red">Inactive screen panel</h6>
                        </div>
                        <p className="m-0 mt-1 text-center text-red">{ total_inactive_screen }</p>
                    </div>
                </div>
                {/* display screen for equipment */}
                <div className="card m-0 p-0 w-100">
                    <div className="card-header text-center bg-white">
                        <h5 className="p-0 m-0">{screenName} &nbsp;&nbsp;<i className="fa fa-trash d-none text-danger" style={{cursor:"pointer"}} id="screen_name"></i></h5>
                    </div>
                    <div className="card-body p-2 pt-0">
                        <div>
                            <center>
                                <img src={loader} className="w-25 d-none loader"/>
                            </center>
                            <div id="display-screen" className="text-center">

                            </div>
                        </div>
                    </div>
                </div>             
            </div>
        </div>

        <div id="popup" className="d-none">
                <div className="mt-2 card w-75 mx-auto mb-0">
                    <div className="card-header bg-dark px-md-5 d-flex justify-content-between align-items-center">
                        <h6 id="heading-sensor" className="text-light"></h6>
                        <h3 className="text-light" id="close"><i className="fa fa-times"></i> </h3>
                    </div>
                    <div className="card-body text-center">
                        <form className="row" onSubmit={setSensoridVal}>
                            <div className="col-md-8 text-center mt-2 px-md-4">
                                <input
                                    type="text" 
                                    name="sensorid"
                                    id="sensorid"
                                    value={sensorid}
                                    className="form-control"
                                    placeholder="Enter Sensor ID"
                                    onChange={(e) => setSensorid(e.target.value)}
                                />
                            </div>
                            <div id="message"></div>
                            <div className="col-md-4 text-center mt-2">
                                <button type="submit" className="btn btn-primary p-0 px-5 py-2" id="saveing">SET</button>
                            </div>
                        </form>
                    </div>
                </div>
                {/* display screen for equipment */}
                <div className="card w-75 mx-auto mt-0" style={{overflowY:"auto",height:"450px"}}>
                {/* display screen reports */}
                <div className="card m-0 p-0 w-100">
                    <div className="card-body pt-0">
                        <h5 className="text-center my-3">Grid ID - {display_screen_id}'s Reports</h5> 
                        <table className="table text-center mb-0">
                            <thead>
                                <tr>
                                    <th className="text-dark">Sl. no.</th>
                                    <th className="text-dark">Time</th>
                                    <th className="text-dark">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* display data  */}
                            </tbody>
                        </table>
                        <center>
                            <img src={loader} className="w-25 loader-2"/>
                        </center>
                    </div>
                </div> 
                </div>
            </div>
            <div className="delete-option d-none bg-dark shadow-lg p-3">
                <i className="fa fa-times text-light float-right" id="close-delete"></i>
                <h5 className="text-light text-center p-0 m-0 pt-2">{screenName}</h5>
                <p className="text-light text-center p-0 m-0">Are you sure?</p>
                <div className="d-flex justify-content-center mt-2">
                    <button className="btn btn-danger py-0 px-2" onClick={deleteS}>Delete</button>
                </div>
            </div>
    </>
  );
}

export default LifeSenseUi;