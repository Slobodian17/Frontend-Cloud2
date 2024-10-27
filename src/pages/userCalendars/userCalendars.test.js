import React from "react";
import {render, screen, fireEvent, waitFor} from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import UserCalendars from "./index";
import { login } from "../login/api/login";
import { getCalendars } from "../adminCalendars/api/getCalendars";
import { deleteCalendar } from "../adminCalendars/api/deleteCalendar";

jest.mock("../login/api/login");
jest.mock("../adminCalendars/api/getCalendars");
jest.mock("../adminCalendars/api/deleteCalendar");

describe("UserCalendars", () => {
    const mockCalendars = [
        {
            id: 1,
            type: "Personal",
            description: "Personal calendar",
            time_zone: "GMT",
            person_id: 123,
        },
        {
            id: 2,
            type: "Work",
            description: "Work calendar",
            time_zone: "EST",
            person_id: 456,
        },
    ];

    beforeEach(() => {
        login.mockResolvedValue({ id: 123 });

        getCalendars.mockResolvedValue(mockCalendars);

        deleteCalendar.mockResolvedValue();

        render(
            <BrowserRouter>
                <UserCalendars />
            </BrowserRouter>
        );
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test("renders header with create calendar button", () => {
        const headerText = screen.getByText("Calendars");
        expect(headerText).toBeInTheDocument();

        const createButton = screen.getByText("Create calendar");
        expect(createButton).toBeInTheDocument();
    });




    test("filters calendars based on input query", () => {
        const searchInput = screen.getByPlaceholderText("Enter a calendar id:");
        fireEvent.change(searchInput, { target: { value: "1" } });

        const calendarId1 = screen.getByText("1");
        expect(calendarId1).toBeInTheDocument();

        const calendarTitle1 = screen.getByText("Personal");
        expect(calendarTitle1).toBeInTheDocument();

        const calendarDescription1 = screen.getByText("Personal calendar");
        expect(calendarDescription1).toBeInTheDocument();

        const calendarTimeZone1 = screen.getByText("GMT");
        expect(calendarTimeZone1).toBeInTheDocument();

        const calendarPersonId1 = screen.getByText("123");
        expect(calendarPersonId1).toBeInTheDocument();

        const calendarId2 = screen.queryByText("2");
        expect(calendarId2).toBeNull();

        const calendarTitle2 = screen.queryByText("Work");
        expect(calendarTitle2).toBeNull();

        const calendarDescription2 = screen.queryByText("Work calendar");
        expect(calendarDescription2).toBeNull();

        const calendarTimeZone2 = screen.queryByText("EST");
        expect(calendarTimeZone2).toBeNull();

        const calendarPersonId2 = screen.queryByText("456");
        expect(calendarPersonId2).toBeNull();
    });


});
