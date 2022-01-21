import React, { Component } from "react";

// MetisMenu
import MetisMenu from "metismenujs";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

//i18n
import { withNamespaces } from 'react-i18next';

import { connect } from "react-redux";
import {
  changeLayout,
  changeLayoutWidth,
  changeSidebarTheme,
  changeSidebarType,
  changePreloader
} from "../../store/actions";

class SidebarContent extends Component {

    constructor(props) {
        super(props);
        this.state = {
          
        };
       
    }
    
    componentDidMount() {
        this.initMenu();
    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
          
            if (this.props.type !== prevProps.type) {
                this.initMenu();
            }

        }
    }

    initMenu() {
            new MetisMenu("#side-menu");

            var matchingMenuItem = null;
            var ul = document.getElementById("side-menu");
            var items = ul.getElementsByTagName("a");
            for (var i = 0; i < items.length; ++i) {
                if (this.props.location.pathname === items[i].pathname) {
                    matchingMenuItem = items[i];
                    break;
                }
            }
            if (matchingMenuItem) {
                this.activateParentDropdown(matchingMenuItem);
            }
    }

    activateParentDropdown = item => {
        item.classList.add("active");
        const parent = item.parentElement;

        if (parent) {
            parent.classList.add("mm-active");
            const parent2 = parent.parentElement;

            if (parent2) {
                parent2.classList.add("mm-show");

                const parent3 = parent2.parentElement;

                if (parent3) {
                    parent3.classList.add("mm-active"); // li
                    parent3.childNodes[0].classList.add("mm-active"); //a
                    const parent4 = parent3.parentElement;
                    if (parent4) {
                        parent4.classList.add("mm-active");
                    }
                }
            }
            return false;
        }
        return false;
    };

    render() {
        return (
            <React.Fragment>
                 <div id="sidebar-menu">

                        <ul className="metismenu list-unstyled" id="side-menu">
                            <li>
                                <Link to="/screens/dashboard" className="waves-effect">
                                    <i className="fas fa-tachometer-alt"></i>
                                    <span className="ml-1">{this.props.t('Dashboard')}</span>
                                </Link>
                            </li>
  
                            <li>
                                <Link to="/screens/report" >
                                    <i className="ri-landscape-fill"></i>
                                    <span className="ml-1">{this.props.t('Screen Report')}</span>
                                </Link>
                            </li>
                            
                            <li className="menu-title">{this.props.t('set Screen')}</li>

                            <li>
                                <Link to="/#" className="has-arrow waves-effect">
                                    <i className="fa fa-map-marker"></i>
                                    <span className="ml-1">{this.props.t('Add')}</span>
                                </Link>
                                <ul className="sub-menu" aria-expanded="false">
                                    <li><Link to="/add/country"><i className="fa fa-flag"></i>{this.props.t('Country')}</Link></li>
                                    <li><Link to="/add/region"><i className="fa fa-globe"></i>{this.props.t('Region')}</Link></li>
                                    <li><Link to="/add/location"><i className="fa fa-map-marker"></i>{this.props.t('Location')}</Link></li>
                                    <li><Link to="/add/client"><i className="fa fa-users"></i> {this.props.t('Client')}</Link></li>
                                    <li><Link to="/add/department"><i className="fa fa-building"></i> {this.props.t('Department')}</Link></li>
                                    <li><Link to="/add/screen"><i className="fa fa-microchip"></i> {this.props.t('Screen')}</Link></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
            </React.Fragment>
        );
    }
}

const mapStatetoProps = state => {
    return { ...state.Layout };
  };

export default withRouter(connect(mapStatetoProps, {
    changeLayout,
    changeSidebarTheme,
    changeSidebarType,
    changeLayoutWidth,
    changePreloader
})(withNamespaces()(SidebarContent)));
