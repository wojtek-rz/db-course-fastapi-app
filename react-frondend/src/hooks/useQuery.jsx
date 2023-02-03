import { useLocation } from "react-router-dom";
import React from "react";

// the query string for you.
export function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
}