import * as queryParser from 'query-string';

const parseQureyString = (queryString) => {
  const params = {}
  const queries = queryString.split("&");

  queries.forEach((query) => {
    const pair = query.split('=');
    params[pair[0]] = pair[1];
  });

  return params;
}

export default queryParser;