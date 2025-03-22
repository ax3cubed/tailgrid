	// Generate unique option values for select filters
	export const getUniqueOptions = (key: string, data: { [key: string]: any }[]) => {
		const uniqueValues = [...new Set(data.map((item: { [key: string]: any }) => item[key]))];
		return uniqueValues.map((value) => ({
			value: value?.toString() || "",
			label: value?.toString() || "N/A",
		}));
	};