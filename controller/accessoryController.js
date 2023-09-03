import { connection } from '../config/db.js'

export const getAllAccessory = (req, res) => {
    connection.query('SELECT accessory.id, accessory.name, accessory.companyName, accessory.description, ' +
        'accessory.price, accessory.quantity, accessory.category, accessory.status, user.emailId ' +
        'FROM ACCESSORY accessory ' +
        'inner join user user ' +
        'on accessory.employeeId = user.id', (error, result) => {
            res.status(200).send(result)
        })
}

export const deleteAccessoryById = (req, res) => {
    connection.query('DELETE FROM ACCESSORY WHERE ID = ?',
        req.params.id,
        (error, result) => {
            if (result.affectedRows === 1) {
                res.status(200).send('accessory deleted successfully')
            }
        })
}

export const getCurrentAccessoryById = (req, res) => {
    connection.query('SELECT * FROM ACCESSORY WHERE ID = ?',
        req.params.id,
        (error, result) => {
            res.status(200).send(result[0])
        })
}

export const createAccessory = (req, res) => {
    const { name, companyName, description, price, category, status, employeeId, quantity } = req.body
    connection.query('INSERT INTO  ACCESSORY SET NAME = ?, COMPANYNAME= ?, DESCRIPTION=?, PRICE=?,CATEGORY=?, STATUS=?, EMPLOYEEID =?, QUANTITY = ?',
        [name, companyName, description, price, category, status, employeeId, quantity],
        (error, result) => {
            console.log(result);
            if (result.affectedRows === 1) {
                res.status(201).send('Accessory Created Successfully')
            }
        })
}

export const updateAccessoryByEmployee = async (req, res) => {
    const { id, name, companyName, description, price, category, status, quantity, emailId, employeeId } = req.body
    connection.query('UPDATE ACCESSORY SET NAME = ?, COMPANYNAME = ?, DESCRIPTION = ?, ' +
        'PRICE = ?, CATEGORY = ?, STATUS = ?, QUANTITY = ?, EMPLOYEEID = ? WHERE ID = ?',
        [name, companyName, description, price, category, status, quantity, employeeId, id],
        (error, result) => {
            if (result.affectedRows === 1) {
                res.status(200).send('Accessory Update Successfully')
            }
        })
}

export const updateAccessory = async (req, res) => {
    const { id, name, companyName, description, price, category, status, quantity, emailId } = req.body
    let employeeId = await getEmployeeIdByEmailId(emailId)
    connection.query('UPDATE ACCESSORY SET NAME = ?, COMPANYNAME = ?, DESCRIPTION = ?, ' +
        'PRICE = ?, CATEGORY = ?, STATUS = ?, QUANTITY = ?, EMPLOYEEID = ? WHERE ID = ?',
        [name, companyName, description, price, category, status, quantity, employeeId, id],
        (error, result) => {
            if (result.affectedRows === 1) {
                res.status(200).send('Accessory Update Successfully')
            }
        })
}

export const getEmployeeIdByEmailId = (emailId) => {
    return new Promise((resolve) => {
        connection.query('select accessory.employeeId from accessory ' +
            'inner join user ' +
            'on accessory.employeeId = user.id ' +
            'where user.emailId = ?',
            [emailId],
            (error, result) => {
                resolve(result[0].employeeId)
            })
    })
}

export const getAllActiveAccessory = (req, res) => {
    connection.query('SELECT * FROM ACCESSORY WHERE STATUS= ?',
        'Y',
        (error, result) => {
            res.status(200).send(result)
        })
}
