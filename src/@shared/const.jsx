export const PAGINATION_DEFAULT_VALUE = {
  pageSize: 10,
  currentPage: 1,
};

export function paramsSerializer(params) {
  if (!params || Object.values(params)?.length === 0) return "";

  let result = Object.entries(params)
    .filter(([key, value]) => key !== "count" && value !== null && value !== undefined && value !== "")
    .map(([key, value]) => {
      return `${key}=${value}`;
    })
    .join("&");
  return `?${result}`;
}

export const fakeOrganizations = {
  status: 200,
  message: 'success',
  data: {
    id: 'fhaf932',
    name: 'فرماندهی آجا',
    code: '1',
    active: true,
    codePath: '001',
    parentId: null,
    parentName: null,
    children: [
      {
        id: 'hhk2852',
        name: 'فرماندهی نزاجا',
        code: '10',
        active: true,
        codePath: '001002',
        parentId: 'fhaf932',
        parentName: 'فرماندهی آجا',
        children: null
      },
      {
        id: 'rlau255',
        name: 'فرماندهی نپاجا',
        code: '20',
        active: true,
        codePath: '001003',
        parentId: 'fhaf932',
        parentName: 'فرماندهی آجا',
        children: null
      }
    ]
  }
}
