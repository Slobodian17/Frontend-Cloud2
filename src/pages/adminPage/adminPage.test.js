import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AdminPage from "./index";

describe("AdminPage", () => {
    it("should render the correct window sections with links", () => {
        render(
            <MemoryRouter>
                <AdminPage />
            </MemoryRouter>
        );

        const userImage = screen.getByAltText("user");
        const userText = screen.getByText("All users");
        expect(userImage).toBeInTheDocument();
        expect(userText).toBeInTheDocument();

        const calendarImage = screen.getByAltText("calendar");
        const calendarText = screen.getByText("All calendars");
        expect(calendarImage).toBeInTheDocument();
        expect(calendarText).toBeInTheDocument();

        const eventImage = screen.getByAltText("event");
        const eventText = screen.getByText("All events");
        expect(eventImage).toBeInTheDocument();
        expect(eventText).toBeInTheDocument();

        const categoryImage = screen.getByAltText("category");
        const categoryText = screen.getByText("All categories");
        expect(categoryImage).toBeInTheDocument();
        expect(categoryText).toBeInTheDocument();
    });

    it("should navigate to the correct URLs when window sections are clicked", () => {
        render(
            <MemoryRouter>
                <AdminPage />
            </MemoryRouter>
        );

        const usersLink = screen.getByText("All users").closest("a");
        const calendarsLink = screen.getByText("All calendars").closest("a");
        const eventsLink = screen.getByText("All events").closest("a");
        const categoriesLink = screen.getByText("All categories").closest("a");

        expect(usersLink.getAttribute("href")).toBe("/admin/users");
        expect(calendarsLink.getAttribute("href")).toBe("/admin/calendars");
        expect(eventsLink.getAttribute("href")).toBe("/admin/events");
        expect(categoriesLink.getAttribute("href")).toBe("/admin/categories");
    });
});
