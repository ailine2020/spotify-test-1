const models = require('../models');

module.exports = {
    addPlaylist: async (request, response) => {
        if(!request.body){
            return response.status(404).json({
                error: "Il n'y a pas de playlists à enregistrer"
            })
        }
        const playlistAdded = await models.Playlist.create({
            name: request.body.name,
            description: request.body.description,
            owner: request.body.owner,
            image: request.body.image
        })

        if(playlistAdded){
            return response.status(201).json({
                message: "Les playlists ont bien été envoyées"
            })
        } else {
            return response.status(500).json({
                error: "Il y'a eu une erreur lors de l'ajout de la playlist"
            })
        }
    }
}