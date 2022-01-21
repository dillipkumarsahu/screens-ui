import React, { Component } from 'react';
import { Container } from "reactstrap";
import LifeSenseUi from "./ui";

//Import Breadcrumb
import Breadcrumbs from '../../../../components/Common/Breadcrumb';


class StarterPage extends Component {
    constructor(props) {
        super(props);
        this.state={
            breadcrumbItems : [
                { title : "Dashboard", link : "/" },
                { title : "ScreenSense", link : "#" },
            ],
        }
    }
    
    

    render() {
        return (
            <React.Fragment>
                <div className="page-content">
                    <Container fluid>

                    <Breadcrumbs title="screen sense" breadcrumbItems={this.state.breadcrumbItems} />
                    < LifeSenseUi />
                    </Container>                    
                </div>
            </React.Fragment>
        );
    }
}

export default StarterPage;