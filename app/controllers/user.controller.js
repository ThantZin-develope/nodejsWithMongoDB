const db = require('../models/index.js');
const User = db.users;
const response = require('../utils/api.response.js');
const excel = require('exceljs');
var nodemailer = require('nodemailer');
require('dotenv').config()

exports.downloadExcel = (req, res) => {
    let workbook = new excel.Workbook();
    let worksheet = workbook.addWorksheet('Users');

    worksheet.columns = [{
        header: "id", key: "id", width: 15
    },
    { header: 'name', key: 'name', width: 25 },
    { header: 'age', key: 'age', width: 10 },
    { header: 'isMarried', key: 'isMarried', width: 10 },
    { header: 'createdAt', key: 'createdAt', width: 15 },
    { header: 'updatedAt', key: 'updatedAt', width: 15 }

    ];

    User.find().then(datas => {
        let rows = [];
        datas.forEach(element => {
            rows.push({
                id: element._id,
                name: element.name,
                age: element.age,
                isMarried: element.isMarried,
                createdAt: element.createdAt,
                updatedAt: element.updatedAt
            });
        });
        worksheet.addRows(rows);
        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        res.setHeader(
            "Content-Disposition",
            "attachment; filename=" + "tutorials.xlsx"
        );

        return workbook.xlsx.write(res).then(() => {
            res.status(200).end();
        });
    });


};

exports.sendmail = (req, res) => {
    try {
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.MAIL_SERVER,
                pass: process.env.MAIL_PASSWORD
            }
        });

        var mailOptions = {
            from: process.env.MAIL_SERVER,
            to: 'thantzin-tun@systemexe-myanmar.com',
            subject: 'Sending Email using Node.js',
            text: 'That was easy!'
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        return response.successResponse(res, 200, { success: true });
    } catch (error) {
        return response.errResponse(res, 500, error.message);
    }

}

exports.create = (req, res) => {
    if (!req.body) {
        return response.errResponse(res, 400);
    };

    const user = new User({
        name: req.body.name,
        age: req.body.age,
        isMarried: req.body.isMarried
    });

    user.save(user).then(data => {
        return response.successResponse(res, 201, data);
    }).catch(error => {
        return response.errResponse(res, 500, error.message);
    })
};

exports.findAll = (req, res) => {
    User.find().then(data => {
        return response.successResponse(res, 200, data);
    }).catch(error => {
        return response.errResponse(res, 500, error.message);
    });

}

exports.updateById = (req, res) => {
    const id = req.params.id;
    if (!id) return response.errResponse(res, 400, 'Id Must Include');

    if (!req.body) return response.errResponse(res, 400, 'Request Body Must Include');

    User.findByIdAndUpdate(id, req.body, { returnOriginal: false }, (err, data) => {
        if (err) {
            return response.errResponse(res, 404, error.message);

        } else {
            return response.successResponse(res, 200, data);
        }
    });



}
