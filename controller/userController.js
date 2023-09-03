import { connection } from '../config/db.js'

export const getAllUser = (req, res) => {
    connection.query('SELECT * FROM USER', (error, result) => {
        res.status(200).send(result)
    })
}

export const getCurrentUserById = (req, res) => {
    connection.query('SELECT * FROM USER WHERE ID = ?',
        req.params.id,
        (error, result) => {
            res.status(200).send(result[0])
        })
}

export const deletUserById = (req, res) => {
    connection.query('DELETE FROM USER WHERE ID = ?',
        req.params.id,
        (error, result) => {
            if (result.affectedRows === 1) {
                res.status(200).send('employee deleted successfully')
            }
        })
}

export const createUser = (req, res) => {
    const { firstName, lastName, role, emailId, password } = req.body
    connection.query('INSERT INTO USER SET FIRSTNAME=?, LASTNAME=?, ROLE=?,' +
        'EMAILID=?, PASSWORD=?',
        [firstName, lastName, role, emailId, password],
        (error, result) => {
            if (result.affectedRows === 1) {
                res.status(201).send('UserCreated successfully..!')
            }
        })
}

export const updateUser = (req, res) => {
    const { id, firstName, lastName, role, emailId, password } = req.body
    connection.query('UPDATE USER SET FIRSTNAME=?, LASTNAME=?, ROLE=?,' +
        'EMAILID=?, PASSWORD=? WHERE ID=?',
        [firstName, lastName, role, emailId, password, id],
        (error, result) => {
            if (result.affectedRows === 1) {
                res.status(200).send('User Updated Successfully..!')
            }
        }
    )
}

export const checkLoginUser = (req, res) => {
    const { emailId, password } = req.body
    connection.query('SELECT * FROM USER WHERE EMAILID = ? AND PASSWORD = ?',
        [emailId, password],
        (error, result) => {
            if (result.length === 0) {
                res.status(404).send('Invalid User')
            } else {
                res.status(200).send(result[0])
            }
        })
}