// There is no reason for the name here except as an
// example of how to set something for the POST
let name = 'unknown';

const hostIndex = (req, res) => {
  res.render('index', { // `res.render()` is NEW for us - express knows to look for the index.handlebars file
    title: "Home Page", 		// the data we want to pass into the template is in an object - in this case `title: "Home"`
    pageName: "HomePage that exists",
    userName: name,
  });
};

const hostPage1 = (req, res) => {
  res.render('page1', {
    title: "Page1",
  })
};

const hostPage2 = (req, res) => {
  res.render('page2');
};

const getName = (req, res) => {
  res.json({ name });
};

const setName = (req, res) => {
  // handle POST request
  // same as our previous demo
  if (!req.body.firstname || !req.body.lastname) {
    return res.status(400).json({
      error: 'firstname and lastname are both required',
      id: 'badRequest',
    });
  }

  name = `${req.body.firstname} ${req.body.lastname}`;
  return res.json({ name });
};

const notFound = (req, res) => {
  res.status(404).render('notFound', {
    page: req.url,
  });
};

module.exports = {
  index: hostIndex,
  page1: hostPage1,
  page2: hostPage2,
  getName,
  setName,
  notFound,
};
