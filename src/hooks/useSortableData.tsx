import React from 'react';
import { User } from '../store/reducers/users';

const useSortableData = (users: User[], defaultSortValue?: keyof User) => {

    interface SortConfig {
        key: keyof User,
        direction: 'asc' | 'desc'
    }

    const [sortConfig, setSortConfig] = React.useState<SortConfig>({
        key: defaultSortValue || 'email',
        direction: 'desc'
    });

    const sortedUsers = React.useMemo(() => {
        let sortedUsers = [...users];
        if (sortConfig !== null) {
            sortedUsers.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'asc' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'asc' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortedUsers;
    }, [users, sortConfig]);

    const requestSort = (key: keyof User) => {
        let direction: 'asc' | 'desc' = 'asc';
        if (
            sortConfig &&
            sortConfig.key === key &&
            sortConfig.direction === 'asc'
        ) {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    return { users: sortedUsers, requestSort, sortConfig };
}
export default useSortableData;