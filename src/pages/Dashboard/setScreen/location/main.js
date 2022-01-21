import React, { Component } from 'react';
import { Container } from "reactstrap";
import AddCountryForm from "./location";

//Import Breadcrumb
import Breadcrumbs from '../../../../components/Common/Breadcrumb';


class StarterPage extends Component {
    constructor(props) {
        super(props);
        this.state={
            breadcrumbItems : [
                { title : "SmartScreen", link : "/" },
                { title : "AddLocation", link : "#" },
            ],
        }
    }
    
    

    render() {

        return (
            <React.Fragment>
                <div className="page-content">
                    <Container fluid>

                    <Breadcrumbs title="Add location" breadcrumbItems={this.state.breadcrumbItems} />
                    < AddCountryForm />
                    </Container>                    
                </div>
            </React.Fragment>
        );
    }
}

export default StarterPage;