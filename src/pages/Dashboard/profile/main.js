import React, { Component } from 'react';
import { Container } from "reactstrap";
import Axios from 'axios';
import $ from 'jquery';
import UserAcccessRole from "./subComp/useraccessrole"



fetchNotificationEmail();

const submit_notification_email = (e)=>{
    e.preventDefault();
    Axios.post("https://tega-screendash.herokuapp.com/store/notificationemail",{
        email:$("#notification_email").val()
    }).then((res)=>{
        $("#notification_email").val("");
        if(res.data.length !== 0){
            fetchNotificationEmail();
        }
        else{
            const ui = `<li class="list-group-item">No email added yet !</li>`
            $("#showAlertNotificationEmail").append(ui); 
        }
    });
}

function fetchNotificationEmail(){
    $("#showAlertNotificationEmail").html("");
    Axios.get("https://tega-screendash.herokuapp.com/fetch/notificationemail")
    .then((res)=>{

        for (let i = 0; i < res.data.length; i++) {
            const email = res.data[i].email;
            const id = res.data[i]._id;
            const ui = `<li class="list-group-item d-flex justify-content-between">`+email+` <i class="fa fa-trash delete-nofification-email" id="`+id+`" style="cursor: pointer"></i></li>`
            $("#showAlertNotificationEmail").append(ui); 
        }

        // delete notification email
        if($(".delete-nofification-email").length !== 0)
        {
            $(".delete-nofification-email").each(function(){
                
                $(this).click(function(){
                    const id = $(this).attr("id");
                    $(".alert-main").removeClass("d-none");
                    $("#delete_user").click(function(){
                        Axios.post("https://tega-screendash.herokuapp.com/delete/notificationemail",{
                            id: id
                        }).then((res)=>{
                            if(res.data === "success")
                            {   
                                $(".alert-main").addClass("d-none");
                                $("#showAlertNotificationEmail").html("");
                                fetchNotificationEmail();
                            }
                        });
                    });
                    $("#close_delete_user").click(function(){
                        $(".alert-main").addClass("d-none");
                    });
                });
            });
        }

    });
}


class StarterPage extends Component {
    

    render() {

        return (
            <React.Fragment>
                <div className="page-content">
                    <Container fluid>

                    {/* add email to send alert notification about grid */}
                    <div className="row">
                        <div className="col-md-6">
                            <div className="card" style={{minHeight:"250px"}}>
                                <div className="card-body">
                                    <h5 className="p-0 m-0 mt-2 text-center">Add Email to send alert notification for any changes in screen grid</h5>
                                    <form autoComplete="off" className="mt-5" onSubmit={submit_notification_email}>
                                        <div className="input-group mt-3">
                                            <div className="input-group-append">
                                                <span className="input-group-text bg-info text-light"><i className="fa fa-envelope"></i> </span>
                                            </div>
                                            <input type="email" required name="email" id="notification_email" placeholder="Enter Email" className="form-control"/>
                                        </div>
                                        <button className="form-control w-50 mx-auto mt-3 btn-primary">Add Email</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="card" style={{height:"250px",overflowY:"auto"}}>
                                <div className="card-body">
                                    <h5 className="p-0 m-0 text-center">Display Stored Email</h5>
                                    <div className="w-100">
                                        <ul className="list-group mt-2" id="showAlertNotificationEmail">
                                            {/* <li class="list-group-item">Alert notification email </li> */}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        {/* add users profile for role based access */}
                        <UserAcccessRole/>
                    </div>

                    </Container>                    
                </div>
            </React.Fragment>
        );
    }
}

export default StarterPage;