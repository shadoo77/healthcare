// Filter the results of the search box
function searchFilter(items, searchTxt, searchKey) {
  const lowercasedFilter = searchTxt.toLowerCase();
  return items.filter(item => {
    return Object.keys(item).some(
      key =>
        key === searchKey &&
        item[searchKey].toLowerCase().includes(lowercasedFilter)
    );
  });
}

function isEmpty(value) {
  return (
    value === undefined ||
    value === null ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0)
  );
}

export { searchFilter, isEmpty };
