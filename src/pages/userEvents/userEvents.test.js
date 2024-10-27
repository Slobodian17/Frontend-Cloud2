import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import UserEvents from "./index";
import { login } from "../login/api/login";
import { getEvents } from "../calendar/api/getEvents";
import { deleteEvent } from "../adminEvents/api/deleteEvent";

jest.mock("../login/api/login");
jest.mock("../calendar/api/getEvents");
jest.mock("../adminEvents/api/deleteEvent");

describe("UserEvents", () => {
    const mockEvents = [
        {
            id: 1,
            title: "Event 1",
            description: "Description 1",
            created_at: "2023-06-01",
            updated_at: "2023-06-02",
            content: "Content 1",
            calendar_id: 1,
            category_id: 1,
            person_id: 123,
        },
        {
            id: 2,
            title: "Event 2",
            description: "Description 2",
            created_at: "2023-06-02",
            updated_at: "2023-06-03",
            content: "Content 2",
            calendar_id: 2,
            category_id: 2,
            person_id: 456,
        },
    ];

    beforeEach(() => {
        login.mockResolvedValue({ id: 123 });
        getEvents.mockResolvedValue(mockEvents);
        deleteEvent.mockResolvedValue();

        render(
            <BrowserRouter>
                <UserEvents />
            </BrowserRouter>
        );
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test("renders header with 'Events' text", () => {
        const headerText = screen.getByText("Events");
        expect(headerText).toBeInTheDocument();
    });

    test("filters events based on input query", () => {
        const searchInput = screen.getByPlaceholderText("Enter an event id:");
        fireEvent.change(searchInput, { target: { value: "1" } });

        const event1 = screen.getByText("Event 1");
        expect(event1).toBeInTheDocument();

        const event2 = screen.queryByText("Event 2");
        expect(event2).toBeNull();
    });
});
