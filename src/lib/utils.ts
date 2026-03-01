export const buildQueryParams = (params: Record<string, any>): string => {
    const query = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
            if (Array.isArray(value)) {
                if (value.length > 0) {
                    query.append(key, value.join(','));
                }
            } else {
                query.append(key, String(value));
            }
        }
    });

    const queryString = query.toString();
    return queryString ? `?${queryString}` : '';
};
