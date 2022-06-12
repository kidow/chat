export const enumToOptions = (enumObj: any) =>
    Object.entries<string>(enumObj).map(([name, value]) => ({ value, name }))