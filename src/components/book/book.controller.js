exports.createBook = async(req,res) => {
  try {
    res.sent("test create")
  }catch(error){
    res.status(500).send(error);
  }
};

exports.updateBook = async(req,res) => {
  try {
    res.sent("test updateBook")
  }catch(error){
    res.status(500).send(error);
  }
};

exports.deleteBook = async(req,res) => {
  try {
    res.sent("test deleteBook")
  }catch(error){
    res.status(500).send(error);
  }
};

exports.allBooks = async (req, res) => {
  try {
    res.send([
      {
        "name": "Book 1",
        "totalCopies": 5
      },
      {
        "name": "Book 2",
        "totalCopies": 7
      },
      {
        "name": "Book 3",
        "totalCopies": 3
      }]);
  } catch (error) {
    res.status(500).send(error);
  }
};


