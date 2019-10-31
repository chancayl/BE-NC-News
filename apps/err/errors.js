exports.send405Error = (req, res, next) => {
  res.status(405).send({ msg: "method not allowed" });
};

exports.handleCustError = (err, req, res, next) => {
  if (err.msg === "Incorrect value") {
    res.status(400).send(err.msg);
  }
  if (err.msg) {
    res.status(404).send(createCustMsgErr());
  } else if (err.code === "22003") {
    res.status(404).send(createCustMsgErr());
  } else {
    next(err);
  }
};

exports.handle400 = (err, req, res, next) => {
  const psqlRef = {
    "42703": {
      status: 400,
      msg: createMessage(err)
    },
    "22P02": {
      status: 400,
      msg: createMessage(err)
    },
    "23502": {
      status: 400,
      msg: createMessage(err)
    },
    "23503": {
      status: 400,
      msg: createMessage(err)
    },
    "42703": {
      status: 400,
      msg: createMessage(err)
    }
  };
  const thisErr = psqlRef[err.code];
  if (thisErr) {
    res.status(thisErr.status).send(thisErr.msg);
  } else {
    next(err);
  }
};

function createMessage(err) {
  return err.message.split("-")[1];
}

function createCustMsgErr() {
  return "Request not found";
}
