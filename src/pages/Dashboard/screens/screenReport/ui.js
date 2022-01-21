import React from "react";
import Axios from 'axios';
import $ from 'jquery';
import loader from "../../../../assets/loader.gif";


let ui;
let screensData;

const ScreenReport = () => {
    
    const searchGridId = (e) => {
        e.preventDefault();
        $('tbody').html("");
        $(".loader-2").removeClass("d-none");
        
        Axios.post('https://tega-screendash.herokuapp.com/get/grid/status/all',{
            sensor_id: $("#sensor-id").val()
        }).then(function(res){
            $(".loader-2").addClass("d-none");
            $("#gridid").html($("#sensor-id").val());
            for(let i=res.data.length-1; i>=0; i--){
                const data = res.data[i];
                const ui_green = `
                    <tr>
                        <td>`+(i+1)+`</td>
                        <td>`+data.time.replace(/T/, ' ').replace(/\..+/, '')+`</td>
                        <td class="bg-success">`+data.gridsts+`</td>
                    </tr>
                `;
                const ui_red = `
                    <tr>
                        <td>`+(i+1)+`</td>
                        <td>`+data.time.replace(/T/, ' ').replace(/\..+/, '')+`</td>
                        <td style="background-color: red;">`+data.gridsts+`</td>
                    </tr>
                `;
                const ui_blue = `
                    <tr>
                        <td>`+(i+1)+`</td>
                        <td>`+data.time.replace(/T/, ' ').replace(/\..+/, '')+`</td>
                        <td class="bg-primary">`+data.gridsts+`</td>
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

            // onclick to print
            $("#export-report").removeClass('d-none');
            $("#export-report").click(function(){
                $("#search-form").addClass('d-none');
                $(this).addClass('d-none');
                window.print();
                $(this).removeClass('d-none');
                $("#search-form").removeClass('d-none');
            });
        });
    }


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
        // setTotalactivescreen(0);
        // setTotalinactivescreen(0);
        // for (let i = 0; i < screensData.length; i++) 
        // {
        //     if(e.target.value === screensData[i].name)
        //     {
        //         // append screengrid
        //         $("#display-screen").html(JSON.parse(screensData[i].screengrid));
        //         const screenName = e.target.value;
        //         setScreenName(screenName);
        //         sensorid_mongoID = screensData[i]._id;
        //         deleteScreen(sensorid_mongoID);
        //         ///remove the default fill color and fetch grid id from screen
        //         var gridIds = [];
        //         var col = $(".screen-col");
        //         for (let i = 0; i < col.length; i++) {
        //             const element = col[i];
        //             if($(element).attr("sensor_id") !== "")
        //             {
        //                 gridIds.push($(element).attr("sensor_id"));
        //                 ///// call set screengrid's status function
        //                 stsRealtime(gridIds);
        //                 setInterval(function(){
        //                     stsRealtime(gridIds);
        //                 },10000);
        //             }
        //         }
                
        //     }
        // }
    }
     
    return(
        <>
            {/* display screen for equipment */}
            <div className="row">
                {/* filter  */}
                <div className="col-md-6">
                    <div className="card m-0 p-0 w-100">
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


                {/* search option */}
                <div className="col-md-6">
                    <div className="card mt-0">
                        {/* display screen reports */}
                        <div className="card m-0 p-0 w-100">
                            <div className="card-body pt-3">
                                <form className="row" id="search-form" onSubmit={searchGridId}>
                                    <div className="input-group mt-3 w-75 mx-auto">
                                        <input type="search" required id="sensor-id" placeholder="Enter Grid ID" className="form-control"/>
                                        <div className="input-group-append">
                                            <button className="input-group-text bg-info text-light" type="submit"><i className="fa fa-search"></i> </button>
                                        </div>
                                    </div>
                                </form>
                                {/* // print btn */}
                                <center>
                                    <button className="btn btn-info d-none mt-3" id="export-report">Export report</button>
                                    <h3 id="gridid" className="mt-3"></h3>
                                </center>
                                <table className="table text-center mb-0 mt-3">
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
                                    <img src={loader} className="w-25 loader-2 d-none"/>
                                </center>
                            </div>
                        </div> 
                    </div>
                </div>

            
            </div>
        </>
    );
}

export default ScreenReport;