import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { getCategories } from "./api/getCategories";
import { deleteCategory } from "./api/deleteCategory";
import AdminCategories from "./index";

jest.mock("./api/getCategories");
jest.mock("./api/deleteCategory");

describe("AdminCategories", () => {
    beforeEach(() => {
        getCategories.mockResolvedValue([
            { id: 1, title: "Category 1" },
            { id: 2, title: "Category 2" },
        ]);
        render(
            <MemoryRouter>
                <AdminCategories />
            </MemoryRouter>
        );
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should render the component", () => {
        expect(screen.getByText("Categories")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Enter a category id:")).toBeInTheDocument();
    });

    it("should fetch and display categories on component mount", async () => {
        expect(getCategories).toHaveBeenCalledTimes(1);
        expect(await screen.findByText("Category 1")).toBeInTheDocument();
        expect(screen.getByText("Category 2")).toBeInTheDocument();
    });

    it("should filter categories based on input value", async () => {
        fireEvent.change(screen.getByPlaceholderText("Enter a category id:"), {
            target: { value: "2" },
        });

        expect(await screen.findByText("Category 2")).toBeInTheDocument();
        expect(screen.queryByText("Category 1")).toBeNull();
    });

    // it("should delete a category when delete button is clicked", async () => {
    //     deleteCategory.mockResolvedValueOnce();
    //
    //     fireEvent.click(screen.getByText("Delete"));
    //
    //     expect(deleteCategory).toHaveBeenCalledTimes(1);
    //     expect(deleteCategory).toHaveBeenCalledWith(1);
    //
    //     // Assert that the category has been removed from the DOM
    //     expect(screen.queryByText("Category 1")).toBeNull();
    // });

    it("should navigate to the create category page when create category button is clicked", () => {
        fireEvent.click(screen.getByText("Create category"));
        // Add assertion for the navigation here, e.g., expect(window.location.pathname).toBe("/create/category")
    });

    // it("should navigate to the update category page when edit button is clicked", () => {
    //     fireEvent.click(screen.getByText("Edit"));
    //     // Add assertion for the navigation here, e.g., expect(window.location.pathname).toBe(`/category/update/${category.id}`)
    // });
});
