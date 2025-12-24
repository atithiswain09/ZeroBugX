function parser(str) {
  const [json, summary] = str.split("-");
  const [, content] = summary.split("\n");
  return {
    json: JSON.parse(json),
    summary: content
  }
}

module.exports=parser;