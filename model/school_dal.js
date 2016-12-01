var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

/*
In SQL Database:
 create or replace view School_View as
 select s.*, a.street, a.zipcode from School s
 join Address a on a.address_id = s.address_id;

 */

exports.getAll = function(callback) {
    var query = 'SELECT * FROM School_View;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getById = function(school_id, callback) {
    var query = 'SELECT * FROM School_View WHERE school_id = ?';
    var queryData = [school_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.insert = function(params, callback) {
    var query = 'INSERT INTO School (school_name, address_id) VALUES (?, ?)';

    // the question marks in the sql query above will be replaced by the values of the
    // the data in queryData
    var queryData = [params.school_name, params.address_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

}

exports.delete = function(school_id, callback) {
    var query = 'DELETE FROM School WHERE school_id = ?';
    var queryData = [school_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};