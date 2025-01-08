import React, { useEffect } from "react";

const usePagination = (
	handleGetData: (
		page: number,
		loading: boolean,
		hasMore: boolean,
		entityId: string
	) => void,
	entityId?: string
) => {
	const [page, setPage] = React.useState<number>(1);
	const [loading, setLoading] = React.useState<boolean>(false);
	const [hasMore, setHasMore] = React.useState<boolean>(true);
	const observer = React.useRef<IntersectionObserver | null>(null);
	const lastItemRef = React.useRef<HTMLDivElement | null>(null);
	console.log("page:", page);

	useEffect(() => {
		if (observer.current) observer.current.disconnect();

		observer.current = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					handleGetData(page, loading, hasMore, entityId || "");
				}
			},
			{ threshold: 1.0 }
		);

		if (lastItemRef.current) {
			observer.current.observe(lastItemRef.current);
		}
		return () => observer.current?.disconnect();
	}, [lastItemRef, page, entityId, loading, hasMore]);

	return {
		page,
		setPage,
		loading,
		setLoading,
		hasMore,
		setHasMore,
		observer,
		lastItemRef,
	};
};

export { usePagination };
