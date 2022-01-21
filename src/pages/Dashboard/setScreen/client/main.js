import React, { Component } from 'react';
import { Container } from "reactstrap";
import AddCountryForm from "./client";

//Import Breadcrumb
import Breadcrumbs from '../../../../components/Common/Breadcrumb';


class StarterPage extends Component {
    constructor(props) {
        super(props);
        this.state={
            breadcrumbItems : [
                { title : "SmartScreen", link : "/" },
                { title : "AddClient", link : "#" },
            ],
        }
    }
    
    

    render() {

        return (
            <React.Fragment>
                <div className="page-content">
                    <Container fluid>

                    <Breadcrumbs title="add client" breadcrumbItems={this.state.breadcrumbItems} />
                    < AddCountryForm />
                    </Container>                    
                </div>
            </React.Fragment>
        );
    }
}

export default StarterPage;