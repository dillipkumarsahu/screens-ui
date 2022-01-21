import React,{ useState } from "react";
import Axios from 'axios';
import $ from 'jquery';
import './style.css';


let select_row;
let select_col;
let sensorid_val;
let country;
let region;
let location;
let client;
let ui;
// fetch country
$(document).ready(()=>{
    setInterval(()=>{
        if($("#country").html() === '<option value="none">Choose Country</option>'){
Axios.get('https://tega-screendash.herokuapp.com/fetch/country').then((res)=>{
    if (res) {
      $("#country").html('<option value="none">Choose Country</option>');
        // console.log(res.data);
        for (let i = 0; i < res.data.length; i++) {
            ui = `
                <option>`+res.data[i].country+`</option>
            `;
            $("#country").append(ui);
        }

        // fetch region
        $("#country").on("change",()=>{
            country = $("#country").val();
            Axios.post('https://tega-screendash.herokuapp.com/fetch/region',{
              country: country
            }).then((res)=>{
              if (res.data !== "no region") {
                $("#region").html('<option value="none">Choose Region</option>');
                  for (let i = 0; i < res.data.length; i++) {
                      ui = `
                          <option>`+res.data[i].region+`</option>
                      `;
                      $("#region").append(ui);
                  }
                  // fetch location
                    $("#region").on("change",()=>{
                        region = $("#region").val();
                        Axios.post('https://tega-screendash.herokuapp.com/fetch/location',{
                            region: region
                        }).then((res)=>{
                            if (res.data !== "no location") {
                                $("#location").html('<option value="none">Choose Location</option>');
                                for (let i = 0; i < res.data.length; i++) {
                                    ui = `
                                        <option>`+res.data[i].location+`</option>
                                    `;
                                    $("#location").append(ui);
                                }
                                // fetch client
                                $("#location").on("change",()=>{
                                    location = $("#location").val();
                                    Axios.post('https://tega-screendash.herokuapp.com/fetch/client',{
                                        location: location
                                    }).then((res)=>{
                                        if (res.data !== "no client") {
                                            $("#client").html('<option value="none">Choose Client</option>');
                                            for (let i = 0; i < res.data.length; i++) {
                                                ui = `
                                                    <option>`+res.data[i].client+`</option>
                                                `;
                                                $("#client").append(ui);
                                            }

                                            // fetch department
                                            $("#client").on("change",()=>{
                                                $("#department").html('<option value="none">Loading...</option>');
                                                client = $("#client").val();
                                                Axios.post('https://tega-screendash.herokuapp.com/fetch/department',{
                                                    client: client
                                                }).then((res)=>{
                                                    if (res.data !== "no department") {
                                                        $("#department").html('<option value="none">Choose Department</option>');
                                                        for (let i = 0; i < res.data.length; i++) {
                                                            ui = `
                                                                <option>`+res.data[i].department+`</option>
                                                            `;
                                                            $("#department").append(ui);
                                                        }
                                                    }
                                                    else{
                                                        ui = `
                                                            <option value="none">`+res.data+`</option>
                                                        `;
                                                        $("#department").html(ui);
                                                    }
                                                });
                                            });

                                        }
                                        else{
                                            ui = `
                                                <option value="none">`+res.data+`</option>
                                            `;
                                            $("#client").html(ui);
                                        }
                                    });
                                });
                            }
                            else{
                                ui = `
                                    <option value="none">`+res.data+`</option>
                                `;
                                $("#location").html(ui);
                            }
                        });
                    });
              }
              else{
                  ui = `
                      <option value="none">`+res.data+`</option>
                  `;
                  $("#region").html(ui);
              }
            });
        });
    }
});
}
},1000);
});


const AddCountryForm = () => {
    let [country, setCountry] = useState("");
    let [region, setRegion] = useState("");
    let [location, setLocation] = useState("");
    let [client, setClient] = useState("");
    let [department, setDepartment] = useState("");

    let [screenName, setScreenName] = useState("");
    let [row, setRow] = useState("");
    let [column, setColumn] = useState("");
    let [sensorid, setSensorid] = useState("");


function setorremove_bg_dark(){
    var col = $(".screen-col");
    for (let i = 0; i < col.length; i++) {
        const element = col[i];
        if(element.attributes.sensor_id.value !== "")
        {
            $(element).addClass("bg-dark");
            $(element).addClass("text-light");
        }
        else{
            $(element).removeClass("bg-dark");
            $(element).removeClass("text-light");
        }
    }
}


$(document).ready(()=>{
    $(".screen-col").click((e)=>{
        select_row = e.target.attributes.row.value;
        select_col = e.target.attributes.col.value;
        sensorid_val = e.target.attributes.sensor_id.value;
        $("#sensorid").val(sensorid_val);
        $("#popup").removeClass("d-none");
        $("#close").click(()=>{
            $("#popup").addClass("d-none");
            setorremove_bg_dark();
        });
        $("#heading-sensor").html("Set Sensor <b>("+select_row+","+select_col+")</b>'s ID VALUE");
        setorremove_bg_dark();
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
                $("#popup").addClass("d-none");
                setorremove_bg_dark();
            }
        }
    }


    const submitForm = (e) => {
        e.preventDefault();
        const newEntry = { 
            country:country,
            region:region,
            location:location,
            client:client,
            department:department,
            name: screenName,
            row: row,
            column: column
        };
        
        if(newEntry.department!=="none" && newEntry.name!=="" && newEntry.row!=="" && newEntry.column!==""){

            ///remove the default fill color and fetch grid id from screen
            // var col = $(".screen-col");
            // for (let i = 0; i < col.length; i++) {
            //     const element = col[i];
            //     $(element).removeClass("bg-dark");
            // }
            newEntry["screengrid"]=$("#display-screen").html();
            // send data to server
            ////
            Axios.post('https://tega-screendash.herokuapp.com/insert/equipment/screens',newEntry).then((res)=>{
                if (res.data === "success") {
                    setScreenName("");
                    setRow("");
                    setColumn("");


                    let ui = `
                        <div class="alert alert-success">
                            Data inserted !
                        </div>
                    `;
                    $("#message").html(ui);
                    setTimeout(()=>{
                        $("#message").html("");
                    },3000);
                }
            });
            
        }else{
            let ui = `
                <div class="alert alert-warning">
                    Some of the fields are empty !
                </div>
            `;
            $("#message").html(ui);
            setTimeout(()=>{
                $("#message").html("");
            },3000);
        }

    };

    return (
        <div className="row">
            <div id="device-form-div" className="text-center p-md-4 py-5 px-3 bg-dark mt-2 col-md-3 rounded-left">
                <h5 className="text-light"><i className="fa fa-microchip"></i> SCREEN</h5>

                <form onSubmit={submitForm} id="screen-form"  autoComplete="off">
                    <select id="country" className="form-control mt-3" onChange={(e) => setCountry(e.target.value)}>
                        <option value="none">Choose Country</option>
                    </select>
                    <select id="region" className="form-control mt-3" onChange={(e) => setRegion(e.target.value)}>
                        <option value="none">Choose Region</option>
                    </select>
                    <select id="location" className="form-control mt-3" onChange={(e) => setLocation(e.target.value)}>
                        <option value="none">Choose Location</option>
                    </select>
                    <select id="client" className="form-control mt-3" onChange={(e) => setClient(e.target.value)}>
                        <option value="none">Choose Client</option>
                    </select>
                    <select id="department" className="form-control mt-3" onChange={(e) => setDepartment(e.target.value)}>
                        <option value="none">Choose Department</option>
                    </select>

                    <input
                        type="text" 
                        name="screenName"
                        id="screenName"
                        value={screenName}
                        className="form-control mt-3"
                        placeholder="Screen Name"
                        onChange={(e) => setScreenName(e.target.value)}
                    />
                    <div className="w-50 float-left pr-2">
                    <input
                        type="number" 
                        name="row"
                        id="row"
                        value={row}
                        className="form-control mt-3"
                        placeholder="Rows"
                        min="1"
                        max="100"
                        onChange={(e) => setRow(e.target.value)}
                    />
                    </div>
                    <div className="w-50 float-left pl-2">
                    <input
                        type="number" 
                        name="column"
                        id="column"
                        value={column}
                        className="form-control mt-3"
                        placeholder="Columns"
                        min="1"
                        max="100"
                        onChange={(e) => setColumn(e.target.value)}
                    />  
                    </div>
                    <div id="message" className="text-light float-left w-100 p-0 mt-3"></div>
                    <input
                        id="ctrl-sbmt-btn"
                        type="submit" 
                        className="form-control btn btn-primary"
                        value="ADD"
                    />
                    
                </form>
            </div>

            <div className="text-center p-2 pt-4 bg-dark mt-2 col-md-9 rounded-right">
                <h5 className="text-light">Click on specific cell to set sensor ID</h5>
                <div className="card">
                        <div className="card-header py-4 text-center bg-white">
                            <h5>Screen Name - {screenName}</h5>
                        </div>
                        <div className="card-body pt-0 overflow-hidden">
                            <div id="display-screen">

                                {(()=>{
                                    let screen_row_ui = []; 
                                    for (let i = 0; i < row; i++) {
                                        
                                        screen_row_ui.push(<div className="screen-row" key={i}>

                                            {(()=>{
                                                let screen_col_ui = [];
                                                for (let j = 0; j < column; j++) {
                                                    screen_col_ui.push(<div key={j+1} row={i} col={j} sensor_id="" className="screen-col">{i}{j}</div>);
                                                }
                                                return screen_col_ui;
                                            })()}

                                        </div>);    
                                        
                                    }
                                    return screen_row_ui;
                                })()}
                            </div>
                        </div>
                    </div>
            </div>  


            <div id="popup" className="pt-5 d-none">
                <div className="mt-5 card w-75 mx-auto">
                    <div className="card-header bg-dark px-md-5 d-flex justify-content-between align-items-center">
                        <h6 id="heading-sensor" className="text-light"></h6>
                        <h3 className="text-light" id="close"><i className="fa fa-times"></i> </h3>
                    </div>
                    <div className="card-body">
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
                                <button type="submit" className="btn btn-primary p-0 px-5 py-2">SET</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    );
    };

export default AddCountryForm;