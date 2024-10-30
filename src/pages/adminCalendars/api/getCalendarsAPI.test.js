import { getCalendars } from "./getCalendars";

describe("getCalendars", () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    test("fetches calendars and returns the response", async () => {
        const calendars = [
            { id: 1, name: "Calendar 1" },
            { id: 2, name: "Calendar 2" },
        ];

        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve(calendars),
            })
        );

        localStorage.setItem("Authorization", "YOUR_AUTHORIZATION_TOKEN");

        const result = await getCalendars();

        expect(fetch).toHaveBeenCalledWith("http://13.51.196.110:5000/calendars", {
            headers: {
                Authorization: localStorage.getItem("Authorization"),
                accept: "application/json",
                "content-type": "application/json",
            },
        });

        expect(result).toEqual(calendars);
    });
});
