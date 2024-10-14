const toUpper = (s : string) => {
	if (s == undefined)
	{
		return "";
	}
	return s[0].toUpperCase() + s.slice(1);
}

const toUpperList = (arr : string[]) => {
	if (arr == undefined || arr.length == 0)
	{
		return [];
	}
	return arr.filter((s: String) => s.length > 0).map((s: (String)) => {
		// if (s.length == 0) return undefined;
		return s[0].toUpperCase() + s.slice(1)
	});
}

// utils.ts
const readFileAsText = (file: File): Promise<string> => {
	return new Promise((resolve, reject) => {
	  const reader = new FileReader();
	  reader.onload = () => resolve(reader.result as string);
	  reader.onerror = error => reject(error);
	  reader.readAsText(file);
	});
};

// Function to parse .dat file content into an array of coordinates
function parseDatFile(content: string): { x: number; y: number }[] {
    const lines = content.split('\n').slice(1);
    const coordinates = lines
        .filter(line => line.trim() !== '') // Ignore empty lines
        .map(line => {
            const [x, y] = line.trim().split(/\s+/).map(Number); // Split by spaces and convert to numbers
            return { x, y };
        });

    return coordinates;
}
  

export {
	toUpper, toUpperList,
	readFileAsText,
	parseDatFile

}