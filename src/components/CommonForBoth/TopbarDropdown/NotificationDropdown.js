import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Dropdown, DropdownToggle, DropdownMenu, Row, Col, Media } from "reactstrap";
import SimpleBar from "simplebar-react";

//i18b
import { withNamespaces } from "react-i18next";

//Import images
// import avatar3 from "../../../assets/images/users/avatar-3.jpg";
// import avatar4 from "../../../assets/images/users/avatar-4.jpg";

class NotificationDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: false
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      menu: !prevState.menu
    }));
  }
  render() {
    return (
      <React.Fragment>
        <Dropdown isOpen={this.state.menu} toggle={this.toggle} tag="li" className="d-inline-block">
            <DropdownToggle tag="button" className="btn header-item noti-icon waves-effect" id="page-header-notifications-dropdown">
                <i className="ri-notification-3-line"></i>
                <span className="noti-dot"></span>
            </DropdownToggle>
            <DropdownMenu right className="dropdown-menu dropdown-menu-lg p-0">
                <div className="p-3">
                    <Row className="align-items-center">
                        <Col>
                            <h6 className="m-0"> {this.props.t('Notifications')} </h6>
                        </Col>
                        <div className="col-auto">
                            <Link to="#" className="small"> {this.props.t('View All')}</Link>
                        </div>
                    </Row>
                </div>
                <SimpleBar style={{maxHeight: "230px"}}>
                    <Link to="#" className="text-reset notification-item">
                        <Media>
                            <Media body>
                                <h6 className="mt-0 mb-1">{this.props.t('Tata')}</h6>
                                <div className="font-size-12 text-muted">
                                    <p className="mb-1">{this.props.t('Screen 1 at Tata steel Jamshedpur failed')}</p>
                                    <p className="mb-0"><i className="mdi mdi-clock-outline"></i> {this.props.t('3 min ago')}</p>
                                </div>
                            </Media>
                        </Media>
                    </Link>
                    <Link to="#" className="text-reset notification-item">
                        <Media>
                            <Media body>
                                <h6 className="mt-0 mb-1">{this.props.t('Tata')}</h6>
                                <div className="font-size-12 text-muted">
                                    <p className="mb-1">{this.props.t('Screen 4 Installed with new panels at A4')}</p>
                                    <p className="mb-0"><i className="mdi mdi-clock-outline"></i> {this.props.t('3 min ago')}</p>
                                </div>
                            </Media>
                        </Media>
                    </Link>
                    <Link to="#" className="text-reset notification-item">
                        <Media>
                            <Media body>
                                <h6 className="mt-0 mb-1">{this.props.t('Jindal')}</h6>
                                <div className="font-size-12 text-muted">
                                    <p className="mb-1">{this.props.t('Tega Service personel checked screen at Jindal steel Raipur')}</p>
                                    <p className="mb-0"><i className="mdi mdi-clock-outline"></i> {this.props.t('3 min ago')}</p>
                                </div>
                            </Media>
                        </Media>
                    </Link>
                </SimpleBar>
                <div className="p-2 border-top">
                    <Link to="#" className="btn btn-sm btn-link font-size-14 btn-block text-center">
                        <i className="mdi mdi-arrow-right-circle mr-1"></i>{this.props.t(' View More')}
                    </Link>
                </div>
            </DropdownMenu>
        </Dropdown>
      </React.Fragment>
    );
  }
}
export default withNamespaces()(NotificationDropdown);
