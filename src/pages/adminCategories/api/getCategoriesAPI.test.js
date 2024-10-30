import { getCategories } from "./getCategories";

describe("getCategories", () => {
    beforeEach(() => {
        jest.resetAllMocks();
        localStorage.setItem("Authorization", "your-auth-token");
    });

    test("fetches categories and returns the response", async () => {
        const categories = [
            { id: 1, name: "Category 1" },
            { id: 2, name: "Category 2" },
        ];

        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve(categories),
            })
        );

        const result = await getCategories();

        expect(fetch).toHaveBeenCalledWith("http://13.51.196.110:5000/categories", {
            headers: {
                Authorization: localStorage.getItem("Authorization"),
                accept: "application/json",
                "content-type": "application/json",
            },
        });

        expect(result).toEqual(categories);
    });
});
