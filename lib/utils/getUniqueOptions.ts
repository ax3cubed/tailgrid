// Generate unique option values for select filters
export const getUniqueOptions = <T extends Record<string, unknown>>(key: string, data: T[]) => {
  const uniqueValues = [...new Set(data.map((item: T) => item[key]))]
  return uniqueValues.map((value) => ({
    value: value?.toString() || "",
    label: value?.toString() || "N/A",
  }))
}

