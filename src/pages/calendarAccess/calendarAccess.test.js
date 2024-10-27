import React from 'react';
import {render, screen, waitFor, within} from '@testing-library/react';
import { useParams } from 'react-router-dom';
import { getAccesses } from './api/userCalendarAccess';
import { getCalendarById } from './api/getCalendarById';
import CalendarAccess from './index';

jest.mock('react-router-dom', () => ({
    useParams: jest.fn(),
}));

jest.mock('./api/userCalendarAccess', () => ({
    getAccesses: jest.fn(),
}));

jest.mock('./api/getCalendarById', () => ({
    getCalendarById: jest.fn(),
}));

describe('CalendarAccess', () => {
    beforeEach(() => {
        useParams.mockReturnValue({ id: '1' });

        getAccesses.mockResolvedValue([
            { calendar_id: 1, person_id: 1 },
            { calendar_id: 1, person_id: 2 },
        ]);

        getCalendarById.mockResolvedValue({ type: 'My Calendar' });

        render(<CalendarAccess />);
    });

    test('renders header with correct calendar type', async () => {
        await waitFor(() => {
            const header = screen.getByRole('heading', { level: 2 });
            expect(header).toHaveTextContent('Users with access to calendar: My Calendar');
        });
    });

    test('renders table with correct access data', async () => {
        await waitFor(() => {
            const table = screen.getByRole('table');
            const tableHeaders = within(table).getAllByRole('columnheader');
            expect(tableHeaders).toHaveLength(2);
            expect(tableHeaders[0]).toHaveTextContent('Calendar id');
            expect(tableHeaders[1]).toHaveTextContent('User id');

            const tableRows = within(table).getAllByRole('row');
            expect(tableRows).toHaveLength(3); // 1 header row + 2 data rows

            const tableDataCells = within(tableRows[1]).getAllByRole('cell');
            expect(tableDataCells).toHaveLength(2);
            expect(tableDataCells[0]).toHaveTextContent('1');
            expect(tableDataCells[1]).toHaveTextContent('1');

            const tableDataCells2 = within(tableRows[2]).getAllByRole('cell');
            expect(tableDataCells2).toHaveLength(2);
            expect(tableDataCells2[0]).toHaveTextContent('1');
            expect(tableDataCells2[1]).toHaveTextContent('2');
        });
    });

});
