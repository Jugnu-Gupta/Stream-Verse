import React, { useCallback, useEffect } from "react";

const usePagination = (
	getData: (
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

	const handleObserver = useCallback(
		(entries: IntersectionObserverEntry[]) => {
			console.log("entries:", entries[0].intersectionRatio * 100);
			console.log("entries:", entries[0].isIntersecting);
			if (entries[0].isIntersecting) {
				getData(page, loading, hasMore, entityId || "");
			}
		},
		[page, entityId, loading, hasMore, getData]
	);
	useEffect(() => {
		if (observer.current) observer.current.disconnect();

		observer.current = new IntersectionObserver(handleObserver, {
			threshold: 1.0,
		});
		if (lastItemRef.current) {
			observer.current.observe(lastItemRef.current);
		}
		return () => observer.current?.disconnect();
	}, [lastItemRef, handleObserver]);

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
