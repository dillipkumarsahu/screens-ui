import React, { Component } from 'react';
import { Container } from "reactstrap";
import ScreenReport from "./ui";

//Import Breadcrumb
import Breadcrumbs from '../../../../components/Common/Breadcrumb';


class StarterPage extends Component {
    constructor(props) {
        super(props);
        this.state={
            breadcrumbItems : [
                { title : "Dashboard", link : "/" },
                { title : "Screen Report", link : "#" },
            ],
        }
    }
    
    

    render() {
        return (
            <React.Fragment>
                <div className="page-content">
                    <Container fluid>

                    <Breadcrumbs title="screen report" breadcrumbItems={this.state.breadcrumbItems} />
                    < ScreenReport />
                    </Container>                    
                </div>
            </React.Fragment>
        );
    }
}

export default StarterPage;