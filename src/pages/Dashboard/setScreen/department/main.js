import React, { Component } from 'react';
import { Container } from "reactstrap";
import AddCountryForm from "./department";

//Import Breadcrumb
import Breadcrumbs from '../../../../components/Common/Breadcrumb';


class StarterPage extends Component {
    constructor(props) {
        super(props);
        this.state={
            breadcrumbItems : [
                { title : "SmartScreen", link : "/" },
                { title : "AddDepartment", link : "#" },
            ],
        }
    }
    
    

    render() {

        return (
            <React.Fragment>
                <div className="page-content">
                    <Container fluid>

                    <Breadcrumbs title="add department" breadcrumbItems={this.state.breadcrumbItems} />
                    < AddCountryForm />
                    </Container>                    
                </div>
            </React.Fragment>
        );
    }
}

export default StarterPage;