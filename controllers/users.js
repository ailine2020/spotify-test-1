const models = require('../models');

module.exports = {
    test: async(request, response, next) => {

        const email = request.body.email;

        const newLine = await models.User.create({
            email : email
        })
        if(newLine){
            return response.status(200).json({
                newLine
            })
        } else {
            return response.status(500).json({
                error: 'error'
            })
        }
    }
}