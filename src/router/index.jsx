import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import LoginPage from "../pages/login";
import RegisterPage from "../pages/register";
import AdminUsers from "../pages/adminUsers/index.jsx";
import EditUser from "../pages/adminEditUser";
import Calendar from "../pages/calendar/index.jsx";
import CreateCalendar from "../pages/createCalendar/index.jsx";
import UpdateCalendar from "../pages/updateCalendar";
import CreateEvent from "../pages/createEvent/index.jsx";
import UpdateEvent from "../pages/updateEvent/index.jsx";
import AdminCalendars from "../pages/adminCalendars/index.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import GiveAccess from "../pages/adminGiveAccess";
import CalendarAccess from "../pages/calendarAccess/index.jsx";
import UserCalendars from "../pages/userCalendars/index.jsx";
import AdminPage from "../pages/adminPage/index.jsx";
import AdminEvents from "../pages/adminEvents/index.jsx";
import AdminCategories from "../pages/adminCategories/index.jsx";
import CreateCategory from "../pages/createCategory";
import UpdateCategory from "../pages/updateCategory/index.jsx";
import AdminAccesses from "../pages/adminAccesses";
import UserEvents from "../pages/userEvents/index.jsx";

export const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route
                path="/login"
                element={<LoginPage/>}
            />
            <Route
                path="/register"
                element={<RegisterPage/>}
            />
            <Route element={<ProtectedRoute isAdmin={true}/>}>
                <Route
                    path="/admin/users"
                    element={<AdminUsers/>}
                />
            </Route>
            <Route element={<ProtectedRoute isAdmin={true}/>}>
                <Route
                    path="/users/:id/edit"
                    element={<EditUser/>}
                />
            </Route>
            <Route element={<ProtectedRoute/>}>
                <Route
                    path="/calendar/:id"
                    element={<Calendar/>}
                />
            </Route>
            <Route element={<ProtectedRoute/>}>
                <Route
                    path="/calendar/create"
                    element={<CreateCalendar/>}
                />
            </Route>
            <Route element={<ProtectedRoute/>}>
                <Route
                    path="/calendar/update/:id"
                    element={<UpdateCalendar/>}
                />
            </Route>
            <Route element={<ProtectedRoute/>}>
                <Route
                    path="/event/:id/create"
                    element={<CreateEvent/>}
                />
            </Route>
            <Route element={<ProtectedRoute/>}>
                <Route
                    path="/event/update/:id"
                    element={<UpdateEvent/>}
                />
            </Route>
            <Route element={<ProtectedRoute isAdmin={true}/>}>
                <Route
                    path="admin/calendars"
                    element={<AdminCalendars/>}
                />
            </Route>
            <Route element={<ProtectedRoute isAdmin={true}/>}>
                <Route
                    path="/access/give"
                    element={<GiveAccess/>}
                />
            </Route>
            <Route element={<ProtectedRoute/>}>
                <Route
                    path="/calendar/:id/access"
                    element={<CalendarAccess/>}
                />
            </Route>
            <Route element={<ProtectedRoute/>}>
                <Route
                    path="/calendars"
                    element={<UserCalendars/>}
                />
            </Route>
            <Route element={<ProtectedRoute isAdmin={true}/>}>
                <Route
                    path="/admin"
                    element={<AdminPage/>}>
                </Route>
            </Route>
            <Route element={<ProtectedRoute isAdmin={true}/>}>
                <Route
                    path="/admin/events"
                    element={<AdminEvents/>}>
                </Route>
            </Route>
            <Route element={<ProtectedRoute isAdmin={true}/>}>
                <Route
                    path="/admin/categories"
                    element={<AdminCategories/>}>
                </Route>
            </Route>
            <Route element={<ProtectedRoute isAdmin={true}/>}>
                <Route
                    path="/create/category"
                    element={<CreateCategory/>}>
                </Route>
            </Route>
            <Route element={<ProtectedRoute isAdmin={true}/>}>
                <Route
                    path="/category/update/:id"
                    element={<UpdateCategory/>}
                />
            </Route>
            <Route element={<ProtectedRoute isAdmin={true}/>}>
                <Route
                    path="/admin/accesses"
                    element={<AdminAccesses/>}
                />
            </Route>
            <Route element={<ProtectedRoute/>}>
                <Route
                    path="/events"
                    element={<UserEvents/>}
                />
            </Route>
            {/*<Route element={<ProtectedRoute/>}>*/}
            {/*    <Route*/}
            {/*        path="/users"*/}
            {/*        element={<AdminUsers/>}*/}
            {/*    />*/}
            {/*</Route>*/}
        </>
    )
);
