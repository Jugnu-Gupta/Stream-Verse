import React, { createContext, useRef, ReactNode } from "react";

export interface RefContextType {
	sharedRef: React.RefObject<HTMLDivElement>;
}

// Create the context with a default value
export const RefContext = createContext<RefContextType | undefined>(undefined);

export const RefProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const sharedRef = useRef<HTMLDivElement>(null);

	return (
		<RefContext.Provider value={{ sharedRef }}>
			{children}
		</RefContext.Provider>
	);
};
