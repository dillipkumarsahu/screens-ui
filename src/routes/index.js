import React from "react";
import { Redirect } from "react-router-dom";

// Authentication related pages
import Login from "../pages/Authentication/Login";
import Logout from "../pages/Authentication/Logout";
import Register from "../pages/Authentication/Register";
import ForgetPwd from "../pages/Authentication/ForgetPassword";
// import AuthLockScreen from "../pages/Authentication/AuthLockScreen";

//---- Dashboard ---//
// set location, add device
import DashboardSetCountry from "../pages/Dashboard/setScreen/country/main";
import DashboardSetRegion from "../pages/Dashboard/setScreen/region/main";
import DashboardSetLocation from "../pages/Dashboard/setScreen/location/main";
import DashboardSetclient from "../pages/Dashboard/setScreen/client/main";
import DashboardSetdepartment from "../pages/Dashboard/setScreen/department/main";
import DashboardSetdevice from "../pages/Dashboard/setScreen/equipment/screens/main";
//admin profile
import DashboardAdminProfile from "../pages/Dashboard/profile/main";
//dashboard for screes
import DashboardScreensLifeSense from "../pages/Dashboard/screens/screenSense/main";
import DashboardScreenReport from "../pages/Dashboard/screens/screenReport/main";

const authProtectedRoutes = [	
	// set location, add device
	//////////////////////
	{ path: "/add/country", exact: true, component: DashboardSetCountry },
	{ path: "/add/region", exact: true, component: DashboardSetRegion },
	{ path: "/add/location", exact: true, component: DashboardSetLocation },
	{ path: "/add/client", exact: true, component: DashboardSetclient },
	{ path: "/add/department", exact: true, component: DashboardSetdepartment },
	{ path: "/add/screen", exact: true, component: DashboardSetdevice },
	///////////////////
	//admin profile
	{ path: "/profile", exact: true, component: DashboardAdminProfile },
	//dashboard for screes
	{ path: "/screens/dashboard", exact: true, component: DashboardScreensLifeSense },
	{ path: "/screens/report", exact: true, component: DashboardScreenReport },
	
	// this route should be at the end of all other routes
	{ path: "/", exact: true, component: () => <Redirect to="/screens/dashboard" /> }
];

const publicRoutes = [
	{ path: "/logout", component: Logout },
	{ path: "/login", component: Login },
	{ path: "/forgot-password", component: ForgetPwd },
	{ path: "/register", component: Register },
	// { path: "/auth-lock-screen", component: AuthLockScreen },
];

export { authProtectedRoutes, publicRoutes };