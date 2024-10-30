import { getUsers } from "./getUsers";
import {login} from "../../login/api/login";

describe("getUsers", () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    test("fetches users and returns the response", async () => {
        const users = [
            { id: 1, name: "John Doe" },
            { id: 2, name: "Jane Smith" },
        ];

        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve(users),
            })
        );

        const result = await getUsers();

        expect(fetch).toHaveBeenCalledWith("http://13.51.196.110:5000/users", {
            headers: {
                Authorization: localStorage.getItem("Authorization"),
                accept: "application/json",
                "content-type": "application/json",
            },
        });

        expect(result).toEqual(users);
    });
});
