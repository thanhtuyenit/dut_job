"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dashboard_component_1 = require("../../dashboard/dashboard.component");
var user_profile_component_1 = require("../../user-profile/user-profile.component");
var table_list_component_1 = require("../../table-list/table-list.component");
var typography_component_1 = require("../../typography/typography.component");
var icons_component_1 = require("../../icons/icons.component");
var maps_component_1 = require("../../maps/maps.component");
var notifications_component_1 = require("../../notifications/notifications.component");
var upgrade_component_1 = require("../../upgrade/upgrade.component");
// import { AddFacultyComponent } from 'app/components/add-faculty/add-faculty.component';
exports.AdminLayoutRoutes = [
    { path: 'dashboard', component: dashboard_component_1.DashboardComponent },
    { path: 'user-profile', component: user_profile_component_1.UserProfileComponent },
    { path: 'table-list', component: table_list_component_1.TableListComponent },
    { path: 'typography', component: typography_component_1.TypographyComponent },
    { path: 'icons', component: icons_component_1.IconsComponent },
    { path: 'maps', component: maps_component_1.MapsComponent },
    { path: 'notifications', component: notifications_component_1.NotificationsComponent },
    { path: 'upgrade', component: upgrade_component_1.UpgradeComponent },
];
//# sourceMappingURL=admin-layout.routing.js.map