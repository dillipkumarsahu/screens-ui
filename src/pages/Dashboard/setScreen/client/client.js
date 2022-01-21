import React,{ useState } from "react";
import Axios from 'axios';
import $ from 'jquery';

let country;
let region;
let ui;


// fetch country
$(document).ready(()=>{
    setInterval(()=>{
        if($("#country").html() === '<option value="none">Choose Country</option>'){
Axios.get('https://tega-screendash.herokuapp.com/fetch/country').then((res)=>{
    if (res) {
      $("#country").html('<option value="none">Choose Country</option>');
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
                        $("#location").html('<option>Loading...</option>');
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

    const onchange_location = (e)=>{
        setLocation(e.target.value);
        fetch_client(e.target.value);
    }

    // fetch client
    function fetch_client(location){
        Axios.post('https://tega-screendash.herokuapp.com/fetch/client',{
            location: location
        }).then((res)=>{
            if (res.data !== "no client") 
            {
                $("#display-region").html("");
                for (let i = 0; i < res.data.length; i++) {
                    ui = `
                    <li class="list-group-item bg-dark text-light text-center text-capitalize location-list" style="cursor: pointer" loc-id="`+res.data[i]._id+`">`+res.data[i].client+`</li>
                    `;
                    $("#display-region").append(ui);
                }

                //select for edit location
                let id;
                let loc;
                let updated_loc;
                $(".location-list").each(function(){
                $(this).click(function(){
                    id = $(this).attr("loc-id");
                    loc = $(this).html().trim();
                    $("#popup").removeClass("d-none");
                    $("#close-popup").click(function(){
                    $("#popup").addClass("d-none");
                    })
                    $("#loc-val").val(loc);
                });
                });

                ///update coding
                $("#save").click(function(){
                    updated_loc = $("#loc-val").val().trim();
                    if(loc !== updated_loc)
                    {
                        Axios.post("https://tega-screendash.herokuapp.com/update/location",{
                            id:id,
                            loc:updated_loc,
                            loc_typ:'client'
                        }).then((res) =>{
                            if(res.data === "updated")
                            {
                            window.location = window.location.href;
                            }
                        });
                    }
                });
                ///delete coding
                $("#delete").click(function(){
                    Axios.post("https://tega-screendash.herokuapp.com/delete/location",{
                        id:id,
                        loc_typ:'client'
                    }).then((res) =>{
                        if(res.data === "deleted")
                        {
                            window.location = window.location.href;
                        }
                    });
                });
            }
            else{
                ui = `
                    <li class="list-group-item bg-warning text-dark text-center text-capitalize">`+res.data+`</li>
                `;
                $("#display-region").html(ui);
            }
        });
    }

    const submitForm = (e) => {
        e.preventDefault();
        const newEntry = { country: country, region: region, location: location, client: client };

        if (country !== "") {
            if(region !== ""){
              if (location !== "") {
                  if (client !== "") {
                      Axios.post('https://tega-screendash.herokuapp.com/insert/client',newEntry).then((res)=>{
                          if (res.data === "Client inserted !") {
                              fetch_client(location);
                              setClient("");
                              ui = `
                                  <div class="alert alert-success">
                                      `+res.data+`
                                  </div>
                              `;
                              $("#message").html(ui);
                              setTimeout(()=>{
                                  $("#message").html("");
                              },3000);
                          }else{
                              ui = `
                                  <div class="alert alert-danger">
                                      `+res.data+`
                                  </div>
                              `;
                              $("#message").html(ui);
                          }
                      }); 
                  } else{
                      ui = `
                          <div class="alert alert-warning">
                              Client field is empty !
                          </div>
                      `;
                      $("#message").html(ui);
                  } 
              }else{
                  ui = `
                      <div class="alert alert-warning">
                          Select Location
                      </div>
                  `;
                  $("#message").html(ui);
              }
          }else{
            ui = `
                <div class="alert alert-warning">
                    Select Region
                </div>
            `;
            $("#message").html(ui);
          }
          }else{
              ui = `
                  <div class="alert alert-warning">
                      Select Country
                  </div>
              `;
              $("#message").html(ui);
          }


    };


    return (
        <>
    <div className="row">
    <div id="location-form-div" className="text-center p-5 bg-dark col-md-6 mt-5 rounded-lg">
            <h5 className="text-light"><i className="fa fa-users"></i> CLIENT</h5>

            <form id="client-form" onSubmit={submitForm} autoComplete="off">
                <select id="country" className="form-control mt-5" onChange={(e) => setCountry(e.target.value)}>
                    <option value="none">Choose Country</option>
                </select>
                <select id="region" className="form-control mt-3" onChange={(e) => setRegion(e.target.value)}>
                    <option value="none">Choose Region</option>
                </select>
                <select id="location" className="form-control mt-3" onChange={onchange_location}>
                    <option value="none">Choose location</option>
                </select>
                <input
                    type="text"
                    name="client"
                    id="client"
                    className="form-control mt-3"
                    placeholder="Enter Client"
                    value={client}
                    onChange={(e) => setClient(e.target.value)}
                />

                <div id="message" className="text-light my-3"></div>
                <input
                    type="submit" 
                    className="form-control btn btn-primary"
                    value="ADD"
                />
                
            </form>
        </div>
        <div className="col-md-1"></div>
        <div className="col-md-5 p-4 border border-dark mt-5 rounded-lg">
            <div className="card m-0 p-3 bg-dark">
                <div className="card-header mb-2 p-0 pt-3 bg-light text-center">
                    <h3 className="p-0">Clients</h3>
                </div>
                <div className="card-body bg-light">
                    <ul className="list-group" id="display-region">
                        
                    </ul>
                </div>
            </div>
        </div>

        <div id="popup" className="d-none" style={{
        width: '100%',
        height: '100vh',
        position: 'fixed',
        top: '0',
        left: '0',
        background: 'rgba(0, 0, 0,0.9)',
        }}>
        <div className="card" style={{width: '350px',margin: '200px auto'}}>
            <div className="card-header bg-dark">
            <i className="fa fa-times text-light float-right" id="close-popup" style={{cursor: "pointer",fontSize: '16px'}}></i>
            </div>
            <div className="card-body">
            <input type="text" className="form-control" id="loc-val"/>
            <div className="w-100 d-flex justify-content-around mt-3">
                <button className="btn btn-danger" id="delete"><i className="fa fa-trash"></i> Delete</button>
                <button className="btn btn-success" id="save"><i className="fa fa-save"></i> Save changes</button>
            </div>
            </div>
        </div>
        </div>
    </div>
    </>
    );
};

export default AddCountryForm;