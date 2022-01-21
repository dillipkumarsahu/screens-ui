import React, { useState } from "react";
import Axios from 'axios';
import $ from 'jquery';

let display_ui;


const AddCountryForm = () => {
  Axios.get("http://localhost:3001/fetch/country").then((res)=>{
    console.log(res.data);
    if(res.data !== "no country")
    {
      setInterval(()=>{
          if($("#display-country").html() === ""){
              $("#display-country").html("");
              for (let i = 0; i < res.data.length; i++) {
                  display_ui = `
                      <li class="list-group-item bg-dark text-light text-center text-capitalize location-list" style="cursor: pointer" loc-id="`+res.data[i]._id+`">`+res.data[i].country+`</li>
                  `;
                  $("#display-country").append(display_ui);
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
                  Axios.post("http://localhost:3001/update/location",{
                    id:id,
                    loc:updated_loc,
                    loc_typ:'country'
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
                Axios.post("http://localhost:3001/delete/location",{
                  id:id,
                  loc_typ:'country'
                }).then((res) =>{
                    if(res.data === "deleted")
                    {
                      window.location = window.location.href;
                    }
                });
              });
          }
      },300);
    }
    
});

  const [location,setLocation] = useState({
      country:""
  });
  const [records,setRecords] = useState([]);

  const handleInput = (e) => {
      const name = e.target.name;
      const value = e.target.value;
      setLocation({ ...location, [name]:value });
  }
  // onsubmit coding
  const handleSubmit = (e) => {
      e.preventDefault();
      ///////////////////////////////
      const newRecord = {...location}
      setRecords([...records,newRecord]);

      if(newRecord.country !== "")
      {
        // send data to server
        Axios.post('http://localhost:3001/insert/country',newRecord).then((res)=>{
          if (res) {
            setLocation({ ...location, country:"" });
            let ui = `
                <div class="alert alert-success">
                    `+res.data+`
                </div>
            `;
            $("#message").html(ui);
            setTimeout(()=>{
                $("#message").html("");
            },3000);
            Axios.get("http://localhost:3001/fetch/country").then((res)=>{
                $("#display-country").html("");
                for (let i = 0; i < res.data.length; i++) {
                        display_ui = `
                        <li class="list-group-item bg-dark text-light text-center text-capitalize location-list" style="cursor: pointer" loc-id="`+res.data[i].id+`">`+res.data[i].country+`</li>
                    `;
                    $("#display-country").append(display_ui);
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
                    Axios.post("http://localhost:3001/update/location",{
                      id:id,
                      loc:updated_loc,
                      loc_typ:'country'
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
                  Axios.post("http://localhost:3001/delete/location",{
                    id:id,
                    loc_typ:'country'
                  }).then((res) =>{
                      if(res.data === "deleted")
                      {
                        window.location = window.location.href;
                      }
                  });
                });
            });
          }
        });
      }
      else{
          let ui = `
              <div class="alert alert-warning">
                  Field is empty !
              </div>
          `;
          $("#message").html(ui);
      }
  }
    


  return (
    <>
    <div className="row">
    <div id="location-form-div" className="text-center p-5 bg-dark col-md-6 mt-5 rounded-lg">
      <h5 className="text-light"><i className="fa fa-flag"></i> COUNTRY</h5>

      <form onSubmit={handleSubmit}  autoComplete="off">
          <input
              type="text" 
              name="country"
              value={location.country}
              className="form-control mt-5"
              placeholder="Enter Country Name"
              onChange={handleInput}
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
                <h3 className="p-0">Countries</h3>
            </div>
            <div className="card-body bg-light">
                <ul className="list-group" id="display-country">
                    
                </ul>
            </div>
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
    </>
  );
};

export default AddCountryForm;