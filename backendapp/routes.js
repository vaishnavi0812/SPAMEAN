var About = require('./models/contacts');

module.exports = function (expobj) {


	// add data to the database

	expobj.post('/api/abouts', (req, res) => {

		console.log("First Name: " + req.body.first_name + "Last Name: " + req.body.last_name + "Contact Number: " + req.body.phone_no);

		let newContact = new About({
			first_name: req.body.first_name,
			last_name: req.body.last_name,
			phone_no: req.body.phone_no
		});

		newContact.save(function (err, contact) {
			if (err) {
				res.json({
					msg: 'Failed to add Contact'
				});
			} else {
				res.json({
					msg: 'Contact added Successfully'
				});
			}

		});
	});

	// get data from the database

	expobj.get('/api/abouts', function (req, res) {
		About.find(function (err, abouts) {
			if (err) {
				res.send(err);
			}
			else {
				res.json(abouts);
			}
		})
	});

	// get data from the database of a perticular id 

	expobj.get('/api/abouts/:id', function (req, res) {
		About.find({ _id: req.params.id }, function (err, datatoupd) {
			if (err) {
				res.send(err);
			}
			else {
				res.json(datatoupd);
			}
		});
	});

	// updata data of the perticular id 

	expobj.put('/api/abouts/:id', function (req, res) {
		About.update({ _id: req.body._id }, { $set: { first_name: req.body.first_name, last_name: req.body.last_name, phone_no: req.body.phone_no } }, { multi: true }, function (err, update) {
			if (err) {
				res.json(err);
			}
			else {
				res.json(update);
			}
		});
	});

	expobj.delete('/api/abouts/:id', function (req, res) {
		About.remove({ _id: req.params.id }, function (err, result) {
			if (err) {
				res.send(err);
			}
			else {
				res.json(result);
			}
		});
	});


};