exports.formatDates = list => {
  let newtime = [];
  list.forEach((time, i) => {
    const copiedTime = { ...time };
    newtime.push(copiedTime);
    newtime[i].created_at = new Date(newtime[i].created_at);
    // return newtime;
  });
  return newtime;
};

exports.makeRefObj = list => {
  const result = {};
  list.forEach(object => {
    const title = object.title;
    result[title] = object.article_id;
  });
  return result;
};

exports.formatComments = (comments, articleRef) => {
  return comments.map(comment => {
    const copiedcomment = { ...comment };
    copiedcomment.article_id = articleRef[comment.belongs_to];
    delete copiedcomment.belongs_to;
    copiedcomment.created_at = new Date(copiedcomment.created_at);
    copiedcomment.author = copiedcomment.created_by;
    delete copiedcomment.created_by;
    return copiedcomment;
  });
};
