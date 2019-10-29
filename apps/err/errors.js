exports.send405Error = (req, res, next) => {
  res.status(405).send({ msg: "method not allowed" });
};

exports.handleCustError = (err, req, res, next) => {
  res.status(404).send(createCustMsgErr);
};

function creatMessage(err) {
  return err.split("-");
}

function createCustMsgErr() {
  return "Request not found"
}
