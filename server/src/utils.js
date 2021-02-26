exports.addQueryParamsToUrl = function (url, queryParams = {}) {
  return Object.entries(queryParams).reduce((qUrl, [key, value], index) => {
    const qpString = [].concat(value).reduce((qpString, item, itemIndex) => {
      if (item) {
        return `${qpString}${
          itemIndex > 0 ? "&" : ""
        }${key}=${encodeURIComponent(item)}`;
      } else {
        return `${qpString}${itemIndex > 0 ? "&" : ""}${key}`;
      }
    }, "");
    return `${qUrl}${index > 0 ? "&" : "?"}${qpString}`;
  }, url);
};
