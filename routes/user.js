module.exports = function (db) {
	
	this.getUsers = function (req, res) {
		res.json({ users: db });
	}

	this.getUser = function (req, res) {
		var id = req.params.id;
		for (var i = 0; i < db.length; i++) {
			var user = db[i];
			if(user.id == id){
				res.json({ user: user });
			}
		}
		res.json({ user: {} });
	}

	this.addUser = function (req, res) {
		var user = req.body;
		var id   = db.length + 1;
		var User = { 
			id: id,
			username: user.username,
			first_name: user.first_name,
			last_name: user.last_name
		};
		db.push(User);
		res.json({ status: 200 });
	}

	this.updateUser = function (req, res) {
		var user = req.body;
		var User = { 
			id: user.id,
			username: user.username,
			first_name: user.first_name,
			last_name: user.last_name
		};
		
		for (var i = 0; i < db.length; i++) {
			if(user.id == db[i].id){
				db[i] = User;
				break;
			}
		};
		res.json({ status: 200 });
	}

	this.deleteUser = function (req, res) {
		var id = req.params.id;
		for (var i = 0; i < db.length; i++) {
			var user = db[i];
			if(user.id == id){
				if (i > -1) {
    			db.splice(i, 1);
    			orderDB(db);
    			break;
				}
			}
		}
		res.json({ status: 200 });
	}

	function orderDB (db) {
		for (var i = 0; i < db.length; i++) {
			var user = db[i];
			user.id = i + 1;
			db[i] = user;
		};
	}

};